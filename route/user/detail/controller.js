define([
    
], function(){
    return ['$scope', '$routeParams', '$log', function($scope, $routeParams, $log){
        $scope.detail = {
            action: $routeParams.action,
            userid: $routeParams.userid
        };
        $scope.toolbar = {
            title: 'User',
            description: $routeParams.action == 'add' ? 'Registrasi User' : 'Edit User'
        };

        $scope.breadcrumb = {
            data: [{
                title: 'User',
                url: alt.baseUrl + 'user/list'
            }, {
                title: $scope.toolbar.description,
                isactive: true
            }]
        };
    }];
});