define([
    'asset/lib/moment/min/moment-with-locales.min',
    'component/alt/button/service',
    'component/activiti/task',
    'component/activiti/process',
    'component/system/user/userrole'
], function(moment){
    return ['$scope', '$auth', '$routeParams', '$log', '$button', '$popup','$validate', '$alert', 'Activiti_Task', 'System_User_Userrole', 'Activiti_Process',
        function($scope, $auth, $routeParams, $log, $button, $popup,$validate, $alert, Activiti_Task, System_User_Userrole, Activiti_Process){
        moment.locale('id');
        $scope.moment = moment;
        $scope.unitid = $auth.userdata.unitid;

        // toolbar
        // $scope.toolbar = {
        //     title: 'Revisi Pengajuan Reimburse',
        //     description: 'Daftar Pengajuan Reimburse'
        // };

        // breadcrumb
        $scope.breadcrumb = {
            data: [{
                title: 'Revisi Pengajuan Reimburse'
            }, {
                title: 'Daftar',
                url: alt.baseUrl + 'spb/revisi/list',
                isactive: true
            }]
        };


            // if($scope.action == 'correct'){
            //     $auth.set_permission(1);
            //     $scope.data.definitionKey = $routeParams.definitionKey;
            // }else{
            //     $scope.data.definitionKey = response.data.definitionKey;
            //     $scope.isSurvey = "usrPermohonanSurvey_nosurat" in response.data.processVariable;
            // }
            //
            //

        // table
        var detailurl = 'odp/revisi/detail';
            // var path = 'detail';
        $scope.permohonan = {
            filter : {
                // definitionKey : 'usrPermohonan',
                def_key : 'usrPermohonan',
                unitid:$auth.userdata.unitid
                //companycode : $scope.unitid
            },
            buttons: function(index, item){
                var buttons = [
                    $button('edit', {
                        title: '',
                        class : 'btn btn-sm btn-warning',
                        // href: alt.baseUrl + detailurl + '?action=edit&id=' + item.id
                        href: alt.baseUrl + detailurl + '?action=edit&id=' + item.task_id_
                    })
                    // $button('', {
                    //     title: '',
                    //     description: path == 'detail' ? 'Edit' : 'Edit',
                    //     href: alt.baseUrl + 'spb/revisi/' + path + '?action=edit&id=' + item.id + '&processInstanceId=' + item.processInstanceId,
                    //     icon: 'fa fa-edit',
                    //     style: '',
                    //     class: path == 'detail_info' ? 'btn btn-sm btn-info' : 'btn btn-sm btn-warning'
                    // })

                ];

                return buttons;
            }
        };

        $scope.btnadd = $button('add', {
            href: alt.baseUrl + detailurl + '?action=add'
        });


        $scope.ref = {
            userrole : []
        };

    }];
});