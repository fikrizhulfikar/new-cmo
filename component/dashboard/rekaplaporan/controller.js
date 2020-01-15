define([
    'asset/lib/moment/min/moment-with-locales.min',
    'asset/js/accounting.min',
    'component/iconplus/dashboard/statusdashboard',
    'component/iconplus/dashboard/vdashboardrekap',
    'component/iconplus/master/rekaplaporan'
], function(moment){
    moment.locale('id');
    return ['$scope', '$routeParams', '$log', '$auth','Dashboard_Status','Iconplus_Rekap_Laporan','VDashboard_Rekap',
        function($scope, $routeParams, $log, $auth, Dashboard_Status, Iconplus_Rekap_Laporan,VDashboard_Rekap){
            $scope.moment = moment;
            $scope.accounting = accounting;
            $scope.filter = {};
            $scope.chart = {
                type: 'msbar2d',
                height: '600',
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
            $scope.modal = {
                header: 'Rekap Monitoring Efisiensi Penurunan BPP',
                data : {}
            };

            //contoh detail saat klik dashboard
            //1. fungsi harus ditempel di dashboard
            //karena menempel di objek window (alias browser), satu aplikasi cubicle tidak boleh ada nama fungsi yang sama
            window.dashboardRegional = function(tahun, nama_wilayah){
                Iconplus_Rekap_Laporan.table({nama_wilayah : "= '" + nama_wilayah + "'", thbllap: "= '" + $scope.cari.datatahun + "'"}).then(function(response){
                    $scope.modal.data = response.data.list;

                    $scope.total_target = 0;
                    $scope.total_realisasi = 0;
                    for(var i = 0; i < $scope.modal.data.length; i++){
                        var databpp = $scope.modal.data[i];
                        $scope.total_target = parseFloat($scope.total_target)  + parseFloat(databpp.target) ;
                        $scope.total_realisasi = parseFloat($scope.total_realisasi) +  parseFloat(databpp.penghematan_sd);
                    }
                });
                $scope.modal.tahun = $scope.cari.datatahun;
                $scope.modal.bidang = nama_wilayah;
                $scope.modal.open();

                $scope.$apply(); //2. karena window ini di luar ruang lingkup angularjs, jadi harus panggil $scope.$apply() di dalam fungsi yang menempel pada objek window
            };
            $scope.cari = {
                tahun: moment().format(),
            };
            var datatahun = moment().format('YYYYMM');
            // $scope.cari.datatahun = moment($scope.cari.tahun).format('YYYYMM');
            //$scope.cari.datatahun = '201812';
            $scope.init = function(){
                $scope.filter.where = "indiaktor is not null";
                    $scope.rekap = angular.copy({});
                    angular.forEach($scope.data, function(item){
                        var tahun = item.indikator;
                        if (!$scope.rekap[tahun]) $scope.rekap[tahun] = {
                            label: tahun,
                            value: {bidang: {}},
                            jumlah: item.jumlah
                        };
                        $scope.rekap[tahun]['jumlah']++;

                        // bidang
                        if (!$scope.rekap[tahun]['value']['bidang'][item.keterangan])
                            $scope.rekap[tahun]['value']['bidang'][item.keterangan] = {
                                // label: $scope.ref.bidang[item.id_status].keterangan,
                                label: item.keterangan,
                                jumlah: item.jumlah
                            };
                        $scope.rekap[tahun]['value']['bidang'][item.keterangan]['jumlah']++;
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
                            // dataset[ref_series[status]].data[ref_data[yyyymm]] = {value: item2.jumlah};
                            dataset[ref_series[status]].data[ref_data[yyyymm]] = {
                                value: item2.jumlah,
                                link: "Javascript: dashboardRegional('" + item2.label + "','" + item.label + "')"
                                //3. cara memanggil fungsi dari datanya seperti ini, bisa diawali 'window.' ataupun tidak,
                                //karena fungsi dipanggil dalam bentuk string, variabel string yang dikirim pastikan diapit kutip agar menandakan string, kalau tidak ada dia akan error
                                //kalau angka tidak perlu
                            };
                        });
                    });
                    $scope.chart.dataSource.categories = [{category: category}];
                    $scope.chart.dataSource.dataset = dataset;
                    $scope.chart.reload();
                }else{
                    $scope.init();
                }
            };

            $scope.$watch("data", function(val){
                if(val.length) $scope.reload();
            });
        }];
});