define([
    'asset/lib/moment/min/moment-with-locales.min',
    'asset/js/accounting.min',
    'component/activiti/process',
    'component/pusharlis/master/status',
    'component/pusharlis/master/kategori'
], function(moment, accounting){
    moment.locale('id');

    return ['$scope', '$routeParams', '$log', '$auth', 'Activiti_Process', 'Pusharlis_Master_Status', 'Pusharlis_Master_Kategori', function($scope, $routeParams, $log, $auth, Activiti_Process, Pusharlis_Master_Status, Pusharlis_Master_Kategori){
        $scope.moment = moment;
        $scope.accounting = accounting;
        $scope.filter = {
            tahun : "0000"
        };
        $scope.chart = {
            type: 'mscolumn2d',
            height: '400px',
            dataSource: {
                chart: {
                    numberScaleValue: "1000, 1000, 1000, 1000",
                    numberScaleUnit: "Rb, Jt, M, T"
                },
                categories: [{category: []}],
                dataset:[]
            }
        };

        // data rekap
        $scope.rekap = {};

        // referensi
        $scope.ref = {
            unit: {},
            kategori: {},
            customer : {}
        };

        // ambil data dari server
        $scope.data = function(){
            $scope.ref_status = {};
            Pusharlis_Master_Status.list().then(function(response){
                angular.forEach(response.data, function (status) {
                    $scope.ref_status[status['name']] = status['group'];
                })
            });

            $scope.ref.kategori = {};
            Pusharlis_Master_Kategori.list().then(function(response){
                angular.forEach(response.data, function(val, key){
                    $scope.ref.kategori[val.categoryid] = val;
                });
            });

            $scope.filter = $scope.filter.tahun == "0000" ?
                angular.copy({}) :
                angular.copy({
                    tglawalpenugasan : $scope.filter.tahun + '0101',
                    tglakhirpenugasan : $scope.filter.tahun + '1231'
                });
            Activiti_Process.list($scope.filter).then(function(response2){
                $scope.rekap = {};
                angular.forEach(response2.data, function(item){
                    if(item.processVariable.usrPilihKesepakatan_tglsuratpenugasan){
                        var bulantahun = moment(item.processVariable.usrPilihKesepakatan_tglsuratpenugasan, 'YYYYMMDD').format('YYYYMM');
                        if (!$scope.rekap[bulantahun]) $scope.rekap[bulantahun] = {
                            label: moment(item.processVariable.usrPilihKesepakatan_tglsuratpenugasan, 'YYYYMMDD').format('MMM-YY'),
                            value: {kategori: {}},
                            jumlah: 0
                        };
                        $scope.rekap[bulantahun]['jumlah']++;

                        // Kategori
                        if (!$scope.rekap[bulantahun]['value']['kategori'][item.processVariable.usrPermohonan_categoryid])
                            $scope.rekap[bulantahun]['value']['kategori'][item.processVariable.usrPermohonan_categoryid] = {
                                label: $scope.ref.kategori[item.processVariable.usrPermohonan_categoryid].name,
                                jumlah: 0,
                                nilaipenugasan : 0
                            };
                        $scope.totalnilaipenugasan += accounting.unformat(item.processVariable.usrPilihKesepakatan_nilaipenugasan,",");
                        $scope.rekap[bulantahun]['value']['kategori'][item.processVariable.usrPermohonan_categoryid]['nilaipenugasan'] += accounting.unformat(item.processVariable.usrPilihKesepakatan_nilaipenugasan,",");
                        $scope.rekap[bulantahun]['value']['kategori'][item.processVariable.usrPermohonan_categoryid]['jumlah']++;
                    }
                });
                $scope.showReport = true;

                $scope.reload($scope.rekap);
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

                    angular.forEach(item.value.kategori, function(item2, status){
                        if(typeof ref_series[status] === 'undefined'){
                            dataset.push({
                                seriesname: item2.label,
                                data: []
                            });
                            ref_series[status] = dataset.length-1;
                        }
                        dataset[ref_series[status]].data[ref_data[yyyymm]] = {value: item2.nilaipenugasan};
                    });
                });

                $scope.chart.dataSource.categories = [{category: category}];
                $scope.chart.dataSource.dataset = dataset;
                $scope.chart.reload();
            }else{
                $scope.data();
            }
        };

        $scope.reload();
    }];
});