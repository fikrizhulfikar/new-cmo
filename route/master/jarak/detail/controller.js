define([
    'component/alt/button/service',
    'component/system/user',    
    'component/iconplus/master/jarak'
], function(){
    return ['$scope', '$routeParams', '$log', '$button', '$timeout', '$validate', '$window', '$alert', 'Iconplus_Master_Jarak', 
    function($scope, $routeParams, $log, $button, $timeout, $validate, $window, $alert, Iconplus_Master_Jarak){
        $scope.detail = {
            action: $routeParams.action,
            jarakid: $routeParams.jarakid
        };
        console.log($scope.detail.jarakid);
        $scope.toolbar = {
            title: 'Jarak',
            description: $routeParams.action == 'add' ? 'Registrasi Jarak' : $routeParams.action == 'view' ? 'Detail Jarak' : 'Edit Jarak'
        };

        $scope.breadcrumb = {
            data: [{
                title: 'Jarak',
                url: alt.baseUrl + 'master/jarak/list'
            }, {
                title: $scope.toolbar.description,
                isactive: true
            }]
        };

        $scope.action = $scope.detail.action;
        $scope.readonly = '';

        if($scope.action != 'add')  Iconplus_Master_Jarak.retrieve({
            id_jarak: $scope.detail.jarakid
        }).then(function(response){
            $scope.jarak = angular.copy(response.data);
            console.log(Iconplus_Master_Jarak);
            if($scope.detail.action == 'view') $scope.readonly = 'readonly';
        });

        $scope.btnsave = $button('save', {
            title: 'Simpan',
            onclick: function(){
                if($scope.action == 'add'){
                    $scope.jarak.action = 'add';
                    var isvalid = $validate()
                        .rule($validate.required($scope.jarak.jenis_layanan), 'Harap isi Jenis Layanan terlebih dahulu!')
                        .rule($validate.required($scope.jarak.keterangan_layanan), 'Harap isi Keterangan Layanan terlebih dahulu!')
                        .rule($validate.required($scope.jarak.jarak), 'Harap isi Jarak terlebih dahulu!')
                        .check();
                    if(!isvalid) return;
                    Iconplus_Master_Jarak.insert($scope.jarak).then(function (response) {
                        $window.location.href = alt.baseUrl + 'master/jarak/list';
                        $alert.add('Data berhasil disimpan!', $alert.success);
                    });
                }else if($scope.action == 'edit')
                {
                    var isvalid = $validate()
                        .rule($validate.required($scope.jarak.jenis_layanan), 'Harap isi Singkatan Jarak terlebih dahulu!')
                        .rule($validate.required($scope.jarak.keterangan_layanan), 'Harap isi Alamat terlebih dahulu!')
                        .rule($validate.required($scope.jarak.jarak), 'Harap isi Telpon terlebih dahulu!')
                        .check();
                    if(!isvalid) return;
                    $scope.jarak.action = 'edit';
                    Iconplus_Master_Jarak.update($scope.jarak).then(function (response) {
                        $window.location.href = alt.baseUrl + 'master/jarak/list';
                        $alert.add('Data berhasil diedit!', $alert.success);
                    });
                }
            }
        });

        $scope.btncancel = $button('cancel', {
            href : alt.baseUrl + 'master/jarak/list'
        });
        
        $scope.btnback = $button('back', {
            href : alt.baseUrl + 'master/jarak/list'
        });
        
    }];
});