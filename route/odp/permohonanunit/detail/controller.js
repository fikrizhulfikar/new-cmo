define([
    'component/alt/button/service',
    'component/activiti/task',
    'component/system/user'
], function(){
    return [
        '$scope', '$auth', '$routeParams', '$log', '$button', '$popup','$validate',  '$alert', '$window', 'Activiti_Task', 'System_User',
        function($scope, $auth, $routeParams, $log, $button, $popup,$validate, $alert, $window, Activiti_Task, System_User){
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
                    .rule($validate.required($scope.permohonan.data.usrPermohonan_nomorsurat), 'Nomor Surat harus diisi!');

                // if($scope.permohonan.data.usrPermohonan_typeid != 1) {
                //     isvalid
                //         .rule($validate.required($scope.permohonan.data.usrPermohonan_nosurat), 'Nomor surat harus diisi!')
                // }
                isvalid
                // .rule($validate.required($scope.permohonan.data.usrPermohonan_pekerjaan), 'Nama pekerjaan harus diisi!')
                // // .rule($validate.required($scope.permohonan.data.usrPermohonan_unittujuanid), 'Unit tujuan harus dipilih!');

                if($scope.action != 'correct')
                    isvalid
                // .rule($validate.required($scope.permohonan.data.file), 'Dokumen harus diupload!');

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
                                        Activiti_Task.correct($scope.permohonan.data).then(function(response){
                                            // Activiti_Task.correct(datakoreksi).then(function(response) {
                                                debugger;
                                                $alert.add('Data berhasil diperbaiki!', $alert.success);
                                                $window.location.href = alt.baseUrl + alt.correctionUrl;
                                            // });
                                        });
                                    }else{
                                        $scope.permohonan.data.data = angular.toJson($scope.permohonan.table);
                                        $scope.permohonan.data.usrPermohonan_unitid = $scope.permohonan.data.usrPermohonan_unitid.unitid;
                                        Activiti_Task.complete($scope.permohonan.data).then(function(response){
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