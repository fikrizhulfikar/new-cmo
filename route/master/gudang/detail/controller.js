define([
    'component/alt/button/service',
    'component/system/user',    
    'component/iconplus/master/gudang'
], function(){
    return ['$scope', '$routeParams', '$log', '$button', '$timeout', '$validate', '$window', '$alert', 'Iconplus_Master_Gudang', 
    function($scope, $routeParams, $log, $button, $timeout, $validate, $window, $alert, Iconplus_Master_Gudang){
        $scope.detail = {
            action: $routeParams.action,
            unitid: $routeParams.unitid
        };
        $scope.toolbar = {
            title: 'Gudang',
            description: $routeParams.action == 'add' ? 'Registrasi Gudang' : $routeParams.action == 'view' ? 'Detail Gudang' : 'Edit Gudang'
        };

        $scope.breadcrumb = {
            data: [{
                title: 'Gudang',
                url: alt.baseUrl + 'master/gudang/list'
            }, {
                title: $scope.toolbar.description,
                isactive: true
            }]
        };

        $scope.action = $scope.detail.action;
        $scope.readonly = '';

        if($scope.action != 'add')  Iconplus_Master_Gudang.retrieve({gudangid: $scope.detail.gudangid}).then(function(response){
            $scope.unit = angular.copy(response.data);
            if($scope.detail.action == 'view') $scope.readonly = 'readonly';
        });

        $scope.btnsave = $button('save', {
            title: 'Simpan',
            onclick: function(){
                if($scope.action == 'add'){
                    $scope.unit.action = 'add';
                    var isvalid = $validate()
                        .rule($validate.required($scope.unit.name), 'Harap isi Nama Gudang terlebih dahulu!')
                        .rule($validate.required($scope.unit.sname), 'Harap isi Singkatan Nama terlebih dahulu!')
                        .rule($validate.required($scope.unit.address), 'Harap isi Alamat terlebih dahulu!')
                        .rule($validate.required($scope.unit.telp), 'Harap isi Telpon terlebih dahulu!')
                        .check();
                    if(!isvalid) return;
                    Iconplus_Master_Gudang.insert($scope.unit).then(function (response) {
                        $window.location.href = alt.baseUrl + 'master/gudang/list';
                        $alert.add('Data berhasil disimpan!', $alert.success);
                    });
                }else if($scope.action == 'edit')
                {
                    var isvalid = $validate()
                        .rule($validate.required($scope.unit.name), 'Harap isi Nama Gudang terlebih dahulu!')
                        .rule($validate.required($scope.unit.sname), 'Harap isi Singkatan Gudang terlebih dahulu!')
                        .rule($validate.required($scope.unit.address), 'Harap isi Alamat terlebih dahulu!')
                        .rule($validate.required($scope.unit.telp), 'Harap isi Telpon terlebih dahulu!')
                        .check();
                    if(!isvalid) return;
                    $scope.unit.action = 'edit';
                    Iconplus_Master_Gudang.update($scope.unit).then(function (response) {
                        $window.location.href = alt.baseUrl + 'master/gudang/list';
                        $alert.add('Data berhasil diedit!', $alert.success);
                    });
                }
            }
        });

        $scope.btncancel = $button('cancel', {
            href : alt.baseUrl + 'master/gudang/list'
        });
        
        $scope.btnback = $button('back', {
            href : alt.baseUrl + 'master/gudang/list'
        });
        
    }];
});