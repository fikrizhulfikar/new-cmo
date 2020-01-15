define([
    'asset/lib/moment/min/moment-with-locales.min',
    'component/pusharlis/master/actprocess',
    'component/pusharlis/master/grouppemberikerja'
], function(moment){
    moment.locale('id');
    return ['$scope', '$routeParams', '$log', '$auth', "Pusharlis_Master_Act_Process", "Pusharlis_Master_Group_Pemberikerja",
        function($scope, $routeParams, $log, $auth, Pusharlis_Master_Act_Process, Pusharlis_Master_Group_Pemberikerja){
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

            $scope.rekap = {};
            $scope.ref = {
                unit: {}
            };

            $scope.data = function(){
                $scope.filter.where = "unitasalid is not null";
                Pusharlis_Master_Group_Pemberikerja.list().then(function(response){
                    angular.forEach(response.data, function(val, key){
                        $scope.ref.unit[val.id_group] = val;
                    });
                    Pusharlis_Master_Act_Process.list($scope.filter).then(function(response){
                        $scope.rekap = {};
                        angular.forEach(response.data, function(item){
                            var tahun = item.tahunperjanjian;
                            if (!$scope.rekap[tahun]) $scope.rekap[tahun] = {
                                label: tahun,
                                value: {unit: {}, status: {
                                    'PRAPENUGASAN': {label: 'PRAPENUGASAN', jumlah: 0},
                                    'PENUGASAN': {label: 'PENUGASAN', jumlah: 0},
                                    'SELESAI': {label: 'SELESAI', jumlah: 0},
                                    'BATAL': {label: 'BATAL', jumlah: 0}
                                }},
                                jumlah: 0
                            };
                            $scope.rekap[tahun]['jumlah']++;

                            // unit
                            if (!$scope.rekap[tahun]['value']['unit'][item.unitasalid])
                                $scope.rekap[tahun]['value']['unit'][item.unitasalid] = {
                                    label: item.unitasalnama || $scope.ref.unit[item.unitasalid].group_pemberikerja || "-",
                                    jumlah: 0
                                };
                            $scope.rekap[tahun]['value']['unit'][item.unitasalid]['jumlah']++;
                        });
                        $scope.reload($scope.rekap);
                    });
                });
            };

            $scope.reload = function(rekap){
                if(rekap) {
                    $scope.rekap = angular.copy(rekap);

                    $scope.chart.dataSource.categories = [{category: []}];
                    $scope.chart.dataSource.dataset = [];

                    var category = [],
                        dataset = [],
                        ref_series = {},
                        ref_data = {};

                    angular.forEach($scope.rekap, function(item, yyyymm){
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
                    $scope.data();
                }
            };

            $scope.reload();
        }];
});