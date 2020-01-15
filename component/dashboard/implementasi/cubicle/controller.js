define([
    'component/alt/button/service',
    'component/pusharlis/master/acttask',
    'component/pusharlis/master/dashboardcubicle'
], function(){
    return ['$scope', '$routeParams', '$log', '$button', '$auth', '$popup', 'Pusharlis_Master_Act_Task','Pusharlis_Master_Dashboard_Cubicle',
        function($scope, $routeParams, $log, $button, $auth, $popup, Pusharlis_Master_Act_Task,Pusharlis_Master_Dashboard_Cubicle){
            $scope.$auth = $auth;
            $scope.unitid = $auth.userdata.unitid;

            $scope.buttons = function(index, item){
                return [];
            };

            $scope.table = {
                isshowpagination: false,
                isshowviewdata: false,
                filter: {
                    //     order: 'ID DESC',
                    // id_bidang: $scope.unitid
                },
                total_data: [],
                isloading: null,
                reload: function () {
                    // set parameter untuk dikirim
                    var param = '';
                    //param.limit = $scope.table.limit;
                    //param.offset = $scope.table.offset;

                    if ($scope.table.isloading != null && $scope.table.isloading.abort)
                       $scope.table.isloading.abort();

                    $scope.table.isloading = Pusharlis_Master_Dashboard_Cubicle.table(param);
                    $scope.table.isloading.then(function (response) {
                        $scope.table.data = response.data.list;
                    });
                }
            };
        }];
});