define([
    'asset/lib/ui-select/dist/select.min',
    'component/system/auth',
    'component/system/user',
    'component/system/user/usergroup'
], function(){
    alt.module('ui.select');
    return ['$scope', '$rootScope', '$validate', '$http', '$window', '$auth', '$alert', '$log', '$loading', 'System_Auth', "System_User", "System_User_Usergroup",
        function($scope, $rootScope, $validate, $http, $window, $auth, $alert, $log, $loading, System_Auth, System_User, System_User_Usergroup){
        // data untuk dikirim ke server
        $scope.data = {
            username: $auth.userdata.username,
            password: "",
            usergroupid: null,
            changerole: 1
        };

        System_User.retrieve({userid: $auth.userdata.userid}).then(function(response){
            if(response.data.additionalusergroup) response.data.additionalusergroup = response.data.additionalusergroup.split(",");
            else response.data.additionalusergroup = [];
            $scope.user = angular.copy(response.data);
            $scope.user.additionalusergroup.push($scope.user.usergroupid);

            System_User_Usergroup.list({where: "usergroupid in (" + $scope.user.additionalusergroup + ")"}).then(function(response){
                $scope.usergroup = angular.copy(response.data);
            });
        });

        // fungsi login
        $scope.login = function(){
            // validasi
            var isvalid = $validate()
                .rule($validate.required($scope.data.username), 'Isi username terlebih dahulu!')
                .rule($validate.required($scope.data.password), 'Isi password terlebih dahulu!')
                .rule($validate.required($scope.data.usergroupid), 'Peran Baru harus dipilih!')
                .check();

            if(!isvalid) return;

            // kirim ke server
            System_Auth.login($scope.data).then(function(response){
                $auth.login(response.data);
                $window.location.href = alt.baseUrl + 'dashboard/administrasi';
            });
        };
    }];
});