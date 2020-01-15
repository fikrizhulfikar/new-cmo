define([
    'component/alt/button/service',
    'component/system/user',    
    'component/iconplus/master/unit'
], function(){
    return ['$scope', '$routeParams', '$log', '$button', '$timeout', '$validate', '$window', '$alert', 'Iconplus_Master_Unit', 
    function($scope, $routeParams, $log, $button, $timeout, $validate, $window, $alert, Iconplus_Master_Unit){
        $scope.detail = {
            action: $routeParams.action,
            unitid: $routeParams.unitid
        };
        $scope.toolbar = {
            title: 'Unit',
            description: $routeParams.action == 'add' ? 'Registrasi Unit' : $routeParams.action == 'view' ? 'Detail Unit' : 'Edit Unit'
        };

        $scope.breadcrumb = {
            data: [{
                title: 'Unit',
                url: alt.baseUrl + 'master/unit/list'
            }, {
                title: $scope.toolbar.description,
                isactive: true
            }]
        };

        $scope.action = $scope.detail.action;
        $scope.readonly = '';

        if($scope.action != 'add')  Iconplus_Master_Unit.retrieve({unitid: $scope.detail.unitid}).then(function(response){
            $scope.unit = angular.copy(response.data);
            if($scope.detail.action == 'view') $scope.readonly = 'readonly';
        });

        $scope.btnsave = $button('save', {
            title: 'Simpan',
            onclick: function(){
                if($scope.action == 'add'){
                    $scope.unit.action = 'add';
                    var isvalid = $validate()
                        .rule($validate.required($scope.unit.name), 'Harap isi Nama terlebih dahulu!')
                        .rule($validate.required($scope.unit.sname), 'Harap isi Singkatan Unit terlebih dahulu!')
                        .rule($validate.required($scope.unit.address), 'Harap isi Alamat terlebih dahulu!')
                        .rule($validate.required($scope.unit.telp), 'Harap isi Telpon terlebih dahulu!')
                        .check();
                    if(!isvalid) return;
                    Iconplus_Master_Unit.insert($scope.unit).then(function (response) {
                        $window.location.href = alt.baseUrl + 'master/unit/list';
                        $alert.add('Data berhasil disimpan!', $alert.success);
                    });
                }else if($scope.action == 'edit')
                {
                    var isvalid = $validate()
                        .rule($validate.required($scope.unit.name), 'Harap isi Nama terlebih dahulu!')
                        .rule($validate.required($scope.unit.sname), 'Harap isi Singkatan Unit terlebih dahulu!')
                        .rule($validate.required($scope.unit.address), 'Harap isi Alamat terlebih dahulu!')
                        .rule($validate.required($scope.unit.telp), 'Harap isi Telpon terlebih dahulu!')
                        .check();
                    if(!isvalid) return;
                    $scope.unit.action = 'edit';
                    Iconplus_Master_Unit.update($scope.unit).then(function (response) {
                        $window.location.href = alt.baseUrl + 'master/unit/list';
                        $alert.add('Data berhasil diedit!', $alert.success);
                    });
                }
            }
        });

        $scope.btncancel = $button('cancel', {
            href : alt.baseUrl + 'master/unit/list'
        });
        
        $scope.btnback = $button('back', {
            href : alt.baseUrl + 'master/unit/list'
        });
        
    }];
});