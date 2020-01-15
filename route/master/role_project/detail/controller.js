define([
    'component/alt/button/service',
    'component/system/user',    
    'component/iconplus/master/dokumenfaseperubahan'
], function(){
    return ['$scope', '$routeParams', '$log', '$button', '$timeout', '$validate', '$window', '$alert', 'Iconplus_Master_Role_Project', 
    function($scope, $routeParams, $log, $button, $timeout, $validate, $window, $alert, Iconplus_Master_Role_Project){
        $scope.detail = {
            action: $routeParams.action,
            jarakid: $routeParams.id_role
        };
        console.log($scope.detail.id_role);
        $scope.toolbar = {
            title: 'Jarak',
            description: $routeParams.action == 'add' ? 'Registrasi Jarak' : $routeParams.action == 'view' ? 'Detail Jarak' : 'Edit Jarak'
        };

        $scope.breadcrumb = {
            data: [{
                title: 'Jarak',
                url: alt.baseUrl + 'master/role_project/list'
            }, {
                title: $scope.toolbar.description,
                isactive: true
            }]
        };

        $scope.action = $scope.detail.action;
        $scope.readonly = '';

        if($scope.action != 'add')  Iconplus_Master_Role_Project.retrieve({
            id_role: $scope.detail.id_role
        }).then(function(response){
            $scope.role = angular.copy(response.data);
            console.log(Iconplus_Master_Role_Project);
            if($scope.detail.action == 'view') $scope.readonly = 'readonly';
        });

        $scope.btnsave = $button('save', {
            title: 'Simpan',
            onclick: function(){
                if($scope.action == 'add'){
                    $scope.role_project.action = 'add';
                    var isvalid = $validate()
                        .rule($validate.required($scope.role_project.username), 'Harap isi Jenis Layanan terlebih dahulu!')
                        .rule($validate.required($scope.role_project.nama_project), 'Harap isi Keterangan Layanan terlebih dahulu!')
                        // .rule($validate.required($scope.role_project.nama_project), 'Harap isi Jarak terlebih dahulu!')
                        .check();
                    if(!isvalid) return;
                    Iconplus_Master_Role_Project.insert($scope.role_project).then(function (response) {
                        $window.location.href = alt.baseUrl + 'master/role_project/list';
                        $alert.add('Data berhasil disimpan!', $alert.success);
                    });
                }else if($scope.action == 'edit')
                {
                    var isvalid = $validate()
                        .rule($validate.required($scope.role_project.username), 'Harap isi Singkatan Jarak terlebih dahulu!')
                        .rule($validate.required($scope.role_project.id_project), 'Harap isi Alamat terlebih dahulu!')
                        .rule($validate.required($scope.role_project.nama_project), 'Harap isi Telpon terlebih dahulu!')
                        .check();
                    if(!isvalid) return;
                    $scope.role_project.action = 'edit';
                    Iconplus_Master_Role_Project.update($scope.role_project).then(function (response) {
                        $window.location.href = alt.baseUrl + 'master/role_project/list';
                        $alert.add('Data berhasil diedit!', $alert.success);
                    });
                }
            }
        });

        $scope.btncancel = $button('cancel', {
            href : alt.baseUrl + 'master/role_project/list'
        });
        
        $scope.btnback = $button('back', {
            href : alt.baseUrl + 'master/role_project/list'
        });
        
    }];
});