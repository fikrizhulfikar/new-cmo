define([
    'component/alt/button/service',
    'component/iconplus/master/unit',
    'component/iconplus/masterpendukung/regional'
], function(){
    return ['$scope', '$routeParams', '$log', '$button', '$auth', '$popup', 'Iconplus_Master_Unit','Iconplus_View_Regional',
        function($scope, $routeParams, $log, $button, $auth, $popup, Iconplus_Master_Unit,Iconplus_View_Regional){
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
                title: 'Pengelolaan Regional',
                url: alt.baseUrl + 'master/regional/list',
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
            href: alt.baseUrl + 'master/regional/detail?action=add'
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
                $scope.table.isloading = Iconplus_View_Regional.table(param);
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
                href: alt.baseUrl + 'master/regional/detail?action=edit&id_regional=' + item.id_regional
            });
        };

        $scope.btnview = function (index, item) {
            return $button('view', {
                title: '',
                icon:'fa fa-eye',
                class: 'btn btn-sm btn-info',
                href: alt.baseUrl + 'master/regional/detail?action=view&id_regional=' + item.id_regional
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