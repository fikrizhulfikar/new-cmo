define([
    'component/alt/button/service',
    'component/pusharlis/master/acttask2'
], function(){
    return ['$scope', '$routeParams', '$log', '$button', '$auth', '$popup','$button',
        'Pusharlis_Master_Act_Task2',
        function($scope, $routeParams, $log, $button, $auth, $popup, $button,
                 Pusharlis_Master_Act_Task2){
        $scope.$auth = $auth;
        $scope.unitid = $auth.userdata.unitid;

        $scope.buttons = function(index, item){
            return [];
        };

        $scope.table = {
            filter: {
                //     order: 'ID DESC',
                id_bidang: $scope.unitid
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
                $scope.table.isloading = Pusharlis_Master_Act_Task2.table(param);
                $scope.table.isloading.then(function (response) {
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
               if (($scope.filter.key && $scope.filter.value) || $scope.filter.def_key) {
                    $scope.table.filter = $scope.filter;
                }
            },true);

    }];
});