define([
    'component/system/auth'
], function(){
    return ['$scope', '$rootScope', '$validate', '$http', '$window', '$auth', '$alert', '$log', '$loading', 'System_Auth',
        function($scope, $rootScope, $validate, $http, $window, $auth, $alert, $log, $loading, System_Auth){
        // jika sudah login, arahkan ke halaman dashboard
        if($auth.islogin())
            $window.location.href = alt.baseUrl + 'dashboard/administrasi';

        // data untuk dikirim ke server
        $scope.data = {
            username: '',
            password: ''
        };

        // fungsi login
        $scope.login = function(){
            // validasi
            var isvalid = $validate()
                .rule($validate.required($scope.data.username), 'Isi username terlebih dahulu!')
                .rule($validate.required($scope.data.password), 'Isi password terlebih dahulu!')
                .check();

            if(!isvalid) return;

            // kirim ke server
            System_Auth.login($scope.data).then(function(response){
                $auth.login(response.data);
                $window.location.href = alt.baseUrl + 'dashboard/administrasi';
            });
        };

        $scope.forgot = function(){
            alert('Silakan hubungi system admin untuk meminta password baru!');
        };
    }];
});