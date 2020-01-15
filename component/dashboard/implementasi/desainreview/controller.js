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
            $scope.toggleCollapse = function (id) {
                document.getElementById(id).classList.toggle('collapse');
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
                    param.where =  "chargecode in ('C.I.2.17.01','O.I2.2.17.004')";
                    // 'O.I2.2.17.004','O.I2.1.17.069','C.I2.3.17.001','C.I.3.16.01','C.I.2.17.01')";
                    // C.I.2.17.01
                    // O.I2.2.17.004
                    param.limit = $scope.table.limit;
                    param.offset = $scope.table.offset;

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