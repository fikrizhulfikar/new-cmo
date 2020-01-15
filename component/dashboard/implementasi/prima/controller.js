define([
    'component/alt/button/service',
    'component/pusharlis/master/acttask',
    'component/pusharlis/master/dashboardprima'
], function(){
    return ['$scope', '$routeParams', '$log', '$button', '$auth', '$popup', 'Pusharlis_Master_Act_Task', 'Pusharlis_Master_Dashboard_Prima',
        function($scope, $routeParams, $log, $button, $auth, $popup, Pusharlis_Master_Act_Task, Pusharlis_Master_Dashboard_Prima){
            $scope.$auth = $auth;
            $scope.unitid = $auth.userdata.unitid;

            $scope.buttons = function(index, item){
                return [];
            };

            $scope.table = {
                filter: {},
                isshowpagination: false,
                isshowviewdata: false,
                total_data: [],
                isloading: null,
                reload: function () {
                    var param = {};
                    //param.limit = $scope.table.limit;
                    //param.offset = $scope.table.offset;

                    if ($scope.table.isloading != null && $scope.table.isloading.abort)
                       $scope.table.isloading.abort();

                    // kirim data ke server
                    $scope.table.isloading = Pusharlis_Master_Dashboard_Prima.table(param);
                    $scope.table.isloading.then(function (response) {
                        // $scope.table.total = response.data.total;
                        $scope.table.data = response.data.list;
                    });
                }
            };

           }];

});