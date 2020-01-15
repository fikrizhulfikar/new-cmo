define([
    'asset/lib/moment/min/moment-with-locales.min',
    'component/alt/button/service',
    'component/iconplus/master/detail',
    'component/iconplus/master/acttask'
], function(moment){
    return ['$scope', '$routeParams', '$log', '$button', '$alert', '$auth', '$popup', 'Iconplus_Master_Act_Task','Iconplus_Master_Detail',
        function($scope, $routeParams, $log, $button, $alert, $auth, $popup, Iconplus_Master_Act_Task,Iconplus_Master_Detail){
            $scope.$auth = $auth;
            $scope.unitid = $auth.userdata.unitid;
            moment.locale('id');
            $scope.moment = moment;

            var test = $routeParams.proc_inst_id_;

            $scope.table = {
                total_data: [],
                filter: {},
                reload: function(){
                    if($scope.table.isloading != null && $scope.table.isloading.abort)
                        $scope.table.isloading.abort();

                    // kirim data ke server
                    $scope.table.isloading = Iconplus_Master_Detail.table({proc_inst_id_:test,limit:$scope.table.limit,offset:$scope.table.offset});
                    $scope.table.isloading.then(function(response){
                        $scope.table.total = response.data.total;
                        $scope.table.data = response.data.list;
                    });
                }
            };

            $scope.buttons = function (index, item) {
                var buttons = [
                    $button('view', {
                        title: '',
                        class: 'btn btn-sm btn-info',
                        onclick: function(){
                            $scope.modal.open();
                            $scope.modal.data = item;
                            $scope.modal.data.statusproses = angular.fromJson(item.statusproses) || [{}];
                            angular.forEach($scope.modal.data.statusproses, function(val){
                                if(val.tgl) val.tgl = moment(val.tgl, "YYYYMMDD").format();
                            });
                        }
                    })
                ];

                return buttons;
            }

            $scope.modal = {
                class: "modal modal-lg",
                header: "Update Status Progress - CRM",
                data  : {
                    table : [{}]
                },
                stylecontent:"min-height: 400px",
                buttons: [
                    // $button('save', {
                    //     onclick: function(){
                    //         var data = angular.copy($scope.modal.data);
                    //         angular.forEach($scope.modal.data.statusproses, function(val){
                    //             if(val.tgl) val.tgl = moment(val.tgl).format("YYYYMMDD");
                    //         });
                    //         data.statusproses = angular.toJson(data.statusproses);
                    //         Iconplus_Master_Detail.update({nomorcrm: data.nomorcrm, statusproses: data.statusproses}).then(function (response) {
                    //             $alert.add('Status proses berhasil disimpan!', $alert.success);
                    //             $scope.modal.close();
                    //         })
                    //
                    //     }
                    // }),
                    $button('close', {
                        onclick: function(){
                            $scope.modal.close();
                        }
                    })
                ]
            };
            $scope.modal.buttons.push();

            $scope.convertstatus = function (list) {
                var liststatus = angular.fromJson(list);
                var statuscode = 0;

                if(liststatus == null){
                    return '';
                }

                for(var i = 0; i < liststatus.length ; i++){
                    statuscode = liststatus[i].s;
                }
                if(statuscode == '1.0'){
                    return 'Start Proses';
                }

                if(statuscode == '1.1'){
                    return 'On Progress';
                }

                if(statuscode == '1.2'){
                    return 'Proses Selesai';
                }


                return '';
            };

            $scope.rowCreated = function(){
                $("#fixTable").tableHeadFixer({"head" : false, "left" : 2});
                $('table thead tr th').css('background-color', '#eee');
            };

            $scope.rowCreated();


        }];
});