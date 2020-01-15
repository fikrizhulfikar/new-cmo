define([
    'component/alt/button/service',
    'component/pusharlis/master/acttask',
    'component/pusharlis/master/vmonitoringimplementasi',
], function(){
    return ['$scope', '$routeParams', '$log', '$button', '$auth', '$popup', 'Pusharlis_Master_Act_Task','V_monitoring_implementasi',
        function($scope, $routeParams, $log, $button, $auth, $popup, Pusharlis_Master_Act_Task,V_monitoring_implementasi){
            $scope.$auth = $auth;
            $scope.unitid = $auth.userdata.unitid;

            $scope.buttons = function(index, item){
                return [];
            };

            $scope.converttobidang = function (val) {
                if(val == '1'){
                    return 'KIT';
                }

                if(val == '2'){
                    return 'TND';
                }

                if(val == '3'){
                    return 'KONS';
                }
            };


            $scope.jmlahchargecode = function (val) {
                if(val == '1'){
                    return '164';
                }

                if(val == '2'){
                    return '330';
                }

                if(val == '3'){
                    return '42';
                }
            };

            $scope.table = {
                isshowpagination: false,
                isshowviewdata: false,
                filter: {
                    // order: 'ID DESC',
                    // id_bidang: $scope.unitid
                },
                total_data: [],
                isloading: null,
                reload: function () {
                    // set parameter untuk dikirim
                    var param = angular.copy($scope.table.filter);
                    param.limit = $scope.table.limit;
                    param.offset = $scope.table.offset;
                    param.select = "id_bidang,count(chargecode) jmlchargecode,sum(sktimcomplete) jmlsktim, sum(rmpcomplete) jmlrmp, sum(rabcomplete) jmlwbs, sum(dpdcomplete) jmldpd, sum(jmltimesheet) jmltimesheet, sum(jmltransaksibiaya) jmltransaksibiaya";
                    param.group = "id_bidang";

                    // cek apakah sedang mengambil data, batalkan jika ada
                    if ($scope.table.isloading != null && $scope.table.isloading.abort)
                        $scope.table.isloading.abort();

                    // kirim data ke server
                    $scope.table.isloading = V_monitoring_implementasi.table(param);
                    $scope.table.isloading.then(function (response) {
                        $scope.table.total = response.data.total;
                        $scope.table.data = response.data.list;
                    });
                }
            };
        }];
});