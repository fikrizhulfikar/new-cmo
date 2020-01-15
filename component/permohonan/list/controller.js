requirejs.s.contexts._.config.shim['asset/js/tableHeadFixer'] = {
    deps: ['asset/lib/jquery/jquery.min']
};

define([
    'asset/lib/moment/min/moment-with-locales.min',
    'asset/lib/jquery/jquery.min',
    'asset/js/tableHeadFixer',
    'component/alt/button/service',
    // 'component/pusharlis/master/customer',
    'component/activiti/task'
], function(moment){
    return ['$scope', '$routeParams', '$auth', '$log', '$button', //'Pusharlis_Master_Customer',
        'Activiti_Task',
        function($scope, $routeParams, $auth, $log, $button, //Pusharlis_Master_Customer,
                 Activiti_Task){
            moment.locale('id');
            $scope.moment = moment;
            $scope.unitid = $auth.userdata.unitid;

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
                    $scope.table.isloading = Activiti_Task.table(param);
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

            $scope.buttons = function(index, item){
                return [];
            };

            $scope.ref = {
                // customer : {},
                bidang : {}
            };

         $scope.$watch('filter',function(val){
                if($scope.filter.value == ""){
                    delete $scope.filter.key;
                    delete $scope.filter.value;
                }
                if(($scope.filter.key && $scope.filter.value) || $scope.filter.definitionKey||  $scope.filter.companycode){
                    $scope.table.filter = $scope.filter;
                }
            },true);

        }];
});