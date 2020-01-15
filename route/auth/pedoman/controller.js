define([
    'component/system/auth'
], function(){
    return ['$scope', '$rootScope', '$validate', '$http', '$window', '$auth', '$log', 'System_Auth',
        function($scope, $rootScope, $validate, $http, $window, $auth, $log,  System_Auth){
        // jika sudah login, arahkan ke halaman dashboard
        $scope.login = function(){
        	$window.location.href = alt.baseUrl + 'auth/login';
        }

        $scope.pedoman = function(){
        	$window.location.href = alt.baseUrl + 'auth/landing/pedoman'
        }
    }];
});