define([
    'asset/lib/ui-select/dist/select.min',
    'component/alt/button/service',
    'component/system/user',
    'component/system/user/usergroup',
    'component/pusharlis/master/unit'
], function () {
    alt.module('ui.select');
    return ['$scope', '$log', '$button', '$timeout', '$alert', 'System_User', '$routeParams', 'System_User_Usergroup', '$validate', '$window', 'Pusharlis_Master_Unit',
        function ($scope, $log, $button, $timeout, $alert, System_User, $routeParams, System_User_Usergroup, $validate, $window, Pusharlis_Master_Unit) {

        System_User_Usergroup.list().then(function(response){
            $scope.usergroup = angular.copy(response.data);
        });

        $scope.userid = '';
        $scope.action = '';

        $scope.additionalusergroup = [];
        $scope.unit = {};
        Pusharlis_Master_Unit.list().then(function(response){
            angular.forEach(response.data, function(val, key){
                $scope.unit[val.unitid] = val;
            });
        });

        $scope.reload = function(){
            // kirim data ke server
            if($scope.userid != '') System_User.retrieve({userid: $scope.userid}).then(function(response){
                if(response.data.additionalusergroup) response.data.additionalusergroup = response.data.additionalusergroup.split(",");
                $scope.user = angular.copy(response.data);
            });
        };

        $scope.btnsave = $button('save', {
            title: 'Simpan',
            onclick: function(){
                //console.log($scope.user);
                
                if($scope.action == 'add'){
                    $scope.user.action = 'add';
                    $scope.user.isenabled = 1; //add isenabled
                    var isvalid = $validate()
                        .rule($validate.required($scope.user.username), 'Harap isi username terlebih dahulu!')
                        .rule($validate.required($scope.user.password), 'Harap isi password terlebih dahulu!')
                        .rule($validate.required($scope.user.name), 'Harap isi nama terlebih dahulu!')
                        .rule($validate.required($scope.user.address), 'Harap isi alamat terlebih dahulu!')
                        .rule($validate.required($scope.user.email), 'Harap isi email terlebih dahulu!')
                        .rule($validate.required($scope.user.phone), 'Harap isi telepon terlebih dahulu!')
                        .rule($validate.required($scope.user.usergroupid), 'Harap pilih usergroup terlebih dahulu!')
                        .rule($validate.required($scope.user.unitid), 'Harap pilih unit terlebih dahulu!')
                        .check();
                    if(!isvalid) return;
                    var data = angular.copy($scope.user);
                    console.log(data);
                    if(data.additionalusergroup != undefined){
                        data.additionalusergroup = data.additionalusergroup.join(",");
                    }
                    System_User.retrievebyusername({username:"= '"+$scope.user.username+"'"}).then(function (response) {
                        if(response.data.username){
                            $alert.add('Username sudah terdaftar, harap gunakan username lain!', $alert.danger);
                        }else{
                            System_User.insert(data).then(function (response) {
                                $window.location.href = alt.baseUrl + 'user/list';
                                $alert.add('Data berhasil disimpan!', $alert.success);
                            });
                        }
                    
                    });
                    System_User.insert(data).then(function (response) {
                        $window.location.href = alt.baseUrl + 'user/list';
                        $alert.add('Data berhasil disimpan!', $alert.success);
                    });
                    //console.log(response.data);
                }else if($scope.action == 'chpasswd'){
                    $scope.user.action = 'chpasswd';
                    var isvalid = $validate()
                        .rule($validate.required($scope.user.newpassword), 'Harap isi password baru terlebih dahulu!')
                        .rule($validate.required($scope.user.confnewpass), 'Harap isi konfirmasi password baru terlebih dahulu!')
                        .check();
                    if(!isvalid) return;
                    System_User.update($scope.user).then(function (response) {
                        $window.location.href = alt.baseUrl + 'user/list';
                        //$window.location.href = alt.baseUrl + 'auth/logout';
                        $alert.add('Password berhasil diedit!', $alert.success);
                    });
                }else if($scope.action == 'edit')
                {
                    var isvalid = $validate()
                        .rule($validate.required($scope.user.name), 'Harap isi nama terlebih dahulu!')
                        .rule($validate.required($scope.user.address), 'Harap isi alamat terlebih dahulu!')
                        .rule($validate.required($scope.user.email), 'Harap isi email terlebih dahulu!')
                        .rule($validate.required($scope.user.phone), 'Harap isi telepon terlebih dahulu!')
                        .rule($validate.required($scope.user.usergroupid), 'Harap pilih usergroup terlebih dahulu!')
                        .rule($validate.required($scope.user.unitid), 'Harap pilih unit terlebih dahulu!')
                        .check();
                    if(!isvalid) return;
                    $scope.user.action = 'edit';
                    var data = angular.copy($scope.user);
                    if(data.additionalusergroup != ""){
                        data.additionalusergroup = data.additionalusergroup.join(",");
                    }
                    data.usergroup = data.usergroupid;
                    System_User.update(data).then(function (response) {
                        $window.location.href = alt.baseUrl + 'user/list';

                        $alert.add('Data berhasil diedit!', $alert.success);
                    });
                }
            }
        });

        $scope.btncancel = $button('cancel', {
            href : alt.baseUrl + 'user/list'
        });

        $timeout(function(){
            if($scope.action != 'add') $scope.reload();
        });
    }];
});