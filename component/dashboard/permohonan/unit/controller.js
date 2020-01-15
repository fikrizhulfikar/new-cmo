define([
    'asset/lib/moment/min/moment-with-locales.min',
    'component/pusharlis/master/unit'
], function(moment){
    moment.locale('id');
    return ['$scope', '$routeParams', '$log', '$auth','Pusharlis_Master_Unit',
        function($scope, $routeParams, $log, $auth, Pusharlis_Master_Unit){
            $scope.moment = moment;
            $scope.filter = {};
            $scope.chart = {
                type: 'mscolumn2d',
                height: '400px',
                dataSource: {
                    categories: [{category: []}],
                    dataset:[]
                }
            };

            $scope.data = [];
            $scope.rekap = {};
            $scope.ref = {
                unit: {}
            };
            $scope.init = function(){
                $scope.filter.where = "unitid is not null";
                    $scope.rekap = angular.copy({});
                    angular.forEach($scope.data, function(item){
                        var tahun = item.tahunperjanjian;
                        if (!$scope.rekap[tahun]) $scope.rekap[tahun] = {
                            label: tahun,
                            value: {unit: {}},
                            jumlah: 0
                        };
                        $scope.rekap[tahun]['jumlah']++;

                        // bidang
                        if (!$scope.rekap[tahun]['value']['unit'][item.jenislayanan])
                            $scope.rekap[tahun]['value']['unit'][item.jenislayanan] = {
                                label: item.jenislayanan,
                                jumlah: 0
                            };
                        $scope.rekap[tahun]['value']['unit'][item.jenislayanan]['jumlah']++;
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

                        angular.forEach(item.value.unit, function(item2, status){
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