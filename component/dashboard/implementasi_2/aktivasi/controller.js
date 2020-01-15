define([
    'asset/lib/moment/min/moment-with-locales.min',
    'component/activiti/process',
    'component/pusharlis/master/status',
    'component/pusharlis/master/kategori',
    'component/pusharlis/master/kelompokbidang'
], function(moment){
    moment.locale('id');

    return ['$scope', '$routeParams', '$log', '$auth', 'Activiti_Process', 'Pusharlis_Master_Status', 'Pusharlis_Master_Kategori','Pusharlis_Master_Kelompok_Bidang', function($scope, $routeParams, $log, $auth, Activiti_Process, Pusharlis_Master_Status, Pusharlis_Master_Kategori, Pusharlis_Master_Kelompok_Bidang){
        $scope.moment = moment;
        $scope.filter = {
            tahun : "0000"
        };
        $scope.chart = {
            type: 'mscolumn2d',
            height: '400px',
            dataSource: {
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


            Pusharlis_Master_Kelompok_Bidang.list().then(function(response){
                angular.forEach(response.data, function(val, key){
                    $scope.ref.kategori[val.id_bidang] = val;
                });
            });


            $scope.filter = $scope.filter.tahun == "0000" ?
                angular.copy({}) :
                angular.copy({
                    tglawalprapenugasan : $scope.filter.tahun + '0101',
                    tglakhirprapenugasan : $scope.filter.tahun + '1231'
                });
            Activiti_Process.list($scope.filter).then(function(response2){
                $scope.rekap = {};
                angular.forEach(response2.data, function(item){
                    var bulantahun = moment(item.processVariable.usrPermohonan_tglsurat, 'YYYYMMDD').format('YYYY');
                    if (!$scope.rekap[bulantahun]) $scope.rekap[bulantahun] = {
                        label: moment(item.processVariable.usrPermohonan_tglsurat, 'YYYYMMDD').format('YYYY'),
                        value: {kategori: {}, status: {
                            'PRAPENUGASAN': {label: 'PRAPENUGASAN', jumlah: 0},
                            'PENUGASAN': {label: 'PENUGASAN', jumlah: 0},
                            'SELESAI': {label: 'SELESAI', jumlah: 0},
                            'BATAL': {label: 'BATAL', jumlah: 0}
                        }},
                        jumlah: 0
                    };
                    $scope.rekap[bulantahun]['jumlah']++;

                    // Kategori
                    if (!$scope.rekap[bulantahun]['value']['kategori'][item.processVariable.usrPermohonan_id_bidang])
                        $scope.rekap[bulantahun]['value']['kategori'][item.processVariable.usrPermohonan_id_bidang] = {
                            label: $scope.ref.kategori[item.processVariable.usrPermohonan_id_bidang].nama_bidang,
                            jumlah: 0
                        };
                    $scope.rekap[bulantahun]['value']['kategori'][item.processVariable.usrPermohonan_id_bidang]['jumlah']++;

                    // Status
                    if (!$scope.ref_status[item.processVariable.process_status] && !$scope.rekap[bulantahun]['value']['status'][$scope.ref_status[item.processVariable.process_status]])
                        $scope.rekap[bulantahun]['value']['status'][$scope.ref_status[item.processVariable.process_status]] = {
                            label: item.processVariable.process_status,
                            jumlah: 0
                        };
                    $scope.rekap[bulantahun]['value']['status'][$scope.ref_status[item.processVariable.process_status]]['jumlah'] += 1;
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

                angular.forEach($scope.rekap, function(item, yyyy){
                    category.push({
                        label: item.label
                    });
                    ref_data[yyyy] = category.length-1;

                    angular.forEach(item.value.kategori, function(item2, status){
                        if(typeof ref_series[status] === 'undefined'){
                            dataset.push({
                                seriesname: item2.label,
                                data: []
                            });
                            ref_series[status] = dataset.length-1;
                        }
                        dataset[ref_series[status]].data[ref_data[yyyy]] = {value: item2.jumlah};
                    });
                });

                $scope.chart.dataSource.categories = [{category: category}];
                $scope.chart.dataSource.dataset = dataset;
                // $scope.chart.reload();  ditutup error di console
            }else{
                $scope.data();
            }
        };

        $scope.reload();
    }];
});