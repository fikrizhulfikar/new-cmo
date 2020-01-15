define([
    'asset/lib/moment/min/moment-with-locales.min',
    'asset/js/accounting.min',
    'asset/lib/ui-select/dist/select.min',
    'component/alt/button/service',
    'component/activiti/task',
    'component/iconplus/master/detail',
    'component/iconplus/master/bandwith',
    'component/iconplus/master/jarak',
    'component/pusharlis/generatedoc',
    'component/system/user'
], function(moment, accounting){
    alt.module('ui.select');
    return ['$scope', '$auth', '$window', '$routeParams', '$log', '$button', '$popup', '$alert','$validate','Activiti_Task', 'System_User',
        'Pusharlis_Generatedoc','Iconplus_Master_Detail','Iconplus_Master_Bandwith','Iconplus_Master_Jarak',
        function($scope, $auth, $window, $routeParams, $log, $button, $popup, $alert, $validate, Activiti_Task, System_User,
                 Pusharlis_Generatedoc,Iconplus_Master_Detail,Iconplus_Master_Bandwith, Iconplus_Master_Jarak){
        $scope.action = $routeParams.action;
        $scope.accounting = accounting;
        $scope.title = $scope.action == 'add' ? 'Tambah' : $scope.action == 'edit' ? 'Edit' : 'Lihat';
        $scope.table = [];
        // toolbar
        $scope.toolbar = {
            title: 'APPROVAL DAN TINDAK LANJUT PERMOHONAN'
        };

            $scope.ref = {
                ap:[],
                bandwith:[],
                jarak:[]
            };



            // $(".select2").select2();

        // breadcrumb
        $scope.breadcrumb = {
            data: [{
                title: 'Approval dan Tindak Lanjut Permohonan'
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
                title: 'Approval Permohonan',
                title2: '(Divisi STI)',
                isactive: true
            }, {
                title: 'Tindak Lanjut Permohonan Jaringan',
                title2: '(Bidang KPK ICON+)'
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
            $scope.usrPermohonan_dokumen = {
                ismulti:true,
                isupload: false,
                isview: true,
                accept:'application/pdf',
                data:{}
            };

            $scope.retrieve = function(){
            Activiti_Task.retrieve({id: $scope.id}).then(function(response) {
                // if($scope.action != 'edit') $scope.showfiles = 5;
                $scope.usr = response.data.definitionKey;
                debugger;
                angular.forEach(response.data.processVariable, function(val, key){
                    if(key.indexOf('usrPermohonan_') == 0) {
                        $scope.datapermohonan.data[key] = val;
                    }
                    if(key.indexOf('usrPermohonan_') == 0) {
                        if($scope.usr == 'usrPermohonan')$scope.data[key] = val;
                        $scope.dataproduk[key] = val;
                    }
                    if(key.indexOf('usrVerifikasiSTI_') == 0) {
                        if($scope.usr == 'usrVerifikasiSTI')$scope.data[key] = val;
                        $scope.dataproduk[key] = val;
                    }

                    if(key.indexOf('usrPermohonan_data') == 0) {
                        if($scope.usr == 'usrPermohonan')$scope.data[key] = val;
                        $scope.table = angular.fromJson(eval(val));
                        $scope.tablekpk = angular.fromJson(eval(val));
                        $scope.kpk = val;
                    }
                    if($scope.action == 'correct') {
                        $scope.data[key] = angular.copy(val);
                    }
                });

                $scope.usrPermohonan_dokumen.data = response.data.usrPermohonan_dokumen;

                if($scope.action == 'correct'){
                    $auth.set_permission(1);
                    $scope.data.definitionKey = $routeParams.definitionKey;
                }else{
                    $scope.data.definitionKey = response.data.definitionKey;
                    $scope.isSurvey = "usrPermohonanSurvey_nosurat" in response.data.processVariable;
                }

                switch ($scope.data.definitionKey) {
                    case 'usrVerifikasiKPK' :
                        $scope.pills.select(1);
                        break;
                    case 'usrVerifikasiSTI' :
                    default :
                        break;
                }

            });
        };

           $scope.retrieve();
            $scope.modal2 = {
                header: 'Detail Data Permohonan',
                class : 'modal-lg',
                action: 'view',
                data  : {},
                buttons: []
            };

            $scope.viewTransaksi2 = function(index,item){

                $scope.modal2.data = angular.copy(item);
                $scope.modal2.index = index;
                $scope.modal2.buttons = [$scope.btnclose];
                $scope.modal2.action = 'view';
                $scope.modal2.open();
            };

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
                        .rule($validate.required($scope.modal.data.nomorcrm), 'Nomor CRM harus diisi!')

                    var isvalid2 = isvalid.check();

                    if (!isvalid2) return false;

                    var data = angular.copy($scope.modal.data);
                    // $scope.dokumendetail.clear();
                    if($scope.modal.action == 'add') {
                        $scope.tablekpk.push(data);
                    }
                    else{
                        $scope.tablekpk[$scope.modal.index] = data;
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

            $scope.$watch('modal.data.jenislayanan',function(val){
                Iconplus_Master_Bandwith.list({jenis_layanan:val}).then(function(response){
                    $scope.ref.bandwith  = response.data;
                });
                Iconplus_Master_Jarak.list({jenis_layanan:val}).then(function(response){
                    $scope.ref.jarak  = response.data;
                });
            });

            $scope.modal = {
                header: 'Edit Nomor Service ID pada CRM',
                class : 'modal-lg',
                action: 'view',
                data  : {},
                buttons: []
            };


            // if($scope.data.notabuku_data) {
            //     $scope.table = angular.fromJson($scope.data.notabuku_data);
            //     // angular.forEach($scope.table, function (val, key) {
            //     //     if (response.data['notabuku_dokumen_' + key] && $scope.table[key].dokumen == 'notabuku_dokumen_' + key) {
            //     //         $scope.table[key].dokumendata = response.data['notabuku_dokumen_' + key];
            //     //     }
            //     // });
            // }
            if($scope.data.usrPersetujuanSurvey_data) {
                $scope.table = angular.fromJson($scope.data.usrPersetujuanSurvey_data);

            }

        $scope.btnsave = $button('save', {
            onclick: function(){
                if (!$scope.isvalid()) return;

                $popup.confirm({
                    caption: 'Apakah semua data sudah benar? Data yang sudah disimpan tidak dapat diubah.',
                    buttons: [
                        $button('yes', {
                            onclick: function () {
                                // $scope.data.usrPersetujuanSurvey_dokumen = $scope.usrPersetujuanSurvey_dokumen.model;

                                //tabel
                                // $scope.data.notabuku_data = angular.toJson($scope.table);

                                // if($scope.pills.current == 0){
                                //     $scope.data.usrPersetujuanSurvey_data = angular.toJson($scope.table);
                                //     $scope.data.data = angular.toJson($scope.table);
                                // }

                                if($scope.action == 'correct'){
                                    var datakoreksi = {};
                                    datakoreksi.id = $routeParams.id;
                                    datakoreksi.definitionKey = "usrVerifikasiSTI";
                                    datakoreksi.hasilevaluasi = $scope.data.hasilevaluasi
                                    datakoreksi.perihal = $scope.data.perihal;
                                    Activiti_Task.correct(datakoreksi).then(function(response){
                                        $alert.add('Data berhasil diperbaiki!', $alert.success);
                                        $window.location.href = alt.baseUrl + alt.correctionUrl;
                                    });
                                }else {
                                    if($scope.pills.current == 1){
                                        $scope.data.data = angular.toJson($scope.tablekpk);
                                        Iconplus_Master_Detail.insert({
                                            kpk: angular.toJson($scope.tablekpk),
                                            // kpk : $scope.kpk,
                                            // kpk : $scope.tablekpk,
                                            task_id_ : $routeParams.id,
                                            proc_inst_id_ : $routeParams.proc_inst_id_
                                        }).then(function () {
                                            Activiti_Task.complete($scope.data).then(function (response) {
                                                $window.location.href = alt.baseUrl + 'odp/verifikasi/list?id=' + $routeParams.id;
                                                $alert.add('Data berhasil disimpan!', $alert.success);
                                            });
                                        });

                                    }
                                    else {
                                        Activiti_Task.complete($scope.data).then(function (response) {
                                            $window.location.href = alt.baseUrl + 'odp/verifikasi/list?id=' + $routeParams.id;
                                            $alert.add('Data berhasil disimpan!', $alert.success);
                                        });
                                    }
                                }
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
            }
        });

        $scope.btncancel = $button($scope.action == 'view' ? 'back' : 'cancel', {
            href: alt.baseUrl + ($scope.action == 'correct' ? alt.correctionUrl :  ('odp/' + ($routeParams.redir || 'verifikasi') + '/list'))
        });



    }];
});