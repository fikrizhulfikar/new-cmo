define([
    'asset/lib/moment/min/moment-with-locales.min',
    'asset/js/accounting.min',
    'component/iconplus/dashboard/statusdashboard',
    'component/iconplus/master/rekaplaporan',
    'component/iconplus/master/rekon',
], function(moment){
    moment.locale('id');
    return ['$scope', '$routeParams', '$log', '$auth','$export', '$button','Dashboard_Status','Iconplus_Rekap_Laporan','Iconplus_Master_Rekon',
        function($scope, $routeParams, $log, $auth, $export, $button, Dashboard_Status, Iconplus_Rekap_Laporan,Iconplus_Master_Rekon){
            $scope.moment = moment;
            $scope.accounting = accounting;
            $scope.filter = {};
            $scope.chart = {
                type: 'mscolumn3d',
                height: '580px',
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
                header: 'Detail Data Hasil Rekonsiliasi',
                data : {}
            };

            // contoh detail saat klik dashboard
            // 1. fungsi harus ditempel di dashboard
            // karena menempel di objek window (alias browser), satu aplikasi cubicle tidak boleh ada nama fungsi yang sama
            window.dashboardRegional = function(jenis_layanan){
                if ($auth.userdata.usergroupid == 2) {
                    Iconplus_Master_Rekon.table({
                        where:"jenis_layanan = '"+jenis_layanan+"' and unit_id = '"+$auth.userdata.unitid+"'",
                        order: "nama_unit, nomor_sid"}).then(function(response){
                        // Iconplus_Rekap_Laporan.table({nama_wilayah : "= '" + nama_wilayah + "'", thbllap: "= '" + $scope.cari.datatahun + "'"}).then(function(response){
                        $scope.modal.data = response.data.list;

                        $scope.total_biaya = 0;
                        for(var i = 0; i < $scope.modal.data.length; i++){
                            var databpp = $scope.modal.data[i];
                            $scope.total_biaya = parseFloat($scope.total_biaya)  + parseFloat(databpp.total) ;
                        }
                    });
                } else {
                    Iconplus_Master_Rekon.table({
                        where:"jenis_layanan = '"+jenis_layanan+"'",
                        order: "nama_unit, nomor_sid"}).then(function(response){
                    // Iconplus_Rekap_Laporan.table({nama_wilayah : "= '" + nama_wilayah + "'", thbllap: "= '" + $scope.cari.datatahun + "'"}).then(function(response){
                        $scope.modal.data = response.data.list;

                        $scope.total_biaya = 0;
                        for(var i = 0; i < $scope.modal.data.length; i++){
                            var databpp = $scope.modal.data[i];
                            $scope.total_biaya = parseFloat($scope.total_biaya)  + parseFloat(databpp.total) ;
                        }
                    });
                }
                $scope.modal.jenis_layanan = jenis_layanan;
                $scope.modal.open();

                $scope.$apply(); //2. karena window ini di luar ruang lingkup angularjs, jadi harus panggil $scope.$apply() di dalam fungsi yang menempel pada objek window
            };
            $scope.cari = {
                tahun: moment().format(),
            };

            $scope.btnprint = $button('', {
                title: 'Export Excel',
                icon: 'fa fa-file-excel-o',
                class: 'btn btn-success',
                onclick: function () {
                    $export.excel(document.getElementById("datarekon").innerHTML, "Data Rekon");
                }
            });

            var datatahun = moment().format('YYYYMM');
            // $scope.cari.datatahun = moment($scope.cari.tahun).format('YYYYMM');
            $scope.cari.datatahun = '201812';
            $scope.init = function(){
                $scope.filter.where = "nama_wilayah is not null";
                    $scope.rekap = angular.copy({});
                    angular.forEach($scope.data, function(item){
                        $scope.cari.thblmin = item.thblmin;
                        $scope.cari.thblmax = item.thblmax;
                        var tahun = item.nama_wilayah;
                        if (!$scope.rekap[tahun]) $scope.rekap[tahun] = {
                            label: tahun,
                            value: {bidang: {}},
                            jumlah: item.total
                        };
                        $scope.rekap[tahun]['jumlah']++;

                        // bidang
                        if (!$scope.rekap[tahun]['value']['bidang'][item.jenis_layanan])
                            $scope.rekap[tahun]['value']['bidang'][item.jenis_layanan] = {
                                // label: $scope.ref.bidang[item.id_status].keterangan,
                                label: item.jenis_layanan,
                                jumlah: item.total
                            };
                        $scope.rekap[tahun]['value']['bidang'][item.jenis_layanan]['jumlah']++;
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
                                link: "Javascript: dashboardRegional('" + item2.label + "')"
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