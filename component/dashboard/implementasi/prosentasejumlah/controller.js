define([
    'component/activiti/process',
    'component/pusharlis/master/unit',
    'component/pusharlis/master/viewlaporanpenugasanunit'
], function(){
    return ['$scope', '$routeParams', '$log', '$auth', 'Activiti_Process', 'Pusharlis_Master_Unit', 'Pusharlis_Master_ViewPenugasanunit',
        function($scope, $routeParams, $log, $auth, Activiti_Process, Pusharlis_Master_Unit, Pusharlis_Master_ViewPenugasanunit){
        $scope.filter = {
            tahun : '0000'
        };
        $scope.chart = {
            type: 'pie2d',
            height: '400px',
            dataSource: {
                data:[]
            }
        };

        // data rekap
        $scope.rekap = {};

        // referensi unit
        $scope.ref = {unit: {}};

        // ambil data dari server
        $scope.data = function(){
            $scope.initrekap = {};
            Pusharlis_Master_Unit.list().then(function(response){
                angular.forEach(response.data, function(val, key){
                    $scope.ref.unit[val.unitid] = val;
                    $scope.initrekap[val.unitid] = {
                        nilai : 0,
                        jumlah : 0
                    };
                });
            });

            var tahun = {
                awal : $scope.filter.tahun == '0000' ? '0000' : $scope.filter.tahun,
                akhir : $scope.filter.tahun == '0000' ? '9999' : $scope.filter.tahun
            };

            var sql = '';
            sql += 'tglawal >= ' + (tahun.awal + '0101');
            sql += ' and tglawal <= ' + (tahun.akhir + '1231');

            Pusharlis_Master_ViewPenugasanunit.list({where: sql}).then(function (response) {
                $scope.rekap = angular.copy($scope.initrekap);
                $scope.totalpenugasan = $scope.totalnilaipenugasan = 0;

                angular.forEach(response.data, function(row,index){
                    $scope.rekap[row.unitid].nilai += parseInt(row.nilai);
                    $scope.totalnilaipenugasan += parseInt(row.nilai);
                    $scope.totalpenugasan++; $scope.rekap[row.unitid].jumlah++;
                });
                angular.forEach($scope.rekap, function(item,unitid){
                    item.persenjumlah = $scope.totalpenugasan > 0 ? item.jumlah/$scope.totalpenugasan*100 : 0;
                    item.persennilai = $scope.totalnilaipenugasan > 0 ? item.nilai/$scope.totalnilaipenugasan*100 : 0;
                });
                $scope.reload($scope.rekap);
            });

            /*Activiti_Process.list($scope.filter).then(function(response){
                $scope.rekap = angular.copy($scope.initrekap);
                $scope.totalpenugasan = $scope.totalnilaipenugasan = 0;

                angular.forEach(response.data, function(item){
                    if(item.processVariable.pngsnPerencanaanProduksi_pelaksana /!*&& item.processVariable.pngsnPerencanaanProduksi_pelaksana.length > 0*!/){
                        var pelaksana = typeof item.processVariable.pngsnPerencanaanProduksi_pelaksana == 'string' ? item.processVariable.pngsnPerencanaanProduksi_pelaksana.split(",") : item.processVariable.pngsnPerencanaanProduksi_pelaksana;
                        angular.forEach(pelaksana, function(unitid,index){
                            if(unitid){
                                $scope.rekap[unitid].nilai += parseInt(item.processVariable['pngsnPerencanaanProduksi_' + unitid + '_nilai']);
                                $scope.totalnilaipenugasan += parseInt(item.processVariable['pngsnPerencanaanProduksi_' + unitid + '_nilai']);
                                $scope.totalpenugasan++; $scope.rekap[unitid].jumlah++;
                            }
                        })
                    }
                });
                angular.forEach($scope.rekap, function(item,unitid){
                    item.persenjumlah = item.jumlah/$scope.totalpenugasan*100;
                    item.persennilai = item.nilai/$scope.totalnilaipenugasan*100;
                });

                $scope.reload($scope.rekap);
            });*/
        };

        $scope.reload = function(rekap){
            if(rekap) {
                $scope.rekap = angular.copy(rekap);

                $scope.chart.dataSource.data = [];
                angular.forEach($scope.rekap, function(item,unitid) {
                    $scope.chart.dataSource.data.push({
                        label: $scope.ref.unit[unitid].sname,
                        value: item.persenjumlah
                    });
                });
                $scope.chart.reload();
            }else{
                $scope.data();
            }
        };

        $scope.reload();
    }];
});