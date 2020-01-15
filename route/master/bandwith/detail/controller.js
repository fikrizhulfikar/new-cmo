define([
    'component/alt/button/service',
    'component/system/user',    
    'component/iconplus/master/bandwith'
], function(){
    return ['$scope', '$routeParams', '$log', '$button', '$timeout', '$validate', '$window', '$alert', 'Iconplus_Master_Bandwith', 
    function($scope, $routeParams, $log, $button, $timeout, $validate, $window, $alert, Iconplus_Master_Bandwith){
        $scope.detail = {
            action: $routeParams.action,
            id_bandwith: $routeParams.id_bandwith,
            jenis_layanan: $routeParams.jenis_layanan
        };
        $scope.toolbar = {
            title: 'Bandwith',
            description: $routeParams.action == 'add' ? 'Tambah Bandwith' : $routeParams.action == 'view' ? 'Detail Bandwith' : 'Edit Bandwith'
        };

        $scope.breadcrumb = {
            data: [{
                title: 'Bandwith',
                url: alt.baseUrl + 'master/bandwith/list'
            }, {
                title: $scope.toolbar.description,
                isactive: true
            }]
        };

        $scope.action = $scope.detail.action;
        $scope.readonly = '';

        if($scope.action != 'add')  Iconplus_Master_Bandwith.retrieve({
            id_bandwith: $scope.detail.id_bandwith
        }).then(function(response){
            $scope.bandwith = angular.copy(response.data);
            console.log(response.data);
            if($scope.detail.action == 'view') $scope.readonly = 'readonly';
        });

        $scope.btnsave = $button('save', {
            title: 'Simpan',
            onclick: function(){
                if($scope.action == 'add'){
                    $scope.bandwith.action = 'add';
                    var isvalid = $validate()
                        .rule($validate.required($scope.bandwith.bandwith), 'Harap isi Bandwith terlebih dahulu!')
                        .rule($validate.required($scope.bandwith.jenis_layanan), 'Harap isi Jenis Layanan terlebih dahulu!')
                        
                        .check();
                    if(!isvalid) return;
                    Iconplus_Master_Bandwith.insert($scope.bandwith).then(function (response) {
                        $window.location.href = alt.baseUrl + 'master/bandwith/list';
                        $alert.add('Data berhasil disimpan!', $alert.success);
                    });
                }else if($scope.action == 'edit')
                {
                    var isvalid = $validate()
                    .rule($validate.required($scope.bandwith.bandwith), 'Harap isi Bandwith terlebih dahulu!')
                    .rule($validate.required($scope.bandwith.jenis_layanan), 'Harap isi Jenis Layanan terlebih dahulu!')
                        .check();
                    if(!isvalid) return;
                    $scope.bandwith.action = 'edit';
                    Iconplus_Master_Bandwith.update($scope.bandwith).then(function (response) {
                        $window.location.href = alt.baseUrl + 'master/bandwith/list';
                        $alert.add('Data berhasil diedit!', $alert.success);
                    });
                }
            }
        });

        $scope.btncancel = $button('cancel', {
            href : alt.baseUrl + 'master/bandwith/list'
        });
        
        $scope.btnback = $button('back', {
            href : alt.baseUrl + 'master/bandwith/list'
        });
        
    }];
});