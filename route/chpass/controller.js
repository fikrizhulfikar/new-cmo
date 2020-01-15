define([
    'asset/lib/ui-select/dist/select.min',
    'component/system/auth',
    'component/system/user',
], function(){
    alt.module('ui.select');
    return ['$scope', '$rootScope', '$validate', '$http', '$window', '$auth', '$alert', '$log', '$loading', 'System_Auth', "System_User",
        function($scope, $rootScope, $validate, $http, $window, $auth, $alert, $log, $loading, System_Auth, System_User){
        // data untuk dikirim ke server
        $scope.data = {
            username: $auth.userdata.username,
            userid : $auth.userdata.userid,
            passwordlama: "",
            passwordbaru: "",
            passwordconf: "",
        };

        // fungsi login
        $scope.login = function(){
            // validasi
            var isvalid = $validate()
                .rule($validate.required($scope.data.username), 'Isi username terlebih dahulu!')
                .rule($validate.required($scope.data.passwordlama), 'Isi password lama terlebih dahulu!')
                .rule($validate.required($scope.data.passwordbaru), 'Isi password baru terlebih dahulu!')
                .rule($scope.data.passwordbaru == $scope.data.passwordconf, 'Password baru tidak sesuai dengan password konfirmasi!')
                .check();

            if(!isvalid) return;

            System_User.chpass($scope.data).then(function (response) {
                $alert.add(response.data, $alert.success);
                // $auth.login(response.data);
                // $window.location.href = alt.baseUrl + 'dashboard/administrasi';
            });
        };
    }];
});