define([
    'asset/lib/moment/min/moment-with-locales.min',
    'component/alt/button/service',
    'component/activiti/task',
    'component/iconplus/master/acttask',
    'component/iconplus/master/vstatus',
    'component/iconplus/master/vstatusunit',
    'asset/js/accounting.min'
], function(moment,accounting){
    return ['$scope', '$timeout', '$routeParams', '$button', '$log', '$auth', 'Activiti_Task', '$notification',
        'Iconplus_Master_Act_Task','Iconplus_Master_Status','Iconplus_Master_Status_Unit',
        function($scope, $timeout, $routeParams, $button, $log, $auth, Activiti_Task, $notification,
                 Iconplus_Master_Act_Task,Iconplus_Master_Status,Iconplus_Master_Status_Unit){

            $scope.accounting = accounting;
            $scope.moment = moment;

            $scope.toolbar = {
                title: 'Dashboard'
            };

            Iconplus_Master_Status_Unit.list({where : "unitid = "+$auth.userdata.unitid}).then(function(response){
                angular.forEach(response.data, function(val, key){
                    // console.log(val.verifikasi)

                    $scope.tahap1 = {
                        color: 'blue',
                        icon: 'fa fa-comment',
                        data:{
                            nama: 'Tahap Approval Permohonan',
                            jumlah: val.approval
                        }
                    };
                    $scope.tahap2 = {
                        color: 'red',
                        icon: 'fa fa-bar-chart-o',
                        data:{
                            nama: 'Verifikasi Permohonan',
                            jumlah: val.verifikasi
                        }
                    };
                    $scope.tahap3 = {
                        color: 'green',
                        icon: 'fa fa-shopping-cart',
                        data:{
                            nama: 'Proses Aktivasi',
                            jumlah: val.eksekusi
                        }
                    };
                    $scope.tahap4 = {
                        color: 'yellow',
                        icon: 'fa fa-globe',
                        data:{
                            nama: 'Selesai',
                            jumlah: val.selesai
                        }
                    };

                    $scope.counter = {
                        data: {
                            aktif: val.aktif,
                            batal: val.batal,
                            selesai: val.selesai
                        }
                    };

                    debugger;
                });

            });


            $scope.filter = {};
            $scope.btnsearch = $button('search', {
                class: 'btn btn-primary',
                onclick: function(){
                    /*for(var i = 1; i <= 8; i++){
                        if($scope['chart' + i].reload) $scope['chart' + i].reload();
                    }*/
                    $scope.reload();
                }
            });

            $scope.peta = {};


            $scope.implementasirabproyek = {};
            $scope.implementasipemasaran = {};
            $scope.implementasiperbidang = {};
            $scope.implementasifsbd = {};
            $scope.implementasidesainreview = {};
            $scope.implementasispvkonstruksi = {};

            $scope.reload = function(){
                // Pusharlis_Master_Act_Process.list(filter).then(function(response){
                Iconplus_Master_Act_Task.list({where : "unitid = "+$auth.userdata.unitid}).then(function(response){
                    for(var i = 1; i <= 1; i++){
                        if(!$scope['chart' + i]) $scope['chart' + i] = {
                            data: response.data
                        };
                        else if($scope['chart' + i].reload){
                            $scope['chart' + i].data = response.data;
                            $scope['chart' + i].reload();
                        }
                    }
                });
            };

            $scope.reload();
        }];
});