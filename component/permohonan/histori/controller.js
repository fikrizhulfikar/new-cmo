define([
    'asset/lib/moment/min/moment-with-locales.min',
    'asset/js/accounting.min',
    'component/alt/button/service',
    'component/activiti/task',
    'component/iconplus/dashboard/trxpermohonan'
], function(moment, accounting){
    return [
        '$scope', '$routeParams', '$auth', '$log', '$button', '$popup', '$validate', '$alert', '$window', 'Activiti_Task',
        "Trx_Permohonan",
        function($scope, $routeParams, $auth, $log, $button, $popup, $validate, $alert, $window, Activiti_Task,Trx_Permohonan){
            $scope.action = $routeParams.action;
            $scope.table = [];
            $scope.combobox = [];

            // data
            $scope.id = '123';
            $scope.data = {
                processid: "ail"
            };
            // $scope.data = {
            //     id : $routeParams.id
            // };
            $scope.datadisposisi = {};

            $scope.file = {
                // ismulti: true,
                isupload: $scope.action != 'view',
                isview: $scope.action != 'add',
                accept:'application/pdf',
                data:{}
            };
            $scope.i01_dokumen = {
                // ismulti: true,
                isupload: false,
                isview: $scope.action != 'add',
                accept:'application/pdf',
                data:{}
            };
            $scope.identitas_dokumen = {
                // ismulti: true,
                isupload: false,
                isview: $scope.action != 'add',
                accept:'application/pdf',
                data:{}
            };
            $scope.i03_dokumen = {
                // ismulti: true,
                isupload: false,
                isview: $scope.action != 'add',
                accept:'application/pdf',
                data:{}
            };
            $scope.spjbtl_dokumen = {
                // ismulti: true,
                isupload: false,
                isview: $scope.action != 'add',
                accept:'application/pdf',
                data:{}
            };
            $scope.i09_dokumen = {
                // ismulti: true,
                isupload: false,
                isview: $scope.action != 'add',
                accept:'application/pdf',
                data:{}
            };
            $scope.i10_dokumen = {
                // ismulti: true,
                isupload: false,
                isview: $scope.action != 'add',
                accept:'application/pdf',
                data:{}
            };
            $scope.i11_dokumen = {
                // ismulti: true,
                isupload: false,
                isview: $scope.action != 'add',
                accept:'application/pdf',
                data:{}
            };
            $scope.slo_dokumen = {
                // ismulti: true,
                isupload: false,
                isview: $scope.action != 'add',
                accept:'application/pdf',
                data:{}
            };
            $scope.lain2_dokumen = {
                // ismulti: true,
                isupload: false,
                isview: $scope.action != 'add',
                accept:'application/pdf',
                data:{}
            };

            $scope.btnsearch = $button('search', {
                title: 'Cari',
                onclick: function(){
                    Trx_Permohonan.retrieve({idpel:$scope.data.usrPermohonan_idpel}).then(function(response){
                        $scope.idtask = response.data.task_id_;
                        Activiti_Task.retrieve({id: $scope.idtask}).then(function(response){
                            $scope.status = response.data.definitionKey;
                            angular.forEach(response.data.processVariable, function(val, key){
                                if(key.indexOf('usrPermohonan_') == 0)
                                    $scope.data[key] = val;
                                if(key.indexOf('usrPermohonan_data') == 0) {
                                    if($scope.usr == 'usrPermohonan')$scope.data[key] = val;
                                    $scope.data[key] = val;
                                    $scope.table = angular.fromJson(eval(val));
                                }
                            });
                            $scope.data.id = $scope.id;
                            $scope.data.definitionKey = response.data.definitionKey;
                            $scope.file.data = response.data.usrPermohonan_dokumen;
                            $scope.i01_dokumen.data = response.data.i01_dokumen;
                            $scope.identitas_dokumen.data = response.data.identitas_dokumen;
                            $scope.i03_dokumen.data = response.data.i03_dokumen;
                            $scope.spjbtl_dokumen.data = response.data.spjbtl_dokumen;
                            $scope.i09_dokumen.data = response.data.i09_dokumen;
                            $scope.i10_dokumen.data = response.data.i10_dokumen;
                            $scope.i11_dokumen.data = response.data.i11_dokumen;
                            $scope.slo_dokumen.data = response.data.slo_dokumen;
                            $scope.lain2_dokumen.data = response.data.lain2_dokumen;

                        });
                    })

                    // $scope.dokumendetail.clear();
                }
            });
        $scope.get = function(){
                return angular.copy($scope.data);
            };

        }
    ];
});