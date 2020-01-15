define([
    
], function(){
    return ['$scope', '$routeParams', '$auth', '$log', function($scope, $routeParams, $auth, $log){
        $scope.detail = {
            action: 'chpasswd',
            userid: $auth.userdata.userid
        };
        
        $scope.toolbar = {
            title: 'User',
            description: 'Ganti Password'
        };

        $scope.breadcrumb = {};
		/*$scope.breadcrumb = {
            data: [{
                title: alt.title,
                url: alt.baseUrl
            }, {
                title: 'Ganti Password',
                isactive: true
            }]
        };*/
    }];
});