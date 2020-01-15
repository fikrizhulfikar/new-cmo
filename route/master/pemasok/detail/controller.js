define([
    'component/alt/button/service',
    'component/system/user',    
    'component/iconplus/master/unit',
    'component/iconplus/masterpendukung/pemasok'
], function(){
    return ['$scope', '$routeParams', '$log', '$button', '$timeout', '$validate', '$window', '$alert', 'Iconplus_Master_Unit', 'Iconplus_View_Pemasok',
    function($scope, $routeParams, $log, $button, $timeout, $validate, $window, $alert, Iconplus_Master_Unit,Iconplus_View_Pemasok){
        $scope.detail = {
            action: $routeParams.action,
            pemasok: $routeParams.pemasok,
            id_wilayah: $routeParams.id_wilayah,
        };

        $scope.action = $scope.detail.action;
        $scope.readonly = '';

        if($scope.action != 'add')  Iconplus_View_Pemasok.retrieve({pemasok: $scope.detail.pemasok,id_wilayah:$scope.detail.id_wilayah}).then(function(response){
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
            href : alt.baseUrl + 'master/pemasok/list'
        });
        
        $scope.btnback = $button('back', {
            href : alt.baseUrl + 'master/pemasok/list'
        });
        
    }];
});