define([
    'component/alt/button/service',
    'component/iconplus/master/bandwith'
], function(){
    return ['$scope', '$routeParams', '$log', '$button', '$auth', '$popup', 'Iconplus_Master_Bandwith', function($scope, $routeParams, $log, $button, $auth, $popup, Iconplus_Master_Bandwith){
        // toolbar
        $scope.toolbar = {
            title: 'Pengelolaan Bandwith',
            description: 'Pengelolaan Bandwith dari Aplikasi SIMPONI'
        };

        // breadcrumb
        $scope.breadcrumb = {
            data: [{
                title: alt.title,
                url: alt.baseUrl
            }, {
                title: 'Pengelolaan Bandwith',
                url: alt.baseUrl + 'master/bandwith/list',
                isactive: true
            }]
        };

        $scope.btnadd = $button('add', {
            title: 'Tambah',
            icon: 'fa fa-plus',
            class: 'btn btn-default',
            href: alt.baseUrl + 'master/bandwith/detail?action=add'
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
                param.order = "jenis_layanan, id_bandwith";

                // cek apakah sedang mengambil data, batalkan jika ada
                if ($scope.table.isloading != null && $scope.table.isloading.abort)
                    $scope.table.isloading.abort();

                // kirim data ke server
                $scope.table.isloading = Iconplus_Master_Bandwith.table(param);
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
                href: alt.baseUrl + 'master/bandwith/detail?action=edit&id_bandwith=' + item.id_bandwith
            });
        };

        $scope.btnview = function (index, item) {
            return $button('view', {
                title: '',
                icon:'fa fa-eye',
                class: 'btn btn-sm btn-info',
                href: alt.baseUrl + 'master/bandwith/detail?action=view&id_bandwith=' + item.id_bandwith
            });
        };

        $scope.btnremove = function (index, item) {
            return $button('remove', {
                title: '',
                class: 'btn btn-sm btn-danger',
                onclick: function () {
                    $popup.confirm({
                        caption: "Anda yakin akan menghapus jenis layanan : " + item.jenis_layanan + " dengan bandwith : " + item.bandwith +  " ?",
                        buttons: [
                            $button('yes', {
                                onclick: function () {
                                    Iconplus_Master_Bandwith.remove({idbandwith: item.id_bandwith}).then(function (response) {
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