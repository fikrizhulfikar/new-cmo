define([
    'component/alt/button/service',
    'component/system/user',    
    'component/iconplus/master/lantai'
], function(){
    return ['$scope', '$routeParams', '$log', '$button', '$timeout', '$validate', '$window', '$alert', 'Iconplus_Master_Lantai', 
    function($scope, $routeParams, $log, $button, $timeout, $validate, $window, $alert, Iconplus_Master_Lantai){
        $scope.detail = {
            action: $routeParams.action,
            id_lantai: $routeParams.id_lantai
        };
        $scope.toolbar = {
            title: 'Gudang',
            description: $routeParams.action == 'add' ? 'Registrasi Lantai' : $routeParams.action == 'view' ? 'Detail Gudang' : 'Edit Gudang'
        };

        $scope.breadcrumb = {
            data: [{
                title: 'Gudang',
                url: alt.baseUrl + 'master/lantai/list'
            }, {
                title: $scope.toolbar.description,
                isactive: true
            }]
        };

        $scope.action = $scope.detail.action;
        $scope.readonly = '';

        if($scope.action != 'add')  Iconplus_Master_Lantai.retrieve({id_lantai: $scope.detail.id_lantai}).then(function(response){
            $scope.unit = angular.copy(response.data);
            if($scope.detail.action == 'view') $scope.readonly = 'readonly';
        });

        $scope.btnsave = $button('save', {
            title: 'Simpan',
            onclick: function(){
                if($scope.action == 'add'){
                    $scope.unit.action = 'add';
                    var isvalid = $validate()
                        .rule($validate.required($scope.unit.nama_lantai), 'Harap isi Nama Lantai terlebih dahulu!')
                        .rule($validate.required($scope.unit.keterangan), 'Harap isi Keterangan terlebih dahulu!')
                        .check();
                    if(!isvalid) return;
                    Iconplus_Master_Lantai.insert($scope.unit).then(function (response) {
                        $window.location.href = alt.baseUrl + 'master/lantai/list';
                        $alert.add('Data berhasil disimpan!', $alert.success);
                    });
                }else if($scope.action == 'edit')
                {
                    var isvalid = $validate()
                        .rule($validate.required($scope.unit.nama_lantai), 'Harap isi Nama Lantai terlebih dahulu!')
                        .rule($validate.required($scope.unit.keterangan), 'Harap isi Keterangan terlebih dahulu!')
                        .check();
                    if(!isvalid) return;
                    $scope.unit.action = 'edit';
                    Iconplus_Master_Lantai.update($scope.unit).then(function (response) {
                        $window.location.href = alt.baseUrl + 'master/lantai/list';
                        $alert.add('Data berhasil diedit!', $alert.success);
                    });
                }
            }
        });

        $scope.btncancel = $button('cancel', {
            href : alt.baseUrl + 'master/lantai/list'
        });
        
        $scope.btnback = $button('back', {
            href : alt.baseUrl + 'master/lantai/list'
        });
        
    }];
});