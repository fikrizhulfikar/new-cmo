define([
    'asset/lib/moment/min/moment-with-locales.min',
    'asset/js/accounting.min',
    'asset/lib/ui-select/dist/select.min',
    // 'asset/lib/select2/js/select2.full.min',
    // 'asset/lib/select2/js/select2.min',
    'component/alt/button/service',
    'component/iconplus/master/ap',
    'component/activiti/task',
    'component/pusharlis/generatedoc',
    'component/system/user'
], function(moment, accounting){
    alt.module('ui.select');
    return ['$scope', '$auth', '$window', '$routeParams', '$log', '$button', '$popup', '$alert','$validate','Activiti_Task', 'System_User',
        'Iconplus_Master_Ap','Pusharlis_Generatedoc',
        function($scope, $auth, $window, $routeParams, $log, $button, $popup, $alert, $validate, Activiti_Task, System_User,
                 Iconplus_Master_Ap, Pusharlis_Generatedoc){
            $scope.action = $routeParams.action;
            $scope.title = $scope.action == 'add' ? 'Tambah' : $scope.action == 'edit' ? 'Edit' : 'Lihat';
            $scope.table = [];
            // toolbar
            $scope.toolbar = {
                title: 'STATUS VERIFIKASI DOKUMEN DAN PEMBAYARAN'
            };

            $scope.ref = {
                ap:{}
            };


            // $(".select2").select2();

            // breadcrumb
            $scope.breadcrumb = {
                data: [{
                    title: 'Verifikasi Dokumen dan Pembayaran'
                }, {
                    title: $scope.title,
                    isactive: true
                }]
            };

            $scope.usrPermohonanSurvey_dokumen = {
                isupload: false,
                isview: true,
                accept:'application/pdf',
                data: []
            };

            $scope.showfiles = 0;
            $scope.pushdokumen = $button('add', {
                title: 'Tambah',
                onclick: function(){
                    $scope.showfiles++;
                }
            });


            $scope.pills = {
                steps: [{
                    title: 'Verifikator Softcopy',
                    isactive: true
                }, {
                    title: 'Verifikator Hardcopy'
                    // }, {
                    //     title: 'Cek Pajak, Denda dan Approval Pembayaran (QC)'
                }, {
                    title: 'Input Account Payable'
                }, {
                    title: 'Pemeriksaan Hasil Input Account Payable (QC)'
                }, {
                    title: 'Approval Supervisor ODS'
                }, {
                    title: 'Proses Pembayaran (CM)'
                }],
                current: 0,
                select: function(stepid){
                    var previd = $scope.pills.current;
                    angular.forEach($scope.pills.steps, function(value, key){
                        value.isactive = false;
                    });
                    $scope.pills.steps[stepid].isactive = true;
                    $scope.pills.current = stepid;
                    // call onselect
                    $scope.pills.onselect(stepid, previd);
                },
                onselect: function(currentid, previousid){

                }
            };

            $scope.id = $routeParams.id;

            $scope.data = {
                id : $routeParams.id
            };
            $scope.datapermohonan = {
                data : {
                    usrPenugasanSurvey_dari : ''
                },
                file : {
                    isupload: false,
                    isview: true,
                    accept:'application/pdf',
                    data: []
                }
            };
            $scope.dataproduk = {};
            $scope.file = {
                isupload: false,
                isview: true,
                accept:'application/pdf',
                data:{}
            };
            $scope.usrPermohonan_kuitansi_dokumen = {
                isupload: false,
                isview: true,
                accept:'application/pdf',
                data:{}
            };
            $scope.usrPermohonan_faktupjk_dokumen = {
                isupload: false,
                isview: true,
                accept:'application/pdf',
                data:{}
            };
            $scope.usrPermohonan_bap_dokumen = {
                isupload: false,
                isview: true,
                accept:'application/pdf',
                data:{}
            };
            $scope.usrPermohonan_sptjp_dokumen = {
                isupload: false,
                isview: true,
                accept:'application/pdf',
                data:{}
            };
            $scope.usrPermohonan_dpl_dokumen = {
                isupload: false,
                isview: true,
                accept:'application/pdf',
                data:{}
            };

            $scope.getInfoTotal = function(){
                var total = 0;
                for(var i = 0; i < $scope.table.length; i++){
                    var bo = ($scope.table[i].nilai2) * 1;
                    total += (bo*1);
                }
                total = accounting.formatNumber(accounting.unformat(total,","), 0, '.', ',');
                return total;
            };


            $scope.retrieve = function(){
                Activiti_Task.retrieve({id: $scope.id}).then(function(response) {
                    // if($scope.action != 'edit') $scope.showfiles = 5;
                    $scope.usr = response.data.definitionKey;
                    $scope.evaluasi = response.data.processVariable.usrKoordinasiEvaluasi_nonotadinas ? true : false;
                    $scope.engsurvey = response.data.processVariable.usrEngSurvey_tglproses ? true : false;
                    angular.forEach(response.data.processVariable, function(val, key){
                        if(key.indexOf('usrPermohonan_') == 0) {
                            $scope.datapermohonan.data[key] = val;
                        }
                        if(key.indexOf('usrPermohonan_') == 0) {
                            if($scope.usr == 'usrPermohonan')$scope.data[key] = val;
                            $scope.dataproduk[key] = val;
                        }
                        if(key.indexOf('usrODSVerifikasiOnline_') == 0) {
                            if($scope.usr == 'usrODSVerifikasiOnline')$scope.data[key] = val;
                            $scope.dataproduk[key] = val;
                        }
                        if(key.indexOf('usrODSVerifikasiHardcopy_') == 0) {
                            if($scope.usr == 'usrODSVerifikasiHardcopy')$scope.data[key] = val;
                            $scope.dataproduk[key] = val;
                        }
                        if(key.indexOf('usrODSCekPajak_') == 0) {
                            if($scope.usr == 'usrODSCekPajak')$scope.data[key] = val;
                            $scope.dataproduk[key] = val;
                        }
                        if(key.indexOf('usrODSInputAP_') == 0) {
                            if($scope.usr == 'usrODSInputAP')$scope.data[key] = val;
                            $scope.dataproduk[key] = val;
                        }



                        if(key.indexOf('usrPermohonan_data') == 0) {
                            if($scope.usr == 'usrPermohonan')$scope.data[key] = val;
                            $scope.table2 = angular.fromJson(eval(val));
                            $scope.table = angular.fromJson(eval(val));
                        }
                        if($scope.action == 'correct') {
                            $scope.data[key] = angular.copy(val);
                        }
                    });

                    if($scope.action == 'correct'){
                        $auth.set_permission(1);
                        $scope.data.definitionKey = $routeParams.definitionKey;
                    }else{
                        $scope.data.definitionKey = response.data.definitionKey;
                        $scope.isSurvey = "usrPermohonanSurvey_nosurat" in response.data.processVariable;
                    }

                    switch ($scope.data.definitionKey) {
                        case 'usrODSPembayaranCM' :
                            $scope.pills.select(5);
                            break;
                        case 'usrODSApprovalSPV' :
                            $scope.pills.select(4);
                            break;
                        case 'usrODSVerifikasiAP' :
                            $scope.pills.select(3);
                            break;
                        case 'usrODSInputAP' :
                            $scope.pills.select(2);
                            break;
                        // case 'usrODSCekPajak' :
                        //     $scope.pills.select(2);
                        //     break;
                        case 'usrODSVerifikasiHardcopy' :
                            $scope.pills.select(1);
                            break;
                        case 'usrODSVerifikasiOnline' :
                        default :
                            break;
                    }

                    var nomorpo = $scope.dataproduk.usrPermohonan_nopo;
                    console.log(nomorpo);

                    Iconplus_Master_Ap.list({nomor_po: "= " + nomorpo}).then(function(response){
                        $scope.comboboxap = response.data;

                        angular.forEach(response.data, function(val, key){
                            $scope.ref.ap[val.nomor_ap] = val;
                        });

                    });

                    $scope.pilih_nomor_ap = function(val){
                        $scope.data.nomorap= $scope.ref.ap[val].nomor_ap;
                        $scope.data.nomorinvoice= $scope.ref.ap[val].no_invoice;
                        $scope.data.tglap= $scope.ref.ap[val].tgl_ap;
                        $scope.data.dpp= $scope.ref.ap[val].jumlah_bayar;
                        $scope.data.nofakturpajak = $scope.ref.ap[val].faktur_pajak;
                    };


                    // $scope.file.data = response.data.usrPermohonan_dokumen;
                    $scope.usrPermohonan_kuitansi_dokumen.data = response.data.usrPermohonan_kuitansi_dokumen;
                    $scope.usrPermohonan_faktupjk_dokumen.data = response.data.usrPermohonan_faktupjk_dokumen;
                    $scope.usrPermohonan_bap_dokumen.data = response.data.usrPermohonan_bap_dokumen;
                    $scope.usrPermohonan_sptjp_dokumen.data = response.data.usrPermohonan_sptjp_dokumen;
                    $scope.usrPermohonan_dpl_dokumen.data = response.data.usrPermohonan_dpl_dokumen;
                });
            };

            $scope.retrieve();


            $scope.$watch('data.tglap', function(val){
                if(val) {
                    $scope.data.tglap2 = moment(val, 'YYYYMMDD').format();
                }
            });

            $scope.$watch('data.tglap2', function(val){
                if(val) {
                    $scope.data.tglap = moment(val).format('YYYYMMDD');
                }
            });

            $scope.data.dpp = $scope.dataproduk.usrPermohonan_nilaiinvoice;

            $scope.$watch('data.dpp',function(val){

                $scope.data.dpp = accounting.formatNumber(accounting.unformat(val,","), 0, '.', ',');
                $scope.data.dpp2 = accounting.formatNumber(accounting.unformat(val,","), 0, '', ',');
                // $scope.data.ppn = val/10;
            });
            $scope.$watch('data.ppn',function(val){
                $scope.data.ppn = accounting.formatNumber(accounting.unformat(val,","), 0, '.', ',');
            });
            $scope.$watch('data.denda',function(val){
                $scope.data.denda = accounting.formatNumber(accounting.unformat(val,","), 0, '.', ',');
            });
            $scope.checkgtzero=function(i){
                if(i == 0) return false;
                return true;
            }

            $scope.isvalid = function(isneeddocument){
                isneeddocument = (typeof isneeddocument === 'undefined' && $scope.action != 'correct');
                // $scope.data.usrPersetujuanSurvey_dokumen = $scope.usrPersetujuanSurvey_dokumen.model;

                var isvalid = $validate();
                if($scope.pills.current == 0){
                    isvalid
                    // .rule($validate.required($scope.data.usrPersetujuanSurvey_nosuratpersetujuan), 'Nomor Surat Tugas harus diisi!')
                    // .rule($validate.required($scope.data.usrPersetujuanSurvey_dokumen || !isneeddocument), 'Dokumen harus diupload!');
                }

                if($scope.pills.current == 1){
                    if ($scope.data.hasilevaluasi=="tidak") {
                        isvalid
                        // .rule($validate.required($scope.data.usrWaktuSurvey_tglsurat), 'Tanggal Approve harus diisi!')
                        // .rule($validate.required($scope.data.usrSetujuTimpro_perihal), 'Catatan harus diisi!')
                            .rule($validate.required($scope.data.perihal), 'Catatan harus diisi!')
                    }
                }

                if($scope.pills.current == 2){
                    isvalid
                    // .rule($validate.required($scope.data.usrWBSSurvey_tglsah), 'Tanggal Pengesahan harus diisi!')
                }

                return isvalid.check();
            };

            $scope.dokumendetail = {
                isupload: $scope.action != 'view',
                isview: $scope.action != 'add',
                accept:'application/pdf',
                data: {}
            };


            $scope.btnadd = $button('add', {
                //class : 'btn btn-success',
                title: 'Tambah Anggota',
                onclick: function(){
                    $scope.modal.data = {};
                    $scope.modal.action = 'add';
                    $scope.modal.buttons = [$scope.btnsavemodal, $scope.btnclose];
                    $scope.modal.open();
                }
            });

            $scope.btnprint = $button('print', {
                class : 'btn btn-info',
                title: 'Download Draft Surat Pengantar Proyek',
                ondblclick: function(){
                    Pusharlis_Generatedoc.sktim($scope.data).then(function(response) {
                        $window.location.href = alt.serverUrl + response.data;
                    });
                }});

            $scope.editTransaksi = function(index,item){
                $scope.modal.data = angular.copy(item);
                // $scope.dokumendetail.data = item.dokumendata;
                $scope.modal.index = index;
                $scope.modal.buttons = [$scope.btnsavemodal, $scope.btnclose];
                $scope.modal.action = 'edit';
                $scope.modal.open();
            };

            $scope.removeTransaksi = function(index,item){
                $popup.confirm({
                    caption: 'Apakah anda yakin?',
                    buttons: [
                        $button('yes', {
                            onclick: function () {
                                $scope.table.splice(index,1);
                                $popup.close(true);
                            }
                        }),
                        $button('no', {
                            onclick: function () {
                                $popup.close(false);
                            }
                        })
                    ]
                });
            };


            $scope.btnsavemodal = $button('save', {
                onclick: function(){
                    // $scope.modal.data.dokumendetail = $scope.dokumendetail.model;
                    var isvalid = $validate()
                        .rule($validate.required($scope.modal.data.jabatan), 'Jabatan harus diisi!')
                        .rule($validate.required($scope.modal.data.nama_pegawai), 'Nama harus diisi!')

                    var isvalid2 = isvalid.check();

                    if (!isvalid2) return false;

                    var data = angular.copy($scope.modal.data);
                    // $scope.dokumendetail.clear();
                    if($scope.modal.action == 'add') {
                        $scope.table.push(data);
                    }
                    else{
                        $scope.table[$scope.modal.index] = data;
                    }
                    $scope.modal.close();
                }
            });
            $scope.btnclose = $button('close', {
                title: 'Batal',
                onclick: function(){
                    $scope.modal.close();
                    // $scope.dokumendetail.clear();
                }
            });


            $scope.btncancel = $button($scope.action == 'view' ? 'back' : 'cancel', {
                href: alt.baseUrl + ($scope.action == 'correct' ? alt.correctionUrl :  ('spb/' + ($routeParams.redir || 'permohonan') + '/list'))
            });


            $scope.getnoap = {selected : undefined};

        }];
});