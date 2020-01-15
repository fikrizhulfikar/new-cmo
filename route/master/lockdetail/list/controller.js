define([
    'asset/lib/moment/min/moment-with-locales.min',
    'component/alt/button/service',
    'component/iconplus/master/lockdetail',
    'component/iconplus/masterpendukung/regional'
], function(moment){
    return ['$scope', '$routeParams', '$log', '$button', '$auth', '$popup', 'Iconplus_Master_LockDetail','Iconplus_View_Regional',
        function($scope, $routeParams, $log, $button, $auth, $popup, Iconplus_Master_LockDetail,Iconplus_View_Regional){
        // toolbar
        $scope.toolbar = {
            title: 'Lock Detail',
            description: 'Lock Detail'
        };
            $scope.moment = moment;
        // breadcrumb
        $scope.breadcrumb = {
            data: [{
                title: alt.title,
                url: alt.baseUrl
            }, {
                title: 'Lock Detail',
                url: alt.baseUrl + 'master/lockdetail/list',
                isactive: true
            }]
        };

        $scope.refregional = {};
            Iconplus_View_Regional.keyval().then(function(response){
            $scope.refregional = response.data;
        });

        $scope.btnadd = $button('add', {
            title: 'Tambah',
            icon: 'fa fa-plus',
            class: 'btn btn-default',
            href: alt.baseUrl + 'master/unit/detail?action=add'
        });

        $scope.$auth = $auth;

        $scope.table = {
            total_data: [],
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
                $scope.table.isloading = Iconplus_Master_LockDetail.table(param);
                $scope.table.isloading.then(function (response) {
                    $scope.table.total = response.data.total;
                    $scope.table.data = response.data.list;
                });
            }
        };

        $scope.btnedit = function (index, item) {
            return $button('edit', {
                title: '',
                class: 'btn btn-sm btn-warning',
                href: alt.baseUrl + 'master/unit/detail?action=edit&unitid=' + item.unitid
            });
        };

        $scope.btnview = function (index, item) {
            return $button('view', {
                title: '',
                icon:'fa fa-eye',
                class: 'btn btn-sm btn-info',
                href: alt.baseUrl + 'master/unit/detail?action=view&unitid=' + item.unitid
            });
        };

        $scope.btnremove = function (index, item) {
            return $button('remove', {
                title: '',
                class: 'btn btn-sm btn-danger',
                onclick: function () {
                    $popup.confirm({
                        caption: "Anda yakin akan menghapus unit : " + item.name + " ?",
                        buttons: [
                            $button('yes', {
                                onclick: function () {
                                    Iconplus_Master_Unit.remove({unitid: item.unitid}).then(function (response) {
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
        };
		
		$scope.btnenabled_r = function (index, item) {
            if (item.r == '1') {
                return $button('locked', {
                    title: '',
                    class: 'btn btn-sm btn-danger',
                    onclick: function () {
                        item.aksi = 'ubah_enabled';
                        item.r = 0;
                        Iconplus_Master_LockDetail.update(item).then(function (response) {
                            $scope.table.reload();
                        });
                    }
                });
            } else {
                return $button('unlocked', {
                    title: '',
                    class: 'btn btn-sm btn-success',
                    onclick: function () {
                        item.aksi = 'ubah_enabled';
                        item.r = 1;
                        Iconplus_Master_LockDetail.update(item).then(function (response) {
                            $scope.table.reload();
                        });
                    }
                });
            }
        };
		
		$scope.btnenabled_t = function (index, item) {
            if (item.t == '1') {
                return $button('locked', {
                    title: '',
                    class: 'btn btn-sm btn-danger',
                    onclick: function () {
                        item.aksi = 'ubah_enabled';
                        item.t = 0;
                        Iconplus_Master_LockDetail.update(item).then(function (response) {
                            $scope.table.reload();
                        });
                    }
                });
            } else {
                return $button('unlocked', {
                    title: '',
                    class: 'btn btn-sm btn-success',
                    onclick: function () {
                        item.aksi = 'ubah_enabled';
                        item.t = 1;
                        Iconplus_Master_LockDetail.update(item).then(function (response) {
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
                    if ($scope.filter.key != 'id_regional') {
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