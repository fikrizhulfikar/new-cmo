define([
    'component/alt/button/service',
    'component/system/user',
    'component/system/auth',
    'component/iconplus/master/unit',
    'component/system/user/usergroup'
], function () {
    return ['$scope', '$log', '$button', '$popup','$timeout', '$routeParams', 'System_User', 'System_Auth', '$alert', '$auth', '$window', 'Iconplus_Master_Unit', 'System_User_Usergroup',
        function ($scope, $log, $button, $popup,$timeout, $routeParams, System_User, System_Auth, $alert, $auth, $window, Iconplus_Master_Unit, System_User_Usergroup) {
        $scope.$auth = $auth;

        $scope.filter = {};
        $scope.table = {
            total_data: [],
            filter: {},
            isloading: null,
            reload: function () {
                // set parameter untuk dikirim
                var param = angular.copy($scope.table.filter);
                param.limit = $scope.table.limit;
                param.offset = $scope.table.offset;

                // cek apakah sedang mengambil data, batalkan jika ada
                if ($scope.table.isloading != null && $scope.table.isloading.abort)
                    $scope.table.isloading.abort();

                // kirim data ke server
                $scope.table.isloading = System_User.table(param);
                $scope.table.isloading.then(function (response) {
                    $scope.table.total = response.data.total;
                    $scope.table.data = response.data.list;
                });
            }
        };

        $scope.unit = {};
        Iconplus_Master_Unit.list().then(function(response){
            angular.forEach(response.data, function(val, key){
                $scope.unit[val.unitid] = val;
            });
        });

        $scope.usergroup = {};
        System_User_Usergroup.keyval().then(function(response){
            $scope.usergroup = response.data;
        });

        $scope.btnpassword = function (index, item) {
            return $button('password', {
                title: '',
                class: 'btn btn-sm btn-info',
                description: 'Ganti Password',
                href: alt.baseUrl + 'user/chpasswd?userid=' + item.userid
            });
        };

        $scope.btnswitch = function (index, item) {
            return $button('switch', {
                title: item.username,
                onclick: function () {
                    System_Auth.switch({username: item.username}).then(function (response) {
                        $auth.login(response.data);
                        $window.location.href = alt.baseUrl;
                    });
                }
            });
        };

        $scope.btnedit = function (index, item) {
            return $button('edit', {
                title: '',
                class: 'btn btn-sm btn-warning',
                href: alt.baseUrl + 'user/detail?action=edit&userid=' + item.userid
            });
        };

        $scope.btnremove = function (index, item) {
            if ($auth.userdata.username != item.username) {
                return $button('remove', {
                    title: '',
                    class: 'btn btn-sm btn-danger',
                    onclick: function () {
                        $popup.confirm({
                            caption: "Anda yakin akan menghapus user: " + item.username + " ?",
                            buttons: [
                                $button('yes', {
                                    onclick: function () {
                                        System_User.remove({userid: item.userid}).then(function (response) {
                                            $scope.table.reload();
                                            $alert.add('Data berhasil dihapus!', $alert.success);
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
            } else {
                return $button('remove', {
                    title: '',
                    class: 'btn btn-sm btn-danger',
                    disabled: true
                });
            }
        };

        $scope.btnlogged = function (index, item) {
            if (item.isloggedin > '0') {
                return $button('choose', {
                    title: '',
                    class: 'btn btn-sm btn-primary'
                });
            } else {
                return $button('unchoose', {
                    title: '',
                    class: 'btn btn-sm btn-danger'
                });
            }
        };

        $scope.btnenabled = function (index, item) {
            if (item.isenabled == '1') {
                return $button('unlocked', {
                    title: '',
                    class: 'btn btn-sm btn-success',
                    onclick: function () {
                        item.aksi = 'ubah_enabled';
                        item.isenabled = 0;
                        System_User.update(item).then(function (response) {
                            $scope.table.reload();
                        });
                    }
                });
            } else {
                return $button('locked', {
                    title: '',
                    class: 'btn btn-sm btn-danger',
                    onclick: function () {
                        item.aksi = 'ubah_enabled';
                        item.isenabled = 1;
                        System_User.update(item).then(function (response) {
                            $scope.table.reload();
                        });
                    }
                });
            }
        };

        $scope.$watch('filter',function(val, oldval){
            if(oldval.key != val.key){
                $scope.filter.value = '';
            }else {
                if ($scope.filter.key && $scope.filter.value) {
                    if ($scope.filter.key != 'usergroupid' && $scope.filter.key != 'unitid') {
                        $scope.table.filter[$scope.filter.key] = $scope.filter.value;
                    } else {
                        $scope.table.filter['where'] = $scope.filter.key + ' = ' + $scope.filter.value;
                    }
                } else {
                    $scope.table.filter = {};
                }
            }
        },true);
    }];
});