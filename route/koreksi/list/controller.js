requirejs.s.contexts._.config.shim['asset/js/tableHeadFixer'] = {
    deps: ['asset/lib/jquery/jquery.min']
};

define([
    'asset/lib/moment/min/moment-with-locales.min',
    'asset/lib/jquery/jquery.min',
    'asset/js/tableHeadFixer',
    'component/alt/button/service',
    'component/activiti/process',
    // 'component/pusharlis/master/customer',
    // 'component/pusharlis/master/kategori',
    // 'component/pusharlis/master/unit',
    'component/pusharlis/master/acttask'
], function(moment){
    return ['$scope', '$auth', '$routeParams', '$log', '$button', '$validate', '$alert', '$popup', 'Pusharlis_Master_Act_Task','Activiti_Process',
        function($scope, $auth, $routeParams, $log, $button, $validate, $alert, $popup, Pusharlis_Master_Act_Task,Activiti_Process){
            // $auth.set_permission(1041);
            moment.locale('id');
            $scope.moment = moment;

            // toolbar
            // $scope.toolbar = {
            //     title: 'Koreksi',
            //     description: 'Daftar Proses Berjalan'
            // };

            // breadcrumb
            $scope.breadcrumb = {
                data: [{
                    title: 'Koreksi',
                    isactive: true
                }]
            };

            // table
            $scope.filter = {};
            $scope.table = {
                total_data: [],
                filter: {},
                reload: function(){
                    // set parameter untuk dikirim
                    var param = angular.copy($scope.table.filter);
                    param.limit = $scope.table.limit;
                    param.offset = $scope.table.offset;

                    // cek apakah sedang mengambil data, batalkan jika ada
                    if($scope.table.isloading != null && $scope.table.isloading.abort)
                        $scope.table.isloading.abort();

                    // kirim data ke server
                    $scope.table.isloading = Pusharlis_Master_Act_Task.table(param);
                    $scope.table.isloading.then(function(response){
                        $scope.table.total = response.data.total;
                        $scope.table.data = response.data.list;
                    });
                }
            };

            $scope.rowCreated = function(){
                $("#fixTable").tableHeadFixer({"head" : false, "left" : 2});
                $('table thead tr th').css('background-color', '#eee');
            };

            $scope.rowCreated();

            // referensi
            $scope.ref = {
                unit: {},
                kategori: {},
                customer : {}
            };

            $scope.$watch('filter',function(val){
                if(($scope.filter.key && $scope.filter.value)){
                    $scope.table.filter = $scope.filter;
                }
            },true);


            $scope.$watch('filter',function(val){
                if($scope.filter.value == ""){
                    delete $scope.filter.key;
                    delete $scope.filter.value;
                }
                // if (($scope.filter.key && $scope.filter.value) || $scope.filter.definitionKey || $scope.filter.id_ptl) {
                if (($scope.filter.key && $scope.filter.value) || $scope.filter.def_key) {
                    $scope.table.filter = $scope.filter;
                }
            },true);



            var detailurl = 'odp/permohonan/detail';

            $scope.buttons = function(index, item){
                var buttons = [
                    $button('edit', {
                        title: '',
                        description: 'Koreksi',
                        class : 'btn btn-sm btn-warning',
                        onclick: function(){
                            $scope.modal.data.table = angular.copy([]);
                            $scope.modal.data.processInstanceId = item.proc_inst_id_;

                            Activiti_Process.task({id:item.proc_inst_id_}).then(function(response){
                                $scope.modal.data.taskid = response.data;
                                var daftarform = {};
                                var nama, url;
                                daftarform = {
                                    usrPermohonan    : {id:'00', nama: "Network Request",  url : "odp/permohonan/detail?&action=correct&id="+$scope.modal.data.taskid},
                                    usrVerifikasiSTI : {id:'01', nama: "Approval Permohonan (STI)",  url : "odp/verifikasi/detail?&action=correct&id="+$scope.modal.data.taskid+"&proc_inst_id_="+$scope.modal.data.processInstanceId}
                                };
                                angular.forEach(daftarform, function(val){
                                    $scope.modal.data.table.push(val);
                                });
                                debugger;
                                $scope.modal.open();
                            });

                        }
                    }),
                    $button('remove', {
                        title: '',
                        class : 'btn btn-sm btn-danger',
                        onclick: function(){
                            $popup.confirm({
                                caption: "Apakah anda yakin menghapus pekerjaan "+item.pekerjaan,
                                buttons: [
                                    $button('yes', {
                                        onclick: function () {
                                            Activiti_Process.remove(item.proc_inst_id_).then(function(response){
                                                $alert.add('Data berhasil dihapus!', $alert.success);
                                                $scope.table.reload();
                                            });
                                            $popup.close(true);
                                        }
                                    }),
                                    $button('no', {
                                        onclick: function () {
                                            $popup.close(false);
                                        }
                                    })
                                ]
                            });
                        }
                    })

                ];
                return buttons;
            };

            //modal
            $scope.daftarform = {
                usrPermohonan           : {id:'00', nama: "Network Request",  url : "odp/permohonan/detail?"}
            };

            $scope.modal = {
                header: 'Pilih Form',
                data  : {
                    table : []
                }
            }
        }];
});