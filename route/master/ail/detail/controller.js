define([
    'component/alt/button/service',
    'component/system/user',    
    'component/iconplus/master/ail'
], function(){
    return ['$scope', '$routeParams', '$log', '$button', '$timeout', '$validate', '$window', '$alert', 'Iconplus_Master_Ail',
    function($scope, $routeParams, $log, $button, $timeout, $validate, $window, $alert, Iconplus_Master_Ail){
        $scope.detail = {
            action: $routeParams.action,
            id_arsip: $routeParams.id_arsip
        };
        $scope.toolbar = {
            title: 'Unit',
            description: $routeParams.action == 'add' ? 'Registrasi Unit' : $routeParams.action == 'view' ? 'Detail Unit' : 'Edit Unit'
        };

        $scope.breadcrumb = {
            data: [{
                title: 'Unit',
                url: alt.baseUrl + 'master/ail/list'
            }, {
                title: $scope.toolbar.description,
                isactive: true
            }]
        };

        $scope.action = $scope.detail.action;
        $scope.readonly = '';

        if($scope.action != 'add')  Iconplus_Master_Ail.retrieve({id_arsip: $scope.detail.id_arsip}).then(function(response){
            $scope.ail = angular.copy(response.data);
            if($scope.detail.action == 'view') $scope.readonly = 'readonly';
        });

        $scope.btnsave = $button('save', {
            title: 'Simpan',
            onclick: function(){
                if($scope.action == 'add'){
                    $scope.ail.action = 'add';
                    var isvalid = $validate()
                        .rule($validate.required($scope.ail.nama), 'Harap isi Nama terlebih dahulu!')
                        .check();
                    if(!isvalid) return;
                    Iconplus_Master_Ail.insert($scope.ail).then(function (response) {
                        $window.location.href = alt.baseUrl + 'master/ail/list';
                        $alert.add('Data berhasil disimpan!', $alert.success);
                    });
                }else if($scope.action == 'edit')
                {
                    var isvalid = $validate()
                        .rule($validate.required($scope.ail.nama), 'Harap isi Nama terlebih dahulu!')

                        .check();
                    if(!isvalid) return;
                    $scope.unit.action = 'edit';
                    Iconplus_Master_Ail.update($scope.ail).then(function (response) {
                        $window.location.href = alt.baseUrl + 'master/ail/list';
                        $alert.add('Data berhasil diedit!', $alert.success);
                    });
                }
            }
        });

        $scope.btncancel = $button('cancel', {
            href : alt.baseUrl + 'master/ail/list'
        });
        
        $scope.btnback = $button('back', {
            href : alt.baseUrl + 'master/ail/list'
        });
        
    }];
});