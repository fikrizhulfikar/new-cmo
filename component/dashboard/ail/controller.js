define([
    'asset/lib/moment/min/moment-with-locales.min'
], function(moment){
    moment.locale('id');
    return ['$scope', '$routeParams', '$log', '$auth',
        function($scope, $routeParams, $log, $auth){
            $scope.moment = moment;
            $scope.filter = {};
            $scope.chart = {
                type: 'mscolumn3d',
                height: '550px',
                dataSource: {
                    categories: [{category: []}],
                    dataset:[]
                }
            };

            $scope.data = [];
            $scope.rekap = {};
            $scope.ref = {
                bidang: {}
            };
            $scope.init = function(){
                $scope.filter.where = "id_status is not null";
                $scope.rekap = angular.copy({});
                angular.forEach($scope.data, function(item){
                    var keterangan = item.keterangan;
                    if (!$scope.rekap[keterangan]) $scope.rekap[keterangan] = {
                        label: keterangan,
                        value: {bidang: {}},
                        jumlah: 0
                    };
                    $scope.rekap[keterangan]['jumlah']++;

                    // bidang
                    if (!$scope.rekap[keterangan]['value']['bidang'][item.status])
                        $scope.rekap[keterangan]['value']['bidang'][item.status] = {
                            // label: $scope.ref.bidang[item.id_status].keterangan,
                            label: item.status,
                            jumlah: 0
                        };
                    $scope.rekap[keterangan]['value']['bidang'][item.status]['jumlah']++;
                });
                $scope.reload(angular.copy($scope.rekap));
            };

            $scope.reload = function(rekap){
                if(rekap) {
                    $scope.chart.dataSource.categories = angular.copy([{category: []}]);
                    $scope.chart.dataSource.dataset = angular.copy([]);

                    var category = [],
                        dataset = [],
                        ref_series = {},
                        ref_data = {};

                    angular.forEach(rekap, function(item, yyyymm){
                        category.push({
                            label: item.label
                        });
                        ref_data[yyyymm] = category.length-1;

                        angular.forEach(item.value.bidang, function(item2, status){
                            if(typeof ref_series[status] === 'undefined'){
                                dataset.push({
                                    seriesname: item2.label,
                                    data: []
                                });
                                ref_series[status] = dataset.length-1;
                            }
                            dataset[ref_series[status]].data[ref_data[yyyymm]] = {value: item2.jumlah};
                        });
                    });
                    $scope.chart.dataSource.categories = [{category: category}];
                    $scope.chart.dataSource.dataset = dataset;
                }else{
                    $scope.init();
                }
            };

            $scope.$watch("data", function(val){
                if(val.length) $scope.reload();
            });
        }];
});