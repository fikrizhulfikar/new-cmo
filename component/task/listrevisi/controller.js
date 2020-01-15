define([
    'asset/lib/moment/min/moment-with-locales.min',
    'component/alt/button/service',
    'component/pusharlis/master/acttask'
], function(moment){
    return ['$scope', '$routeParams', '$log', '$button', '$auth', '$popup', 'Pusharlis_Master_Act_Task',
        function($scope, $routeParams, $log, $button, $auth, $popup, Pusharlis_Master_Act_Task){
            $scope.$auth = $auth;
            $scope.unitid = $auth.userdata.unitid;
            moment.locale('id');
            $scope.moment = moment;

            $scope.buttons = function(index, item){
                return [];
            };

            if($auth.userdata.usergroup == 2 ) {
                var test = $auth.userdata.nomor_pegawai;}
            else var test = ''


            $scope.table = {
                filter: {
                    //     order: 'ID DESC',
                    unitid: $scope.unitid
                },
                total_data: [],
                isloading: null,
                reload: function () {
                    // set parameter untuk dikirim
                    var param = angular.copy($scope.table.filter);
                    if($auth.userdata.usergroup != 1 ) {
                        param.where = "unitid =  "+$scope.unitid;
                    };
                    param.limit = $scope.table.limit;
                    param.offset = $scope.table.offset;
                    param.order = "create_time_ desc";

                    // cek apakah sedang mengambil data, batalkan jika ada
                    if ($scope.table.isloading != null && $scope.table.isloading.abort)
                        $scope.table.isloading.abort();

                    // kirim data ke server
                    $scope.table.isloading = Pusharlis_Master_Act_Task.table(param);
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