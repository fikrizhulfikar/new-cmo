define([
    'component/system/auth'
], function(){
    return [
        '$scope', '$routeParams', '$log', '$rootScope', '$window', '$auth', '$alert', '$route', 'System_Auth',
        function($scope, $routeParams, $log, $rootScope, $window, $auth, $alert, $route, System_Auth){
            System_Auth.logout().then(function(response){
                $auth.logout();
                $window.location.href = alt.baseUrl + 'auth/login';
                
            }, function(error){
                $alert.add("Tidak dapat logout!", $alert.error);
                $window.history.back();
            });
        }
    ];
});