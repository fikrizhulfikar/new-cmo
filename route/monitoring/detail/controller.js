define([
    'component/alt/button/service',
    'component/activiti/task',
    'component/activiti/process',
    'component/pusharlis/master/sla',
    'component/system/user',
    'component/pusharlis/master/customer',
    'component/pusharlis/master/unit'
], function(){
    return [
        '$scope', '$routeParams', '$log', '$button', '$validate', '$alert', '$window', 'Activiti_Task', 'Activiti_Process', 'Pusharlis_Master_Sla','Pusharlis_Master_Customer', 'System_User', 'Pusharlis_Master_Unit',
        function($scope, $routeParams, $log, $button, $validate, $alert, $window, Activiti_Task, Activiti_Process, Pusharlis_Master_Sla,Pusharlis_Master_Customer, System_User, Pusharlis_Master_Unit){
            $scope.action = $routeParams.action;
            $scope.title = $scope.action == 'add' ? 'Tambah' : $scope.action == 'edit' ? 'Edit' : 'Lihat';

            $scope.sla = {};
            $scope.user = {};
            $scope.unit = {};
            $scope.datapermohonan = {};
            Pusharlis_Master_Sla.groupValues().then(function(response){
                angular.forEach(response.data,function(val,key){
                    $scope.sla[val.groupname] = val.sla;
                });
                $scope.perjanjian.sla = $scope.sla;
                $scope.prapenugasan.sla = $scope.sla;
                $scope.penugasan.sla = $scope.sla;
                $scope.pengadaan.sla = $scope.sla;
                $scope.pekerjaan.sla = $scope.sla;
                $scope.penyelesaian.sla = $scope.sla;
            });

            System_User.list().then(function(response){
                angular.forEach(response.data,function(val,key){
                    $scope.user[val.userid] = val;
                });
                $scope.user[1] = {
                    name : 'System Admin'
                };
                $scope.perjanjian.user = $scope.user;
                $scope.prapenugasan.user = $scope.user;
                $scope.penugasan.user = $scope.user;
                $scope.pengadaan.user = $scope.user;
                $scope.pekerjaan.user = $scope.user;
                $scope.penyelesaian.user = $scope.user;
            });

            Pusharlis_Master_Unit.list().then(function(response){
                angular.forEach(response.data,function(val,key){
                    $scope.unit[val.unitid] = val;
                });
                $scope.penugasan.unit = $scope.unit;
                $scope.pengadaan.unit = $scope.unit;
                $scope.pekerjaan.unit = $scope.unit;
                $scope.penyelesaian.unit = $scope.unit;
            });

            // toolbar
            // $scope.toolbar = {
            //     title: 'MONITORING STATUS REIMBURSEMENT',
            //     description: $scope.title + ' Monitoring'
            // };

            // breadcrumb
            $scope.breadcrumb = {
                data: [{
                    title: 'Monitoring',
                    url: alt.baseUrl + 'monitoring/list'
                }, {
                    title: $scope.title,
                    isactive: true
                }]
            };

            // pills step
            $scope.pills = {
                steps: [
                    {
                        title: 'Permohonan sd Penugasan'
                    },
                    {
                        title: 'Pelaksanaan Pekerjaan'
                    },
                    {
                        title: 'Berita Acara'
                    }
                ],
                onselect: function(currentid, previousid){
                    //if(currentid > 1 && $scope.data.pemeriksaanid) $scope.isbtnshow = true;
                }
            };

            // data
            $scope.data = {
                id : $routeParams.id
            };
            $scope.save = $button('save',{
                class: 'btn btn-sm btn-success',
                onclick : function(){
                    $scope.data.catatanmonitoring = $scope.prapenugasan.data.processVariable.catatanmonitoring;
                    Activiti_Process.save($scope.data).then(function(response){
                        $alert.add('Catatan berhasil disimpan!', $alert.success);
                    });
                }
            });

            $scope.btncancel = $button('back',{
                href: alt.baseUrl + 'monitoring/list'
            });

            $scope.perjanjian = {};
            $scope.prapenugasan = {};
            $scope.penugasan = {};
            $scope.pekerjaan = {};
            $scope.pengadaan = {};
            $scope.pekerjaan = {};
            $scope.penyelesaian = {};

            $scope.ref = {
                customer : {}
            };


            Activiti_Task.retrieve({id:$routeParams.id, processInstanceId: $routeParams.processInstanceId}).then(function(response){
                $scope.prapenugasan.data = $scope.penugasan.data = $scope.pengadaan.data = $scope.pekerjaan.data = $scope.penyelesaian.data = angular.copy(response.data);
                Activiti_Task.history({not_id: $routeParams.id, processInstanceId: $routeParams.processInstanceId}).then(function(response){
                    $scope.prapenugasan.history = $scope.penugasan.history = angular.copy(response.data.list);
                });
            });

        }
    ];
});