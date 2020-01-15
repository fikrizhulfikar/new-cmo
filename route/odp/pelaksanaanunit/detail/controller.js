define([
    'asset/lib/moment/min/moment-with-locales.min',
    'asset/js/accounting.min',
    'asset/lib/ui-select/dist/select.min',
    'component/alt/button/service',
    'component/activiti/task',
    'component/iconplus/master/detail',
    'component/pusharlis/generatedoc',
    'component/system/user'
], function(moment, accounting){
    alt.module('ui.select');
    return ['$scope', '$auth', '$window', '$routeParams', '$log', '$button', '$popup', '$alert','$validate','Activiti_Task', 'System_User',
        'Pusharlis_Generatedoc','Iconplus_Master_Detail',
        function($scope, $auth, $window, $routeParams, $log, $button, $popup, $alert, $validate, Activiti_Task, System_User,
                 Pusharlis_Generatedoc,Iconplus_Master_Detail){
        $scope.action = $routeParams.action;
        $scope.title = $scope.action == 'add' ? 'Tambah' : $scope.action == 'edit' ? 'Edit' : 'Lihat';
        $scope.table = [];
        $scope.tablecrm = [];
        // toolbar
        $scope.toolbar = {
            title: 'UPDATE DAN MONITORING STATUS PELAKSANAAN - CRM'
        };
        $scope.breadcrumb = {
            data: [{
                title: 'Tindak Lanjut Permohonan'
            }, {
                title: $scope.title,
                isactive: true
            }]
        };

        $scope.usrProsesBA_dokumen2 = {
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
                title: 'Update & Monitoring Status Pelaksanaan (SBU)',
                isactive: true
            }, {
                title: 'Upload BA Aktivasi (Tim ICON+)'
            }, {
                title: 'Verifikasi BA Aktivasi (Unit)'
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
            $scope.crm = {};
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


            Iconplus_Master_Detail.table({where: "proc_inst_id_=" + $routeParams.proc_inst_id_
            }).then(function (response) {
                $scope.tablecrm.data = response.data;
                debugger;
            });

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
                    if(key.indexOf('usrProsesBA_') == 0) {
                        if($scope.usr == 'usrProsesBA')$scope.data[key] = val;
                        $scope.dataproduk[key] = val;
                    }

                    if(key.indexOf('usrPermohonan_data') == 0) {
                        if($scope.usr == 'usrPermohonan')$scope.data[key] = val;
                        $scope.table = angular.fromJson(eval(val));
                        $scope.tablekpk = angular.fromJson(eval(val));
                        $scope.kpk = val;
                    }
                    // if(key.indexOf('usrVerifikasiKPK_data') == 0) {
                    //     if($scope.usr == 'usrVerifikasi')$scope.data[key] = val;
                    //     $scope.tablecrm = angular.fromJson(eval(val));
                    // }
                    if($scope.action == 'correct') {
                        $scope.data[key] = angular.copy(val);
                    }
                });

                $scope.usrPermohonan_dokumen.data = response.data.usrPermohonan_dokumen;
                $scope.usrProsesBA_dokumen2.data = response.data.usrProsesBA_dokumen;

                if($scope.action == 'correct'){
                    $auth.set_permission(1);
                    $scope.data.definitionKey = $routeParams.definitionKey;
                }else{
                    $scope.data.definitionKey = response.data.definitionKey;
                    $scope.isSurvey = "usrPermohonanSurvey_nosurat" in response.data.processVariable;
                }

                switch ($scope.data.definitionKey) {
                    case 'usrProsesUnit' :
                        $scope.pills.select(2);
                        break;
                    case 'usrProsesBA' :
                        $scope.pills.select(1);
                        break;
                    case 'usrProsesCRM' :
                    default :
                        break;
                }

            });
        };

           $scope.retrieve();

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

            $scope.usrProsesBA_dokumen = {
                isupload: $scope.action != 'view',
                isview: $scope.action != 'add',
                ismulti:true,
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


            $scope.modal = {
                header: 'Edit Nomor i-Smilling',
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

                                if($scope.pills.current == 1){
                                    $scope.data.usrProsesBA_dokumen = $scope.usrProsesBA_dokumen.model;
                                }

                                if($scope.action == 'correct'){
                                    Activiti_Task.correct($scope.data).then(function(response){
                                        $alert.add('Data berhasil diperbaiki!', $alert.success);
                                        $window.location.href = alt.baseUrl + alt.correctionUrl;
                                    });
                                }else {
                                    Activiti_Task.complete($scope.data).then(function (response) {
                                        $window.location.href = alt.baseUrl + 'odp/pelaksanaan/list?id=' + $routeParams.id;
                                        $alert.add('Data berhasil disimpan!', $alert.success);
                                    });
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


        $scope.getnoap = {selected : undefined};


    }];
});