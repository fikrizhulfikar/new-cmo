define([
    'component/alt/button/service',
    'component/iconplus/master/templateword'
], function(){
    return ['$scope', '$routeParams', '$log', '$button', '$auth', '$popup', 'Iconplus_Master_Template_Word', function($scope, $routeParams, $log, $button, $auth, $popup, Iconplus_Master_Template_Word){
        // toolbar
        $scope.toolbar = {
            title: 'Pengelolaan Template Word',
            description: 'Pengelolaan Template Excel dari Aplikasi'
        };

        // breadcrumb
        $scope.breadcrumb = {
            data: [{
                title: 'Master'
            }, {
                title: 'Pengelolaan Template Excel',
                url: alt.baseUrl + 'master/template/list',
                isactive: true
            }]
        };

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
                $scope.table.isloading = Iconplus_Master_Template_Word.table(param);
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
                href: alt.baseUrl + 'master/template/detail?action=edit&templateid=' + item.templateid
            });
        };
    }];
});