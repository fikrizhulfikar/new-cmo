define([
    'component/alt/button/service',
    'component/pusharlis/master/acttask',
    'component/pusharlis/master/dashboardptl'
], function(){
    return ['$scope', '$routeParams', '$log', '$button', '$auth', '$popup', 'Pusharlis_Master_Act_Task','Pusharlis_Master_Dashboard_Ptl',
        function($scope, $routeParams, $log, $button, $auth, $popup, Pusharlis_Master_Act_Task,Pusharlis_Master_Dashboard_Ptl){
            $scope.$auth = $auth;
            $scope.unitid = $auth.userdata.unitid;

            $scope.buttons = function(index, item){
                return [];
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

                    // cek apakah sedang mengambil data, batalkan jika ada
                    if ($scope.table.isloading != null && $scope.table.isloading.abort)
                        $scope.table.isloading.abort();

                    // kirim data ke server
                    $scope.table.isloading = Pusharlis_Master_Dashboard_Ptl.table(param);
                    $scope.table.isloading.then(function (response) {
                        $scope.table.total = response.data.total;
                        $scope.table.data = response.data.list;
                    });
                }
            };
        }];
});