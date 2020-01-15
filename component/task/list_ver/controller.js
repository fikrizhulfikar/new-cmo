define([
    'asset/lib/moment/min/moment-with-locales.min',
    'component/alt/button/service',
    'component/iconplus/master/acttask'
], function(moment){
    return ['$scope', '$routeParams', '$log', '$button', '$auth', '$popup', 'Iconplus_Master_Act_Task',
        function($scope, $routeParams, $log, $button, $auth, $popup, Iconplus_Master_Act_Task){
            $scope.$auth = $auth;
            $scope.unitid = $auth.userdata.unitid;
            moment.locale('id');
            $scope.moment = moment;

            $scope.buttons = function(index, item){
                return [];
            };

            var tableFilter = {};
            var test = '0'+$auth.userdata.unitid;

            $scope.table = {
                total_data: [],
                filter: {},
                reload: function(){
                    var param = angular.copy(angular.extend($scope.filter,tableFilter));
                    param.limit = $scope.table.limit;
                    param.offset = $scope.table.offset;
                    // param.order = "create_time_ desc";

                    if($scope.table.isloading != null && $scope.table.isloading.abort)
                        $scope.table.isloading.abort();

                    // kirim data ke server
                    $scope.table.isloading = Iconplus_Master_Act_Task.table(param);
                    $scope.table.isloading.then(function(response){
                        $scope.table.total = response.data.total;
                        $scope.table.data = response.data.list;
                    });
                }
            };
            $scope.$watch('filter',function(val){
                if($scope.filter.value == ""){
                    delete $scope.filter.key;
                    delete $scope.filter.value;
                }
                // if (($scope.filter.key && $scope.filter.value) || $scope.filter.definitionKey || $scope.filter.id_ptl) {
                if ($scope.filter.key && $scope.filter.value) {
                    $scope.table.filter[$scope.filter.key] = $scope.filter.value;
                } else {
                    $scope.table.filter = {};
                }
            },true);

        }];
});