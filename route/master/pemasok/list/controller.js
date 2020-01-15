define([
    'component/alt/button/service',
    'component/iconplus/master/unit',
    'component/iconplus/masterpendukung/regional',
    'component/iconplus/masterpendukung/pemasok'
], function(){
    return ['$scope', '$routeParams', '$log', '$button', '$auth', '$popup', 'Iconplus_Master_Unit','Iconplus_View_Regional','Iconplus_View_Pemasok',
        function($scope, $routeParams, $log, $button, $auth, $popup, Iconplus_Master_Unit,Iconplus_View_Regional,Iconplus_View_Pemasok){
        // toolbar

        $scope.refregional = {};
            Iconplus_View_Regional.keyval().then(function(response){
            $scope.refregional = response.data;
        });

        $scope.btnadd = $button('add', {
            title: 'Tambah',
            icon: 'fa fa-plus',
            class: 'btn btn-default',
            href: alt.baseUrl + 'master/pemasok/detail?action=add'
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
                $scope.table.isloading = Iconplus_View_Pemasok.table(param);
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
                href: alt.baseUrl + 'master/pemasok/detail?action=edit&unitid=' + item.unitid
            });
        };

        $scope.btnview = function (index, item) {
            return $button('view', {
                title: '',
                icon:'fa fa-eye',
                class: 'btn btn-sm btn-info',
                href: alt.baseUrl + 'master/pemasok/detail?action=view&pemasok=' + item.pemasok+'&id_wilayah='+item.id_wilayah
            });
        };

        $scope.btnremove = function (index, item) {
            return $button('remove', {
                title: '',
                class: 'btn btn-sm btn-danger',
                onclick: function () {
                    $popup.confirm({
                        caption: "Anda yakin akan menghapus pembangkit : " + item.name + " ?",
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