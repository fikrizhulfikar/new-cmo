define([
    'component/alt/button/service',
    'component/iconplus/master/ail',
    'component/iconplus/integ/soap'
], function(){
    return ['$scope', '$routeParams', '$log', '$button', '$auth', '$popup', 'Integ_Soap', function($scope, $routeParams, $log, $button, $auth, $popup, Integ_Soap){
        // toolbar
        $scope.toolbar = {
            title: 'Pengelolaan Unit',
            description: 'Pengelolaan Unit dari Aplikasi AIL'
        };

        // breadcrumb
        $scope.breadcrumb = {
            data: [{
                title: alt.title,
                url: alt.baseUrl
            }, {
                title: 'Pengelolaan Unit',
                url: alt.baseUrl + 'master/ail/list',
                isactive: true
            }]
        };

        $scope.btnadd = $button('add', {
            title: 'Tambah',
            icon: 'fa fa-plus',
            class: 'btn btn-default',
            href: alt.baseUrl + 'master/ail/detail?action=add'
        });

        $scope.$auth = $auth;

        $scope.table = {
            total_data: [],
            isloading: null,
            reload: function () {
                // set parameter untuk dikirim
                var param = angular.copy($scope.table.filter);
                // param.limit = $scope.table.limit;
                // param.offset = $scope.table.offset;
                param.id = "535851024442";
                // cek apakah sedang mengambil data, batalkan jika ada
                if ($scope.table.isloading != null && $scope.table.isloading.abort)
                    $scope.table.isloading.abort();

                // kirim data ke server
                $scope.table.isloading = Integ_Soap.getDataByIdPelNoMeter(param);
                $scope.table.isloading.then(function (response) {
                    // console.log(response.data);
                    $scope.table.total = response.data.total;
                    $scope.table.data = response.data.list;
                });
            }
        };

        $scope.btnedit = function (index, item) {
            return $button('edit', {
                title: '',
                class: 'btn btn-sm btn-warning',
                href: alt.baseUrl + 'master/ail/detail?action=edit&id_arsip=' + item.id_arsip
            });
        };

        $scope.btnview = function (index, item) {
            return $button('view', {
                title: '',
                icon:'fa fa-eye',
                class: 'btn btn-sm btn-info',
                href: alt.baseUrl + 'master/ail/detail?action=view&id_arsip=' + item.id_arsip
            });
        };

        $scope.btnremove = function (index, item) {
            return $button('remove', {
                title: '',
                class: 'btn btn-sm btn-danger',
                onclick: function () {
                    $popup.confirm({
                        caption: "Anda yakin akan menghapus AIL : " + item.nama + " ?",
                        buttons: [
                            $button('yes', {
                                onclick: function () {
                                    Iconplus_Master_Ail.remove({id_arsip: item.id_arsip}).then(function (response) {
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
     
    }];
});