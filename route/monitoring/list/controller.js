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
            $scope.toolbar = {
                title: 'Network Request',
                description: 'Daftar Network Request'
            };

            // breadcrumb
            $scope.breadcrumb = {
                data: [{
                    title: 'Network Request'
                }, {
                    title: 'Daftar',
                    url: alt.baseUrl + 'monitoring/list',
                    isactive: true
                }]
            };

            // table
            var detailurl = 'monitoring/detail';
            $scope.permohonan = {
                filter : {
                    def_key : 'usr%',
                    unitid : $scope.unitid
                },
                buttons: function(index, item){
                    var buttons = [
                        $button('view', {
                            title: '',
                            class : 'btn btn-sm btn-info',
                            href: alt.baseUrl + detailurl + '?action=view&id=' + item.id + '&proc_inst_id_='+item.proc_inst_id_
                        })
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