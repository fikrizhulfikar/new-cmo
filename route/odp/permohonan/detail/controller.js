define([
    'component/alt/button/service',
    'component/activiti/task',
    'component/iconplus/master/permohonan',
    'component/system/user'
], function(){
    return [
        '$scope', '$auth', '$routeParams', '$log', '$button', '$popup','$validate',  '$alert', '$window', 'Activiti_Task', 'System_User', 'Iconplus_Master_Permohonan',
        function($scope, $auth, $routeParams, $log, $button, $popup,$validate, $alert, $window, Activiti_Task, System_User, Iconplus_Master_Permohonan){
            $scope.action = $routeParams.action;
            // if($scope.action == 'correct') $auth.set_permission(1);
            // else $auth.set_permission(9);
            $scope.title = $scope.action == 'add' ? 'Tambah' : $scope.action == 'edit' ? 'Edit' : 'Lihat';

            // toolbar
            // $scope.toolbar = {
            //     title: 'PERMOHONAN NETWORK REQUEST',
            //     description: $scope.title + 'Permohonan Network Request'
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
                    title: 'Permohonan'
                }, {
                    title: 'Network Request',
                    url: alt.baseUrl + 'odp/permohonan/list'
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
                $scope.permohonan.data.file = $scope.permohonan.file.model;
                var isvalid = $validate();

                    isvalid
                    .rule($validate.required($scope.permohonan.data.usrPermohonan_namaunit), 'Unit Pemohon harus diisi!');
                    isvalid
                    .rule($validate.required($scope.permohonan.data.usrPermohonan_nomorsurat), 'Nomor Surat harus diisi!');
                    isvalid
                    .rule($validate.required($scope.permohonan.data.usrPermohonan_tglsurat2), 'Tanggal Surat harus diisi!');
                    isvalid
                    .rule($validate.required($scope.permohonan.data.usrPermohonan_pekerjaan), 'Perihal Pekerjaan harus diisi!');
                    isvalid
                    .rule($validate.required($scope.permohonan.data.usrPermohonan_pic), 'Nama PIC harus diisi!');
                    isvalid
                    .rule($validate.required($scope.permohonan.data.usrPermohonan_telp), 'Telepon PIC harus diisi!');
                    if($scope.action != 'correct')
                    isvalid
                    .rule($validate.required($scope.permohonan.data.file), 'Dokumen harus diupload!');
                    isvalid
                    .rule($validate.required($scope.permohonan.modal.data.jenispermohonan), 'Jenis Permohonan pada Detail harus diisi!');
                    isvalid
                    .rule($validate.required($scope.permohonan.modal.data.lokasi), 'Lokasi pada Detail harus diisi!');
                    if($scope.permohonan.modal.data.jenispermohonan != 'aktivasi')
                    isvalid
                    .rule($validate.required($scope.permohonan.modal.data.nomorsid), 'Nomor SID pada Detail harus diisi!');
                    isvalid
                    .rule($validate.required($scope.permohonan.modal.data.jenislayanan), 'Jenis Layanan pada Detail harus diisi!');
                    isvalid
                    .rule($validate.required($scope.permohonan.modal.data.jenislayanan), 'Jenis Layanan pada Detail harus diisi!');
                    isvalid
                    .rule($validate.required($scope.permohonan.modal.data.keteranganlayanan), 'Keterangan Layanan pada Detail harus diisi!');
                    isvalid
                    .rule($validate.required($scope.permohonan.modal.data.originating), 'Originating pada Detail harus diisi!');
                    isvalid
                    .rule($validate.required($scope.permohonan.modal.data.koordinat_originating), 'Koordinat Originating pada Detail harus diisi!');
                    isvalid
                    .rule($validate.required($scope.permohonan.modal.data.alamat_originating), 'Alamat Originating pada Detail harus diisi!');
                    isvalid
                    .rule($validate.required($scope.permohonan.modal.data.terminating), 'Terminating pada Detail harus diisi!');
                    isvalid
                    .rule($validate.required($scope.permohonan.modal.data.koordinat_terminating), 'Koordinat Terminating pada Detail harus diisi!');
                    isvalid
                    .rule($validate.required($scope.permohonan.modal.data.alamat_terminating), 'Alamat Terminating pada Detail harus diisi!');
                    isvalid
                    .rule($validate.required($scope.permohonan.modal.data.kapasitas), 'Kapasitas pada Detail harus diisi!');
                    


                return isvalid.check();
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
                                    delete $scope.permohonan.data.file
                                    if($scope.action == 'correct'){
                                        $scope.permohonan.data.definitionKey = 'usrPermohonan';
                                        $scope.permohonan.data.data = angular.toJson($scope.permohonan.table);
                                        $scope.permohonan.data.usrPermohonan_data = angular.toJson($scope.permohonan.data.table);
                                        var datakoreksi = {};
                                        datakoreksi.id = $routeParams.id;
                                        datakoreksi.definitionKey = "usrPermohonan";
                                        datakoreksi.data = angular.toJson($scope.permohonan.data.table);
                                        datakoreksi.dokumen = $scope.permohonan.file.model;
                                        $scope.permohonan.data.usrPermohonan_unitid = $scope.permohonan.data.hidden_unitid;
                                        debugger;
                                        Activiti_Task.correct($scope.permohonan.data).then(function(response){
                                            // Activiti_Task.correct(datakoreksi).then(function(response) {
                                                
                                                debugger;
                                            $scope.datajson = $scope.permohonan.data.data;
                                            Iconplus_Master_Permohonan.insert({
                                                permohonan : $scope.datajson,
                                                unitid : $scope.permohonan.data.usrPermohonan_unitid,
                                                namaunit :$scope.permohonan.data.usrPermohonan_namaunit,
                                                nomorsurat : $scope.permohonan.data.usrPermohonan_nomorsurat
                                            });

                                                $alert.add('Data berhasil diperbaiki!', $alert.success);
                                                $window.location.href = alt.baseUrl + alt.correctionUrl;
                                            // });
                                        });
                                    }else{
                                        $scope.permohonan.data.data = angular.toJson($scope.permohonan.table);
                                        //$scope.permohonan.data.usrPermohonan_unitid = $scope.permohonan.data.usrPermohonan_unitid.unitid;
                                        $scope.permohonan.data.usrPermohonan_unitid = $scope.permohonan.data.hidden_unitid;

                                        debugger;

                                        Activiti_Task.complete($scope.permohonan.data).then(function(response){

                                            debugger;

                                            //$scope.permohonan.modal.data.unitid = $scope.permohonan.data.usrPermohonan_unitid;
                                            //$scope.permohonan.modal.data.namaunit = $scope.permohonan.data.usrPermohonan_namaunit;
                                            $scope.datajson = $scope.permohonan.data.data;
                                            Iconplus_Master_Permohonan.insert({
                                                permohonan : $scope.datajson,
                                                unitid : $scope.permohonan.data.hidden_unitid,
                                                namaunit :$scope.permohonan.data.usrPermohonan_namaunit,
                                                nomorsurat : $scope.permohonan.data.usrPermohonan_nomorsurat
                                            });

                                            $alert.add('Permohonan berhasil disimpan!', $alert.success);
                                            $window.location.href = alt.baseUrl + 'odp/permohonan/list';
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
                href: alt.baseUrl + ($scope.action == 'correct' ? alt.correctionUrl :  ('odp/' + ($routeParams.redir || 'permohonan') + '/list'))
            });
            $scope.btnback = $button('back', {
                href : alt.baseUrl + 'odp/permohonan/list'
            });
        }
    ];
});