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
            // $scope.toolbar = {
            //     title: 'Revisi Upload Dokumen Penagihan',
            //     description: $scope.title + 'Revisi Upload Dokumen Penagihan'
            // };
            $scope.ref = {
                user : {}
            };

            System_User.list().then(function(response){
                angular.forEach(response.data, function(val, key){
                    $scope.ref.user[val.userid] = val;
                });
            });

            // breadcrumb
            $scope.breadcrumb = {
                data: [{
                    title: 'Revisi Upload Dokumen Penagihan'
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


                // if($scope.permohonan.data.usrPermohonan_typeid != 1) {
                //     isvalid
                //         // .rule($validate.required($scope.permohonan.data.usrPermohonan_nosurat), 'Nomor surat harus diisi!')
                //         // .rule($validate.required($scope.permohonan.data.usrPermohonan_tglsurat), 'Tanggal surat harus diisi!')
                //         // .rule($validate.required($scope.permohonan.data.usrPermohonan_perihal), 'Perihal harus diisi!');
                // }
                isvalid
                    // .rule($validate.required($scope.permohonan.data.usrPermohonan_kategori), 'Kategori harus dipilih!')
                    // .rule($validate.required($scope.permohonan.data.usrPermohonan_nopo), 'Nomor PO harus diisi!')
                    // .rule($validate.required($scope.permohonan.data.usrPermohonan_noinvoiceataukuitansi), 'Nomor Invoice harus diisi!')
                    // .rule($validate.required($scope.permohonan.data.usrPermohonan_tglinvoiceataukuitansi2), 'Tanggal Invoice harus diisi!')
                    // .rule($validate.required($scope.permohonan.data.usrPermohonan_nofakturpajak), 'Nomor Faktur Pajak harus diisi!')
                    // .rule($validate.required($scope.permohonan.data.usrPermohonan_dpp), 'Nilai DPP harus diisi!')


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

                                    $scope.permohonan.data.usrPermohonan_dokumen = $scope.permohonan.file.model;
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
                                            $window.location.href = alt.baseUrl + 'odp/revisi/list';
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
                href: alt.baseUrl + ($scope.action == 'correct' ? alt.correctionUrl :  ('odp/' + ($routeParams.redir || 'revisi') + '/list'))
            });

            $scope.modal = {
                header: 'Data Invoice',
                class : 'modal-lg',
                action: 'view',
                data  : {},
                buttons: []
            };

            $scope.btnadd = $button('add', {
                //class : 'btn btn-success',
                title: 'Tambah Invoice',
                onclick: function(){
                    $scope.modal.data = {};
                    $scope.modal.action = 'add';
                    $scope.modal.buttons = [$scope.btnsavemodal, $scope.btnclose];
                    $scope.modal.open();
                }
            });
            $scope.btnsavemodal = $button('save', {
                onclick: function(){
                    // $scope.modal.data.dokumendetail = $scope.dokumendetail.model;
                    var isvalid = $validate()
                    // .rule($validate.required($scope.modal.data.jabatan), 'Jabatan harus diisi!')
                    // .rule($validate.required($scope.modal.data.nama_pegawai), 'Nama harus diisi!')

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
            $scope.file = {
                isupload: $scope.action != 'view',
                isview: $scope.action != 'add',
                accept:'application/pdf',
                data:{}
            };


        }
    ];
});