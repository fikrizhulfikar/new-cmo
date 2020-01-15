define([
    'component/alt/button/service',
    'component/system/user',    
    'component/iconplus/master/dokumenfaseperubahan'
], function(){
    return ['$scope', '$routeParams', '$log', '$button', '$timeout', '$validate', '$window', '$alert', 'Iconplus_Dokumen_Fase_Perubahan', 
    function($scope, $routeParams, $log, $button, $timeout, $validate, $window, $alert, Iconplus_Dokumen_Fase_Perubahan){
        $scope.detail = {
            action: $routeParams.action,
            jarakid: $routeParams.id_role
        };
        console.log($scope.detail.id_role);
        $scope.toolbar = {
            title: 'Dokumen Fase Perubahan',
            description: $routeParams.action == 'add' ? 'Registrasi Jarak' : $routeParams.action == 'view' ? 'Detail Jarak' : 'Edit Jarak'
        };

        $scope.breadcrumb = {
            data: [{
                title: 'Dokumen Fase Perubahan',
                url: alt.baseUrl + 'master/dokumenfaseperubahan/list'
            }, {
                title: $scope.toolbar.description,
                isactive: true
            }]
        };

        $scope.action = $scope.detail.action;
        $scope.readonly = '';

        if($scope.action != 'add')  Iconplus_Dokumen_Fase_Perubahan.retrieve({
            id_role: $scope.detail.id_role
        }).then(function(response){
            $scope.role = angular.copy(response.data);
            console.log(Iconplus_Dokumen_Fase_Perubahan);
            if($scope.detail.action == 'view') $scope.readonly = 'readonly';
        });

        $scope.btnsave = $button('save', {
            title: 'Simpan',
            onclick: function(){
                if($scope.action == 'add'){
                    $scope.dokumenfaseperubahan.action = 'add';
                    var isvalid = $validate()
                        .rule($validate.required($scope.dokumenfaseperubahan.id_project), 'Harap isi Jenis Layanan terlebih dahulu!')
                        // .rule($validate.required($scope.dokumenfaseperubahan.id_dokumen), 'Harap isi Jenis Layanan terlebih dahulu!')
                        .rule($validate.required($scope.dokumenfaseperubahan.fase_perubahan), 'Harap isi Jenis Layanan terlebih dahulu!')
                        .rule($validate.required($scope.dokumenfaseperubahan.nama_dokumen), 'Harap isi Keterangan Layanan terlebih dahulu!')
                        .rule($validate.required($scope.dokumenfaseperubahan.bobot), 'Harap isi Jenis Layanan terlebih dahulu!')
                        .rule($validate.required($scope.dokumenfaseperubahan.keterangan), 'Harap isi Keterangan Layanan terlebih dahulu!')
                        // .rule($validate.required($scope.role_project.nama_project), 'Harap isi Jarak terlebih dahulu!')
                        .check();
                    if(!isvalid) return;
                    Iconplus_Dokumen_Fase_Perubahan.insert($scope.dokumenfaseperubahan).then(function (response) {
                        $window.location.href = alt.baseUrl + 'master/dokumenfaseperubahan/list';
                        $alert.add('Data berhasil disimpan!', $alert.success);
                    });
                }else if($scope.action == 'edit')
                {
                    var isvalid = $validate()
                        .rule($validate.required($scope.dokumenfaseperubahan.id_project), 'Harap isi Singkatan Jarak terlebih dahulu!')
                        .rule($validate.required($scope.dokumenfaseperubahan.id_dokumen), 'Harap isi Alamat terlebih dahulu!')
                        .rule($validate.required($scope.dokumenfaseperubahan.fase_perubahan), 'Harap isi Telpon terlebih dahulu!')
                        .rule($validate.required($scope.dokumenfaseperubahan.nama_dokumen), 'Harap isi Singkatan Jarak terlebih dahulu!')
                        .rule($validate.required($scope.dokumenfaseperubahan.bobot), 'Harap isi Alamat terlebih dahulu!')
                        .rule($validate.required($scope.dokumenfaseperubahan.keterangan), 'Harap isi Telpon terlebih dahulu!')
                        .check();
                    if(!isvalid) return;
                    $scope.dokumenfaseperubahan.action = 'edit';
                    Iconplus_Dokumen_Fase_Perubahan.update($scope.dokumenfaseperubahan).then(function (response) {
                        $window.location.href = alt.baseUrl + 'master/dokumenfaseperubahan/list';
                        $alert.add('Data berhasil diedit!', $alert.success);
                    });
                }
            }
        });

        $scope.btncancel = $button('cancel', {
            href : alt.baseUrl + 'master/dokumenfaseperubahan/list'
        });
        
        $scope.btnback = $button('back', {
            href : alt.baseUrl + 'master/dokumenfaseperubahan/list'
        });
        
    }];
});