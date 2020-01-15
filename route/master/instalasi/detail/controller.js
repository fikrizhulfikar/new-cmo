define([
    'component/alt/button/service',
    'component/system/user',    
    'component/iconplus/master/hargainstalasi'
], function(){
    return ['$scope', '$routeParams', '$log', '$button', '$timeout', '$validate', '$window', '$alert', 'Iconplus_Master_Harga_Instalasi', 
    function($scope, $routeParams, $log, $button, $timeout, $validate, $window, $alert, Iconplus_Master_Harga_Instalasi){
        $scope.detail = {
            action: $routeParams.action,
            id_harga_instalasi: $routeParams.id_harga_instalasi
        };
        $scope.toolbar = {
            title: 'Biaya Instalasi',
            description: $routeParams.action == 'add' ? 'Registrasi Biaya Instalasi' : $routeParams.action == 'view' ? 'Detail Biaya Instalasi' : 'Edit Biaya Instalasi'
        };

        $scope.breadcrumb = {
            data: [{
                title: 'Biaya Instalasi',
                url: alt.baseUrl + 'master/instalasi/list'
            }, {
                title: $scope.toolbar.description,
                isactive: true
            }]
        };

        $scope.action = $scope.detail.action;
        $scope.readonly = '';

        if($scope.action != 'add')  Iconplus_Master_Harga_Instalasi.retrieve({id_harga_instalasi: $scope.detail.id_harga_instalasi}).then(function(response){
            $scope.instalasi = angular.copy(response.data);
            if($scope.detail.action == 'view') $scope.readonly = 'readonly';
        });

        $scope.btnsave = $button('save', {
            title: 'Simpan',
            onclick: function(){
                if($scope.action == 'add'){
                    $scope.instalasi.action = 'add';
                    var isvalid = $validate()
                        .rule($validate.required($scope.instalasi.jenis_layanan), 'Harap isi Jenis Layanan terlebih dahulu!')
                        .rule($validate.required($scope.instalasi.rpinstalasi), 'Harap isi Biaya Instalasi terlebih dahulu!')
                        .check();
                    if(!isvalid) return;
                    Iconplus_Master_Harga_Instalasi.insert($scope.instalasi).then(function (response) {
                        $window.location.href = alt.baseUrl + 'master/instalasi/list';
                        $alert.add('Data berhasil disimpan!', $alert.success);
                    });
                }else if($scope.action == 'edit')
                {
                    var isvalid = $validate()
                        .rule($validate.required($scope.instalasi.jenis_layanan), 'Harap isi Jenis Layanan terlebih dahulu!')
                        .rule($validate.required($scope.instalasi.rpinstalasi), 'Harap isi Biaya Instalasi terlebih dahulu!')
                        .check();
                    if(!isvalid) return;
                    $scope.instalasi.action = 'edit';
                    Iconplus_Master_Harga_Instalasi.update($scope.instalasi).then(function (response) {
                        $window.location.href = alt.baseUrl + 'master/instalasi/list';
                        $alert.add('Data berhasil diedit!', $alert.success);
                    });
                }
            }
        });

        $scope.btncancel = $button('cancel', {
            href : alt.baseUrl + 'master/instalasi/list'
        });
        
        $scope.btnback = $button('back', {
            href : alt.baseUrl + 'master/instalasi/list'
        });
        
    }];
});