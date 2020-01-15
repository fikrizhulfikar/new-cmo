requirejs.s.contexts._.config.shim['asset/js/tableHeadFixer'] = {
    deps: ['asset/lib/jquery/jquery.min']
};

requirejs.s.contexts._.config.shim['asset/lib/bootstrap/dist/js/bootstrap.min'] = {
    deps: ['asset/lib/jquery/jquery.min']
};

requirejs.s.contexts._.config.shim['asset/js/fusioncharts-suite-xt/js/fusioncharts-charts.min'] = {
    deps: ['asset/js/fusioncharts-suite-xt/js/fusioncharts.min']
};

requirejs.s.contexts._.config.shim['asset/js/fusioncharts-suite-xt/js/themes/fusioncharts.theme.fint'] = {
    deps: ['asset/js/fusioncharts-suite-xt/js/fusioncharts.min']
};

define([
    'asset/lib/moment/min/moment-with-locales.min',
    'asset/js/accounting.min',
    'asset/lib/jquery/jquery.min',
    'asset/lib/bootstrap/dist/js/bootstrap.min',
    'asset/js/tableHeadFixer',
    'asset/js/fusioncharts-suite-xt/js/fusioncharts.min',
    'asset/js/fusioncharts-suite-xt/js/fusioncharts-charts.min',
    'asset/js/fusioncharts-suite-xt/js/themes/fusioncharts.theme.fint',
    'component/alt/button/service',
    'component/activiti/task',
    'component/system/user/userrole',
    'component/pusharlis/master/rencanapekerjaanuwp',
    'component/pusharlis/master/realisasipekerjaan',
    'component/pusharlis/master/unit',
    'component/pusharlis/master/customer',
    'component/pusharlis/master/perjanjian',
    'component/pusharlis/master/kategori',
    'component/pusharlis/master/status',
    'component/pusharlis/master/pegawai',
    'component/pusharlis/master/kelompokbidang',
    'component/pusharlis/master/proyek'
], function(moment,accounting){
    return ['$scope', '$auth', '$q', '$routeParams', '$log', '$button', 'Pusharlis_Master_Unit', 'Pusharlis_Master_Kategori', 'Pusharlis_Master_Customer', 'Activiti_Task', 'Pusharlis_Master_Status', 'Pusharlis_Master_Pegawai', 'Pusharlis_Master_Kelompok_Bidang', 'Pusharlis_Master_Proyek',
        function($scope, $auth, $q, $routeParams, $log, $button, Pusharlis_Master_Unit, Pusharlis_Master_Kategori, Pusharlis_Master_Customer, Activiti_Task, Pusharlis_Master_Status,Pusharlis_Master_Pegawai,Pusharlis_Master_Kelompok_Bidang,Pusharlis_Master_Proyek){
            moment.locale('id');
            $scope.moment = moment;
            $scope.accounting = accounting;
            $scope.unitid = $auth.userdata.unitid;

            $(document).ready(function(){
                $('#myTab a').click(function (e) {
                    e.preventDefault();
                    $(this).tab('show');
                })
            });

            // toolbar
            $scope.toolbar = {
                title: 'Monitoring Project',
                description: 'Daftar Prapenugasan'
            };

            // breadcrumb
            $scope.breadcrumb = {
                data: [{
                    title: 'Monitoring Prapenugasan',
                    url: alt.baseUrl + 'laporan/prapenugasan/list',
                    isactive: true
                }]
            };

            //filter
            $scope.filter = {};
            $scope.reportType = '';
            $scope.showReport = false;
            $scope.btndetail = $button('', {
                title: 'Detail',
                description: 'Detail',
                class: 'btn btn-info',
                onclick: function(){
                    $scope.reportType = 'detail';
                    $scope.isAllowGetData = true;
                    $scope.setFilter();
                    $scope.table.reload();
                }
            });
            $scope.btnrekap = $button('', {
                title: 'Rekap',
                description: 'Rekap',
                class: 'btn btn-primary',
                onclick: function(){
                    $scope.reportType = 'rekap';
                    $scope.isAllowGetData = true;
                    $scope.setFilter();
                    $scope.table.reload();
                }
            });
            $scope.btnreset = $button('', {
                title: 'Reset',
                description: 'Reset',
                class: 'btn btn-info',
                onclick: function(){
                    $scope.test='';
                    $scope.test1='';
                    $scope.getnoproyek = {selected : undefined};
                    $scope.getunit = {selected : undefined};
                    $scope.filter_chargecode='';
                    $scope.filter_status='';
                    $scope.filter_bidang='';

                }
            });

            $scope.setFilter = function(){
                $scope.table.filter = {};
                if($scope.test1) $scope.table.filter.unitasalid = $scope.test1;
                if($scope.test) $scope.table.filter.id_ptl = $scope.test;
                if($scope.filter_bidang) $scope.table.filter.id_bidang = $scope.filter_bidang;
                if($scope.filter_status) $scope.table.filter.status = $scope.filter_status;
                if($scope.filter_chargecode) $scope.table.filter.chargecode = $scope.filter_chargecode;
                if($scope.filter.bulanawal) $scope.table.filter.tglawalprapenugasan = moment($scope.filter.bulanawal).format('YYYYMM') + '01';
                if($scope.filter.bulanakhir) $scope.table.filter.tglakhirprapenugasan = moment($scope.filter.bulanakhir).format('YYYYMM') + '31';
            };

            $scope.ref_status = {};
            Pusharlis_Master_Status.list().then(function(response){
                angular.forEach(response.data, function (status) {
                    $scope.ref_status[status['name']] = status['group'];
                })
            });

            // table
            $scope.isAllowGetData = false;
            $scope.rekap = {};
            $scope.rekapjumlah = {kategori: 0, status: 0};
            $scope.table = {
                total_data: [],
                filter: {

                },
                reload: function(){
                    if ($scope.isAllowGetData) {
                        // set parameter untuk dikirim
                        var param = angular.copy($scope.table.filter);
                        param.limit = $scope.table.limit;
                        param.offset = $scope.table.offset;

                        // cek apakah sedang mengambil data, batalkan jika ada
                        if ($scope.table.isloading != null && $scope.table.isloading.abort)
                            $scope.table.isloading.abort();

                        // kirim data ke server
                        $scope.table.isloading =    Activiti_Task.table(param);
                        $scope.table.isloading.then(function (response) {
                            $scope.table.total = response.data.total;
                            $scope.table.data = response.data.list;

                            if ($scope.reportType == 'detail') {
                                $scope.showReport = true;
                            }else{
                                var param = angular.copy($scope.table.filter);
                                param.limit = response.data.total;
                                param.offset = $scope.table.offset;

                                // cek apakah sedang mengambil data, batalkan jika ada
                                if ($scope.table.isloading != null && $scope.table.isloading.abort)
                                    $scope.table.isloading.abort();

                                // kirim data ke server
                                $scope.table.isloading = Activiti_Task.list(param);
                                $scope.table.isloading.then(function (response2) {
                                    $scope.rekap = {};
                                    $scope.totalrekap = response2.data.length;
                                    angular.forEach(response2.data, function(item){
                                        var bulantahun = moment(item.processVariable.usrPermohonan_tglsurat, 'YYYYMMDD').format('YYYYMM');
                                        if (!$scope.rekap[bulantahun]) $scope.rekap[bulantahun] = {
                                            label: moment(item.processVariable.usrPermohonan_tglsurat, 'YYYYMMDD').format('MMM-YY'),
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
                                        if (!$scope.rekap[bulantahun]['value']['kategori'][item.processVariable.usrPermohonan_categoryid])
                                            $scope.rekap[bulantahun]['value']['kategori'][item.processVariable.usrPermohonan_categoryid] = {
                                                label: $scope.ref.kategori[item.processVariable.usrPermohonan_categoryid].name,
                                                jumlah: 0
                                            };
                                        $scope.rekap[bulantahun]['value']['kategori'][item.processVariable.usrPermohonan_categoryid]['jumlah']++;

                                        // Status
                                        if (!$scope.ref_status[item.processVariable.process_status] && !$scope.rekap[bulantahun]['value']['status'][$scope.ref_status[item.processVariable.process_status]])
                                            $scope.rekap[bulantahun]['value']['status'][$scope.ref_status[item.processVariable.process_status]] = {
                                                label: item.processVariable.process_status,
                                                jumlah: 0
                                            };
                                        /*if (!$scope.rekap[bulantahun]['value']['status'][$scope.ref_status[item.processVariable.process_status]])
                                            $scope.rekap[bulantahun]['value']['status'][$scope.ref_status[item.processVariable.process_status]] = {
                                                label: $scope.ref_status[item.processVariable.process_status],
                                                jumlah: 0
                                            };*/
                                        $scope.rekap[bulantahun]['value']['status'][$scope.ref_status[item.processVariable.process_status]]['jumlah'] += 1;
                                    });
                                    $scope.showReport = true;
                                    $scope.chart1.reload($scope.rekap);
                                    $scope.chart2.reload($scope.rekap);
                                });
                            }
                        });
                    }
                }
            };

            $scope.lastRenderPeriod = {
                kategori: '',
                status: ''
            };
            $scope.getLastRenderPeriod = function (type, label) {
                var lastRender = angular.copy($scope.lastRenderPeriod[type]);
                $scope.lastRenderPeriod[type] = label;
                return lastRender;
            };
            
            $scope.getObjectLength = function (obj) {
                return Object.keys(obj).length;
            };

            $scope.rowCreated = function(){
                $("#fixTable").tableHeadFixer({"head" : false, "left" : 2});
                $('table thead tr th').css('background-color', '#eee');
            };
            $scope.rowCreated();

            $scope.buttons = function(index, item){
                return [
                    $button('view', {
                        title: '',
                        description: 'Monitor',
                        href: alt.baseUrl + 'monitoring/detail?id=' + item.id + '&processInstanceId=' + item.processInstanceId + '&definitionKey=' + item.definitionKey,
                        class: 'btn btn-sm btn-primary'
                    })
                ];
            };

            // referensi
            $scope.ref = {
                unit: {},
                kategori: {},
                perjanjian: {},
                customer : {},
                pegawai : {},
                bidang : {},
                sts : {},
                proyek : {}
            };

            // referensi unit
            Pusharlis_Master_Unit.list().then(function(response){
                angular.forEach(response.data, function(val, key){
                    $scope.ref.unit[val.unitid] = val;
                });
            });

            // referensi kategori
            Pusharlis_Master_Kategori.list().then(function(response){
                angular.forEach(response.data, function(val, key){
                    $scope.ref.kategori[val.categoryid] = val;
                });
            });

            $scope.combobox1 = [];
            Pusharlis_Master_Customer.list().then(function(response){
                $scope.combobox1 = response.data;
                angular.forEach(response.data, function(val, key){
                    $scope.ref.customer[val.customerid] = val;
                });
            });

            /*$scope.combobox = [];
            Pusharlis_Master_Pegawai.list().then(function(response){
                $scope.combobox = response.data;
                angular.forEach(response.data, function(val, key){
                    $scope.ref.pegawai[val.id_pegawai] = val;
                });
            });*/

            Pusharlis_Master_Kelompok_Bidang.list().then(function(response){
                angular.forEach(response.data, function(val, key){
                    $scope.ref.bidang[val.id_bidang] = val;
                });
            });

            Pusharlis_Master_Status.list().then(function(response){
                angular.forEach(response.data, function (val, key) {
                    $scope.ref.sts[val.name] = val;
                })
            });


            Pusharlis_Master_Proyek.list().then(function(response){
                angular.forEach(response.data, function(val, key){
                    $scope.ref.proyek[val.chargecodeid] = val;
                });
            });


            $scope.pilih_nomor_proyek = function(val){
                $scope.test = $scope.ref.pegawai[val].id_pegawai;

            };

            $scope.pilih_unit = function(val){
                $scope.test1 = $scope.ref.customer[val].customerid;

            };


            $scope.getnoproyek = {selected : undefined};
            $scope.getunit = {selected : undefined};
            // chart
            $scope.chart1 = {};
            $scope.chart2 = {};
        }];
});