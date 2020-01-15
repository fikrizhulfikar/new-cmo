define([
    'asset/lib/moment/min/moment-with-locales.min',
    'component/alt/button/service',
    'asset/lib/jquery/jquery.min',
    'component/alt/button/service',
    'component/iconplus/updcapaian/vcapaian_aktivitas'
], function(moment){
    return ['$scope', '$route', '$routeParams', '$log', '$button', '$auth', '$window', '$alert', '$validate', '$popup', 'Iconplus_Updcapaian_Vcapaian_aktivitas',
        function($scope, $route, $routeParams, $log,  $button, $auth, $window, $alert, $validate, $popup, Iconplus_Updcapaian_Vcapaian_aktivitas){
        //moment
        moment.locale('id');
        $scope.moment = moment;

        // breadcrumb
        $scope.breadcrumb = {
            data: [{
                title: alt.title,
                url: alt.baseUrl
            }, {
                title: 'Pengelolaan Unit',
                url: alt.baseUrl + 'updcapaian/list',
                isactive: true
            }]
        };

        $scope.toolbar = {
            title: 'Pengelolaan Capaian',
            description: 'Pengelolaan Capaian dari Aplikasi CMO'
        };
         $scope.refunit = {};
            Iconplus_Updcapaian_Vcapaian_aktivitas.keyval().then(function(response){
            $scope.refunit = response.data;
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
                $scope.table.isloading = Iconplus_Updcapaian_Vcapaian_aktivitas.table(param);
                $scope.table.isloading.then(function (response) {
                    $scope.table.total = response.data.total;
                    $scope.table.data = response.data.list;
                });
            }
        };

        $scope.modal = {
                header: 'Master Unit',
                data  : {

                }
            }

        var state = ''; 


        $scope.btnadd = $button('add', {
            title: 'Tambah',
            icon: 'fa fa-plus',
            class: 'btn btn-default',
            href: alt.baseUrl + 'updcapaian/vcapaian_aktivitas/detail?action=add'
        });

        $scope.btnedit = function (index, item) {
            return $button('edit', {
                title: '',
                class: 'btn btn-sm btn-warning',
                href: alt.baseUrl + 'updcapaian/vcapaian_aktivitas/detail?action=edit&unitid=' + item.unitid
            });
        };

        $scope.btnview = function (index, item) {
            return $button('view', {
                title: '',
                icon:'fa fa-eye',
                class: 'btn btn-sm btn-info',
                href: alt.baseUrl + 'updcapaian/vcapaian_aktivitas/detail?action=view&unitid=' + item.unitid
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
                                    //console.log($scope.unit)
                                    // Iconplus_Master_Unit.remove({unitid: item.unitid}).then(function (response) {
                                    Iconplus_Updcapaian_Vcapaian_aktivitas.update({
                                    isdeleted: 1,
                                    where:"unitid = "+ item.unitid}).then(function (response) {
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
                    if ($scope.filter.key != 'unitid') {
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