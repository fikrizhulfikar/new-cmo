define([
    'component/alt/button/service',
    'component/system/user',    
    'component/pusharlis/master/templateword'
], function(){
    return ['$scope', '$routeParams', '$log', '$button', '$timeout', '$validate', '$window', '$alert', 'Pusharlis_Master_Template_Word', 
    function($scope, $routeParams, $log, $button, $timeout, $validate, $window, $alert, Pusharlis_Master_Template_Word){
        $scope.detail = {
            action: $routeParams.action,
            templateid: $routeParams.templateid
        };
        $scope.toolbar = {
            title: 'Template Word',
            description: 'Edit Template Excel'
        };

        $scope.breadcrumb = {
            data: [{
                title: 'Template Excel',
                url: alt.baseUrl + 'master/template/list'
            }, {
                title: $scope.toolbar.description,
                isactive: true
            }]
        };

        $scope.action = $scope.detail.action;
        $scope.readonly = '';

        if($scope.action != 'add')  Pusharlis_Master_Template_Word.retrieve({templateid: $scope.detail.templateid}).then(function(response){
            $scope.templateword = angular.copy(response.data);
            if($scope.detail.action == 'view') $scope.readonly = 'readonly';
        });

        $scope.btnsave = $button('save', {
            title: 'Simpan',
            onclick: function(){
                var data = {
                    templateid: $scope.templateword.templateid,
                    file: document.getElementById('file').files[0]
                };

                var isvalid = $validate()
                    .rule($validate.required(data.templateid), 'Pilih template terlebih dahulu!')
                    .rule($validate.required(data.file), 'Pilih file terlebih dahulu!')
                    .check();
                if(!isvalid) return;

                Pusharlis_Master_Template_Word.update(data).then(function (response) {
                    $window.location.href = alt.baseUrl + 'master/template/list';
                    $alert.add('Data berhasil disimpan!', $alert.success);
                });
            }
        });

        $scope.btncancel = $button('cancel', {
            href : alt.baseUrl + 'master/template/list'
        });
        
        $scope.btnback = $button('back', {
            href : alt.baseUrl + 'master/template/list'
        });
        
    }];
});