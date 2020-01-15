define([
    'component/alt/button/service'
], function(){
    return ['$scope', '$routeParams', '$log', '$button', function($scope, $routeParams, $log, $button){
        $scope.breadcrumb = {
            data: [{
                title: alt.title,
                url: alt.baseUrl
            }, {
                title: 'Pengelolaan User',
                url: alt.baseUrl + 'user/list',
                isactive: true
            }]
        };
        $scope.list = {};

        $scope.btnadd = $button('add', {
            title: 'Tambah',
            icon: 'fa fa-plus',
            class: 'btn btn-default',
            href: alt.baseUrl + 'user/detail?action=add'
        });
    }];
});