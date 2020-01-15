define([
    'component/alt/button/service',
    'component/system/user',    
    'component/iconplus/master/hargasewa'
], function(){
    return ['$scope', '$routeParams', '$log', '$button', '$timeout', '$validate', '$window', '$alert', 'Iconplus_Master_Harga_Sewa', 
    function($scope, $routeParams, $log, $button, $timeout, $validate, $window, $alert, Iconplus_Master_Harga_Sewa){
        $scope.detail = {
            action: $routeParams.action,
            id_harga_sewa: $routeParams.id_harga_sewa
        };
        $scope.toolbar = {
            title: 'Harga Sewa',
            description: $routeParams.action == 'add' ? 'Registrasi Harga Sewa' : $routeParams.action == 'view' ? 'Detail Harga Sewa' : 'Edit Harga Sewa'
        };

        $scope.breadcrumb = {
            data: [{
                title: 'Harga Sewa',
                url: alt.baseUrl + 'master/sewa/list'
            }, {
                title: $scope.toolbar.description,
                isactive: true
            }]
        };

        $scope.action = $scope.detail.action;
        $scope.readonly = '';

        if($scope.action != 'add')  Iconplus_Master_Harga_Sewa.retrieve({id_harga_sewa: $scope.detail.id_harga_sewa}).then(function(response){
            $scope.sewa = angular.copy(response.data);
            if($scope.detail.action == 'view') $scope.readonly = 'readonly';
        });

        $scope.btnsave = $button('save', {
            title: 'Simpan',
            onclick: function(){
                if($scope.action == 'add'){
                    $scope.sewa.action = 'add';
                    var isvalid = $validate()
                        .rule($validate.required($scope.sewa.jenis_layanan), 'Harap isi Jenis Layanan terlebih dahulu!')
                        .rule($validate.required($scope.sewa.keterangan_layanan), 'Harap isi Keterangan Layanan terlebih dahulu!')
                        .rule($validate.required($scope.sewa.lokasi), 'Harap isi Lokasi terlebih dahulu!')
                        .rule($validate.required($scope.sewa.jarak), 'Harap isi Jarak terlebih dahulu!')
                        .rule($validate.required($scope.sewa.bandwith), 'Harap isi Bandwith terlebih dahulu!')
                        .rule($validate.required($scope.sewa.rpsewa), 'Harap isi Biaya Sewa terlebih dahulu!')
                        .check();
                    if(!isvalid) return;
                    Iconplus_Master_Harga_Sewa.insert($scope.sewa).then(function (response) {
                        $window.location.href = alt.baseUrl + 'master/sewa/list';
                        $alert.add('Data berhasil disimpan!', $alert.success);
                    });
                }else if($scope.action == 'edit')
                {
                    var isvalid = $validate()
                    .rule($validate.required($scope.sewa.jenis_layanan), 'Harap isi Jenis Layanan terlebih dahulu!')
                    .rule($validate.required($scope.sewa.keterangan_layanan), 'Harap isi Keterangan Layanan terlebih dahulu!')
                    .rule($validate.required($scope.sewa.lokasi), 'Harap isi Lokasi terlebih dahulu!')
                    .rule($validate.required($scope.sewa.jarak), 'Harap isi Jarak terlebih dahulu!')
                    .rule($validate.required($scope.sewa.bandwith), 'Harap isi Bandwith terlebih dahulu!')
                    .rule($validate.required($scope.sewa.rpsewa), 'Harap isi Biaya Sewa terlebih dahulu!')
                        .check();
                    if(!isvalid) return;
                    $scope.sewa.action = 'edit';
                    Iconplus_Master_Harga_Sewa.update($scope.sewa).then(function (response) {
                        $window.location.href = alt.baseUrl + 'master/sewa/list';
                        $alert.add('Data berhasil diedit!', $alert.success);
                    });
                }
            }
        });

        $scope.btncancel = $button('cancel', {
            href : alt.baseUrl + 'master/sewa/list'
        });
        
        $scope.btnback = $button('back', {
            href : alt.baseUrl + 'master/sewa/list'
        });
        
    }];
});