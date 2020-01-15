requirejs.s.contexts._.config.shim['asset/js/tableHeadFixer'] = {
    deps: ['asset/lib/jquery/jquery.min']
};
define([
    'asset/lib/moment/min/moment-with-locales.min',
    'asset/js/accounting.min',
    'asset/js/tableHeadFixer',
    'component/alt/button/service',
    'component/iconplus/master/wilayah',
    'component/iconplus/master/jenispembangkit',
    'component/iconplus/master/namapembangkit',
    'component/iconplus/dashboard/dashrekap',
    'component/iconplus/dashboard/vdashboardrekap',
    'component/iconplus/viewtarget/sfc',
    'component/iconplus/master/rekaplaporan',
    'component/iconplus/master/rekaplaporanheader',
    'component/iconplus/mastertarget/sfc'
], function(moment){
    return ['$scope', '$routeParams', "$export", '$log', '$alert', '$button',  '$window', '$auth', '$popup', 'Iconplus_Master_Wilayah',
        'Master_Jenis_Pembangkit','Master_Nama_Pembangkit','Iconplus_View_Sfc', 'Iconplus_Master_Sfc','Dashboard_Rekap',
        'Iconplus_Rekap_Laporan','VDashboard_Rekap','Iconplus_Rekap_Laporan_Header',
        function ($scope, $routeParams, $export, $log, $alert, $button,  $window, $auth, $popup, Iconplus_Master_Wilayah,Master_Jenis_Pembangkit,
                  Master_Nama_Pembangkit,Iconplus_View_Sfc, Iconplus_Master_Sfc,Dashboard_Rekap,Iconplus_Rekap_Laporan,VDashboard_Rekap,
                    Iconplus_Rekap_Laporan_Header){

        $scope.action = $routeParams.action;
        $scope.status_proses = $routeParams.status_proses;
        $scope.$auth = $auth;
        $scope.usergroupid = $auth.userdata.usergroupid;
        if ($scope.usergroupid == 4) {
            $scope.id_regional = $auth.userdata.kode_wilayah;
        }
        if ($scope.usergroupid <= 3) {
            $scope.kode_wilayah = $auth.userdata.kode_wilayah;
        }

            $scope.pills = {
                steps: [{
                    title: 'Rekap Laporan',
                    title2: '(User / Staff)'
                }, {
                    title: 'Verifikasi Laporan',
                    title2: '(Manajer)'
                }, {
                    title: 'Persetujuan Laporan',
                    title2: '(General Manager)'
                }, {
                    title: 'Review & Evaluasi Laporan',
                    title2: '(Regional)'
                }, {
                    title: 'Konsolidasi Laporan',
                    title2: '(PLN Pusat)'
                }
                ],
                current: $routeParams.status_proses
            };
        $scope.data = {};

        var tableFilter = {};
            $scope.moment = moment;
            $scope.accounting = accounting;


            $scope.cari = {
                tahun: moment().format(),
                bidang:$auth.userdata.unitid
            };

            $scope.cari.tahun = moment($routeParams.thbllap, "YYYYMM").format();
            $scope.cari.wilayah = $routeParams.kode_wilayah;
            $scope.cari.kode = $routeParams.kode_wilayah;
            Iconplus_Master_Wilayah.retrieve({kode_wilayah:$routeParams.kode_wilayah}).then(function (response) {
                // // console.log(response.data);
                $scope.cari.nama_wilayah = response.data.nama;
            });

            var datatahun = moment().format('YYYY');
            var unit = $auth.userdata.unitid;


            $scope.modal = {
                header: 'Efisiensi SFC',
                class : 'modal-lg',
                action: 'view',
                data  : {},
                buttons: []
            };

            // $scope.$watchGroup(["cari.kode"], function (val) {
            //     if(val) {
            //         // var datatahun = moment($scope.cari.tahun).format('YYYYMM');
            //         // var unit = $scope.cari.bidang;
            //         // var chargecode = $scope.cari.chargecode;
            //         $scope.table.reload();
            //     }
            //     // // console.log(datatahun);
            //     // // console.log(unit);
            // });

            $scope.btnprint = $button('', {
                title: 'Export Excel',
                icon: 'fa fa-file-excel-o',
                class: 'btn btn-default',
                onclick: function () {
                    $export.excel(document.getElementById("datatarget").innerHTML, "Rekap BPP");
                }
            });
            $scope.ref = {
                pembangkit: {},
                wilayah:{}
            };

            $scope.table = {
                filter: {
                    // id_tab: $scope.id_tab
                },
                total_data: [],
                isloading: null,
                reload: function () {
                    // set parameter untuk dikirim
                    var param = angular.copy($scope.table.filter);
                    param.limit = 30;
                    param.offset = $scope.table.offset;
                    param.thbllap = moment($scope.cari.tahun).format('YYYYMM');
                    param.order = "nourut";
                    param.kode_wilayah = $scope.cari.kode;
                    // param.jenis_pembangkit = $scope.cari.jenis_pembangkit;
                    // param.nama_pembangkit = $scope.cari.nama_pembangkit;
                    //param.order = 'thbllap';
                    // // console.log($scope.table.filter);

                    // cek apakah sedang mengambil data, batalkan jika ada
                    if ($scope.table.isloading != null && $scope.table.isloading.abort)
                        $scope.table.isloading.abort();

                    // kirim data ke server
                        $scope.table.isloading = Iconplus_Rekap_Laporan.list(param);
                        $scope.table.isloading.then(function (response) {
                            // $scope.table.total = response.data.total;
                            $scope.table.data = response.data;
                            $scope.total_target = 0;
                            $scope.total_realisasi = 0;
                            for(var i = 0; i < $scope.table.data.length; i++){
                                var databpp = $scope.table.data[i];
                                $scope.total_target = parseFloat($scope.total_target)  + parseFloat(databpp.target) ;
                                $scope.total_realisasi = parseFloat($scope.total_realisasi) +  parseFloat(databpp.penghematan_sd);
                            }
                        });
                }
            };

            // $scope.reload = function(){
                // var filter = $scope.filter.tahun ? {tahun: moment($scope.filter.tahun).format('YYYY')} : {}
                VDashboard_Rekap.list({thbllap:moment($scope.cari.tahun).format('YYYYMM'), kode_wilayah:$scope.cari.kode}).then(function(response){
                    for(var i = 1; i <= 2; i++){
                        if(!$scope['chart' + i]) $scope['chart' + i] = {
                            data: response.data
                        };
                        else if($scope['chart' + i].reload){
                            $scope['chart' + i].data = response.data;
                            $scope['chart' + i].reload();
                        }
                    }
                });
            // };

            $scope.btnview = function (index, item) {
                if (item.indikator == 'SFC') {
                    var path = 'efisiensisfc';
                }
                else if (item.indikator == 'NPHR') {
                    var path = 'efisiensinphr';
                }
                else if (item.indikator == 'CF') {
                    var path = 'efisiensicf';
                }
                else if (item.indikator == 'CF IPP') {
                    var path = 'efisiensicfipp';
                }
                else if (item.indikator == 'Harga Batubara') {
                    var path = 'hargabatubara';
                }
                else if (item.indikator == 'Harga Gas') {
                    var path = 'hargagas';
                }
                else if (item.indikator == 'Harga BBM') {
                    var path = 'hargabbm';
                }
                else if (item.indikator == 'Harga MDU dan MTU') {
                    var path = 'hargamdumtu';
                }
                else if (item.indikator == 'Biaya Pemeliharaan') {
                    var path = 'biayapemeliharaan';
                }
                else if (item.indikator == 'Administrasi') {
                    var path = 'biayaadministrasi';
                }
                else if (item.indikator == 'Sewa') {
                    var path = 'biayasewa';
                }
                else if (item.indikator == 'Susut Distribusi') {
                    var path = 'susutdistribusi';
                }
                else if (item.indikator == 'Susut Transmisi') {
                    var path = 'susuttransmisi';
                }
                else if (item.indikator == 'PS GI') {
                    var path = 'psgi';
                }
                else if (item.indikator == 'PS Kit') {
                    var path = 'pskit';
                }
                else if (item.indikator == 'Persediaan Material') {
                    var path = 'persediaanmaterial';
                }
                else if (item.indikator == 'Persediaan BBM') {
                    var path = 'persediaanbbm';
                }
                else if (item.indikator == 'Persediaan Batubara') {
                    var path = 'persediaanbatubara';
                }
                else if (item.indikator == 'Piutang') {
                    var path = 'piutang';
                }
                else if (item.indikator == 'COD Pembangkit') {
                    var path = 'codpembangkit';
                }
                else if (item.indikator == 'COD Transmisi') {
                    var path = 'codtransmisi';
                }
                else if (item.indikator == 'COD Gardu Induk') {
                    var path = 'codgi';
                }
                else if (item.indikator == 'Indikator Lainnya') {
                    var path = 'biayalainnya';
                }
                return $button('', {
                    title: '',
                    icon:'fa fa-eye',
                    description:'Target',
                    class: 'btn btn-sm btn-info',
                    href: alt.baseUrl + 'target/'+path+'/list?action=view&kode_wilayah=' + item.kode_wilayah + '&thbllap=' + item.thbllap
                    // onclick: function(){
                    //     Iconplus_View_Sfc.table({thbllap: "= '"+item.thbllap+"'",kode_wilayah: "= '"+item.kode_wilayah+"'"}).then(function(responseTim){
                    //         $scope.modal.data= responseTim.data.list;
                    //         // $scope.modal.data = angular.copy(item);
                    //         $scope.modal.index = index;
                    //         // $scope.modal.buttons = [$scope.btnclose];
                    //         $scope.modal.action = 'view';
                    //         $scope.modal.open();
                    //     });
                    // }
                });
            };
            $scope.btnreal = function (index, item) {
                if (item.indikator == 'SFC') {
                    var path = 'efisiensisfc';
                }
                else if (item.indikator == 'NPHR') {
                    var path = 'efisiensinphr';
                }
                else if (item.indikator == 'CF') {
                    var path = 'efisiensicf';
                }
                else if (item.indikator == 'CF IPP') {
                    var path = 'efisiensicfipp';
                }
                else if (item.indikator == 'Harga Batubara') {
                    var path = 'hargabatubara';
                }
                else if (item.indikator == 'Harga Gas') {
                    var path = 'hargagas';
                }
                else if (item.indikator == 'Harga BBM') {
                    var path = 'hargabbm';
                }
                else if (item.indikator == 'Harga MDU dan MTU') {
                    var path = 'hargamdumtu';
                }
                else if (item.indikator == 'Biaya Pemeliharaan') {
                    var path = 'biayapemeliharaan';
                }
                else if (item.indikator == 'Administrasi') {
                    var path = 'biayaadministrasi';
                }
                else if (item.indikator == 'Sewa') {
                    var path = 'biayasewa';
                }
                else if (item.indikator == 'Susut Distribusi') {
                    var path = 'susutdistribusi';
                }
                else if (item.indikator == 'Susut Transmisi') {
                    var path = 'susuttransmisi';
                }
                else if (item.indikator == 'PS GI') {
                    var path = 'psgi';
                }
                else if (item.indikator == 'PS Kit') {
                    var path = 'pskit';
                }
                else if (item.indikator == 'Persediaan Material') {
                    var path = 'persediaanmaterial';
                }
                else if (item.indikator == 'Persediaan BBM') {
                    var path = 'persediaanbbm';
                }
                else if (item.indikator == 'Persediaan Batubara') {
                    var path = 'persediaanbatubara';
                }
                else if (item.indikator == 'Piutang') {
                    var path = 'piutang';
                }
                else if (item.indikator == 'COD Pembangkit') {
                    var path = 'codpembangkit';
                }
                else if (item.indikator == 'COD Transmisi') {
                    var path = 'codtransmisi';
                }
                else if (item.indikator == 'COD Gardu Induk') {
                    var path = 'codgi';
                }
                else if (item.indikator == 'Indikator Lainnya') {
                    var path = 'biayalainnya';
                }
                return $button('', {
                    title: '',
                    icon:'fa fa-edit',
                    description:'Realisasi',
                    class: 'btn btn-sm btn-danger',
                    href: alt.baseUrl + 'realisasi/'+path+'/list?action=view&kode_wilayah=' + item.kode_wilayah + '&thbllap=' + item.thbllap+"&status=prosesrekap"
                    // onclick: function(){
                    //     Iconplus_View_Sfc.table({thbllap: "= '"+item.thbllap+"'",kode_wilayah: "= '"+item.kode_wilayah+"'"}).then(function(responseTim){
                    //         $scope.modal.data= responseTim.data.list;
                    //         // $scope.modal.data = angular.copy(item);
                    //         $scope.modal.index = index;
                    //         // $scope.modal.buttons = [$scope.btnclose];
                    //         $scope.modal.action = 'view';
                    //         $scope.modal.open();
                    //     });
                    // }
                });
            };
            $scope.btnsave = $button('save', {
                title: "Simpan",
                onclick: function(){
                    // if (!$scope.isvalid()) return;

                    $popup.confirm({
                        caption: 'Apakah semua data sudah benar? Data yang sudah disimpan tidak dapat diubah.',
                        buttons: [
                            $button('yes', {
                                onclick: function () {
                                        var data = {};
                                        var api;
                                        data.id_laporan = $routeParams.id_laporan;
                                        if ($scope.status_proses == 0) {
                                            data.status_proses = 1;
                                        } else if ($scope.data.hasilevaluasi == 'ya' && $scope.status_proses == 1) {
                                            data.status_proses = 2;
                                        } else if ($scope.data.hasilevaluasi == 'ya' && $scope.status_proses == 2) {
                                            data.status_proses = 3;
                                        } else if ($scope.data.hasilevaluasi == 'ya' && $scope.status_proses == 3) {
                                            data.status_proses = 4;
                                        } else {
                                            data.status_proses = 0;
                                        };
                                        if ($scope.status_proses = 1) {
                                            data.hasilevaluasi_man = $scope.data.hasilevaluasi;
                                            data.catatanevaluasi_man = $scope.data.catatanevaluasi;
                                        } else if ($scope.status_proses = 2) {
                                            data.hasilevaluasi_gm = $scope.data.hasilevaluasi;
                                            data.catatanevaluasi_gm = $scope.data.catatanevaluasi;
                                        } else if ($scope.status_proses = 3) {
                                            data.hasilevaluasi_regional = $scope.data.hasilevaluasi;
                                            data.catatanevaluasi_regional = $scope.data.catatanevaluasi;
                                        }
                                        api = Iconplus_Rekap_Laporan_Header.update(data);
                                        api.then(function(response){
                                            if($scope.data.hasilevaluasi == "tidak"){
                                                $alert.add('Data Rekap Laporan berhasil di Reject!', $alert.success);
                                            }else{
                                                $alert.add('Data Rekap Laporan berhasil di Proses!', $alert.success);
                                            }
                                            $window.location.href = alt.baseUrl + 'prosesrekap/list';
                                        });
                                    $popup.close(true);
                                }
                            }),
                            $button('no', {
                                onclick: function () {
                                    $popup.close(false);
                                }
                            })
                        ]
                    });
                }
            });

            $scope.btncancel = $button($scope.action == 'view' ? 'back' : 'cancel', {
                href: alt.baseUrl + 'prosesrekap/list'
            });

            $scope.rowCreated = function(){
                $("#fixTable").tableHeadFixer({"head" : false, "left" : 3});
                $('table thead tr th').css('background-color', '#eee');
            };
    }];
});