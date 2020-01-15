define([
    'component/iconplus/master/personilcm'
], function(){
    return ['$scope', '$rootScope', '$validate', '$http', '$window', '$auth', '$log', 'Master_Personil',
        function($scope, $rootScope, $validate, $http, $window, $auth, $log,  Master_Personil){
        // jika sudah login, arahkan ke halaman dashboard
        $scope.personils = {};

        Master_Personil.list().then(function(response){
            $scope.personils = angular.copy(response.data);
            console.log($scope.personils);
        });

        $scope.login = () =>{
            $window.location.href = alt.baseUrl + 'auth/login';
        }
    }];
});