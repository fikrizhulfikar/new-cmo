define([
    'asset/lib/moment/min/moment-with-locales.min',
    'asset/js/accounting.min',
    'component/alt/button/service',
    'component/activiti/task',
    'component/iconplus/master/gudang',
    'component/system/user'
], function(moment, accounting){
    return [
        '$scope', '$auth', '$routeParams', '$log', '$button', '$popup','$validate',  '$alert', '$window', 'Activiti_Task', 'System_User',
        'Iconplus_Master_Gudang',
        function($scope, $auth, $routeParams, $log, $button, $popup,$validate, $alert, $window, Activiti_Task, System_User,Iconplus_Master_Gudang){
            $scope.action = $routeParams.action;
            // if($scope.action == 'correct') $auth.set_permission(1);
            // else $auth.set_permission(521);
            $scope.title = $scope.action == 'add' ? 'Tambah' : $scope.action == 'edit' ? 'Edit' : 'Lihat';
            $scope.table = [];

            // toolbar
            $scope.toolbar = {
                title: 'Input AIL',
                description: $scope.title + 'Input AIL'
            };
            $scope.ref = {
                user : {}
            };
            $scope.pills = {
                steps: [{
                    title: 'Input Arsip Induk Langganan'
                }, {
                    title: 'Verifikasi Arsip Induk Langganan'
                },
                    //     {
                    //     title: 'Penerbitan ChargeCode (Staff Pemasaran)'
                    // }, {
                    //     title: 'Verifikasi Penerbitan ChargeCode (Manajer Pemasaran)'
                    // }, {
                    //     title: 'Approval Penerbitan ChargeCode (MS Pemasaran)'
                    // }
                ],
                current: 0
            };
            System_User.list().then(function(response){
                angular.forEach(response.data, function(val, key){
                    $scope.ref.user[val.userid] = val;
                });
            });

            // breadcrumb
            $scope.breadcrumb = {
                data: [{
                    title: 'Input AIL'
                }, {
                    title: $scope.title,
                    isactive: true
                }]
            };

            $scope.permohonan = {
                action: $scope.action,
                id: $routeParams.id
            };

            $scope.isvalid = function(type){
                // $scope.permohonan.data.file = $scope.permohonan.file.model;
                var isvalid = $validate();
                isvalid
                    // .rule($validate.required($scope.permohonan.data.usrPermohonan_pekerjaan), 'Nama pekerjaan harus diisi!')
                    // .rule($validate.required($scope.permohonan.data.usrPermohonan_categoryid), 'Kategori harus dipilih!')
                    // .rule($validate.required($scope.permohonan.data.usrPermohonan_typeid), 'Tipe harus dipilih!')
                    // .rule($validate.required($scope.permohonan.data.usrPermohonan_unitasalid), 'Unit asal harus dipilih!')
                    // .rule($validate.required($scope.permohonan.data.usrPermohonan_unittujuanid), 'Unit tujuan harus dipilih!');

                if($scope.action != 'correct')
                    isvalid
                        // .rule($validate.required($scope.permohonan.data.file), 'Dokumen harus diupload!');

                return isvalid.check();
            };
            $scope.data = {
                id : $routeParams.id
            };

            $scope.btnsave = $button('save', {
                onclick: function(){
                    if (!$scope.isvalid()) return;

                    $popup.confirm({
                        caption: 'Apakah semua data sudah benar? Data yang sudah disimpan tidak dapat diubah.',
                        buttons: [
                            $button('yes', {
                                onclick: function () {

                                    $scope.permohonan.data.i01_dokumen = $scope.permohonan.i01_dokumen.model;
                                    $scope.permohonan.data.identitas_dokumen = $scope.permohonan.identitas_dokumen.model;
                                    $scope.permohonan.data.i03_dokumen = $scope.permohonan.i03_dokumen.model;
                                    $scope.permohonan.data.spjbtl_dokumen = $scope.permohonan.spjbtl_dokumen.model;
                                    $scope.permohonan.data.i09_dokumen = $scope.permohonan.i09_dokumen.model;
                                    $scope.permohonan.data.i10_dokumen = $scope.permohonan.i10_dokumen.model;
                                    $scope.permohonan.data.i11_dokumen = $scope.permohonan.i11_dokumen.model;
                                    $scope.permohonan.data.slo_dokumen = $scope.permohonan.slo_dokumen.model;
                                    $scope.permohonan.data.lain2_dokumen = $scope.permohonan.lain2_dokumen.model;
                                    // delete $scope.permohonan.data.file
                                    if($scope.action == 'correct'){
                                        $scope.permohonan.data.definitionKey = 'usrPermohonan';
                                        Activiti_Task.correct($scope.permohonan.data).then(function(response){
                                            $alert.add('Data berhasil diperbaiki!', $alert.success);
                                            $window.location.href = alt.baseUrl + alt.correctionUrl;
                                        });
                                    }else{
                                        // $scope.permohonan.data.data = angular.toJson($scope.table);
                                                   $scope.permohonan.data.data = angular.toJson($scope.permohonan.table);
                                        Activiti_Task.complete($scope.permohonan.data).then(function(response){
                                            $alert.add('Permohonan berhasil disimpan!', $alert.success);
                                            $window.location.href = alt.baseUrl + 'transaksi/list';
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
                href: alt.baseUrl + ($scope.action == 'correct' ? alt.correctionUrl :  ('transaksi/list'))
            });


            $scope.btnclose = $button('close', {
                title: 'Batal',
                onclick: function(){
                    $scope.modal.close();
                    // $scope.dokumendetail.clear();
                }
            });
            $scope.file = {
                ismulti: true,
                isupload: $scope.action != 'view',
                isview: $scope.action != 'add',
                accept:'application/pdf',
                data:{}
            };

            $scope.sppum_dokumen = {
                ismulti: true,
                isupload: $scope.action != 'view',
                isview: $scope.action != 'add',
                accept:'application/pdf',
                data:{}
            };
            $scope.kuitansi_dokumen = {
                ismulti: true,
                isupload: $scope.action != 'view',
                isview: $scope.action != 'add',
                accept:'application/pdf',
                data:{}
            };
            $scope.faktupjk_dokumen = {
                ismulti: true,
                isupload: $scope.action != 'view',
                isview: $scope.action != 'add',
                accept:'application/pdf',
                data:{}
            };
            $scope.jum_dokumen = {
                ismulti: true,
                isupload: $scope.action != 'view',
                isview: $scope.action != 'add',
                accept:'application/pdf',
                data:{}
            };
            $scope.bap_dokumen = {
                ismulti: true,
                isupload: $scope.action != 'view',
                isview: $scope.action != 'add',
                accept:'application/pdf',
                data:{}
            };
            $scope.sptjp_dokumen = {
                ismulti: true,
                isupload: $scope.action != 'view',
                isview: $scope.action != 'add',
                accept:'application/pdf',
                data:{}
            };
            $scope.dpl_dokumen = {
                ismulti: true,
                isupload: $scope.action != 'view',
                isview: $scope.action != 'add',
                accept:'application/pdf',
                data:{}
            };


            $scope.$watch('modal.data.tglinvoice2', function(val){
                if(val) {
                    $scope.modal.data.tglinvoice= moment(val).format('YYYYMMDD');
                }
            });
            $scope.$watch('modal.data.tglinvoice', function(val){
                if(val) {
                    $scope.modal.data.tglinvoice2 = moment(val, 'YYYYMMDD').format();
                }
            });
            $scope.$watch('modal.data.nilai',function(val){
                $scope.data.nilai = accounting.formatNumber(accounting.unformat(val,","), 0, '.', ',');
            });


        }
    ];
});