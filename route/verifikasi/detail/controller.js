define([
    'asset/lib/moment/min/moment-with-locales.min',
    'asset/js/accounting.min',
    'component/alt/button/service',
    'component/activiti/task',
    'component/system/user'
], function(moment, accounting){
    return [
        '$scope', '$auth', '$routeParams', '$log', '$button', '$popup','$validate',  '$alert', '$window', 'Activiti_Task', 'System_User',
        function($scope, $auth, $routeParams, $log, $button, $popup,$validate, $alert, $window, Activiti_Task, System_User){
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
                current: 1
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
                                Activiti_Task.complete($scope.data).then(function(response){
                                    $alert.add('Permohonan berhasil disimpan!', $alert.success);
                                    $window.location.href = alt.baseUrl + 'transaksi/list';
                                });
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