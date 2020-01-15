define([
    'asset/lib/moment/min/moment-with-locales.min',
    'component/pusharlis/master/kelompokbidang'
], function(moment){
    moment.locale('id');
    return ['$scope', '$routeParams', '$log', '$auth','Pusharlis_Master_Kelompok_Bidang',
        function($scope, $routeParams, $log, $auth, Pusharlis_Master_Kelompok_Bidang){
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
                bidang: {}
            };
            $scope.init = function(){
                $scope.filter.where = "id_bidang is not null";
                Pusharlis_Master_Kelompok_Bidang.list().then(function(response){
                    angular.forEach(response.data, function(val, key){
                        $scope.ref.bidang[val.id_bidang] = val;
                    });
                    $scope.rekap = angular.copy({});
                    angular.forEach($scope.data, function(item){
                        var tahun = item.tahunperjanjian;
                        if (!$scope.rekap[tahun]) $scope.rekap[tahun] = {
                            label: tahun,
                            value: {bidang: {}},
                            jumlah: 0
                        };
                        $scope.rekap[tahun]['jumlah']++;

                        // bidang
                        if (!$scope.rekap[tahun]['value']['bidang'][item.id_bidang])
                            $scope.rekap[tahun]['value']['bidang'][item.id_bidang] = {
                                label: $scope.ref.bidang[item.id_bidang].nama_bidang,
                                jumlah: 0
                            };
                        $scope.rekap[tahun]['value']['bidang'][item.id_bidang]['jumlah']++;
                    });
                    $scope.reload(angular.copy($scope.rekap));
                });
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