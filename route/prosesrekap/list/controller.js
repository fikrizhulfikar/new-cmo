requirejs.s.contexts._.config.shim['asset/js/tableHeadFixer'] = {
    deps: ['asset/lib/jquery/jquery.min']
};

define([
    'asset/lib/moment/min/moment-with-locales.min',
    'asset/lib/jquery/jquery.min',
    'asset/js/tableHeadFixer',
    'component/alt/button/service',
    'component/iconplus/master/wilayah',
    'component/iconplus/master/regional',
    'component/iconplus/master/rekaplaporanheader',
    'component/iconplus/master/rekaplaporan',
    'component/iconplus/master/vdashboardstatus'
], function(moment){
    return ['$scope', '$routeParams', '$auth', '$log', '$window', '$button', 'Iconplus_Master_Dashboard_Status','Iconplus_Rekap_Laporan_Header','Iconplus_Master_Wilayah',
        'Iconplus_Rekap_Laporan','Iconplus_Master_Regional',
        function($scope, $routeParams, $auth, $log, $window, $button, Iconplus_Master_Dashboard_Status,Iconplus_Rekap_Laporan_Header, Iconplus_Master_Wilayah,
                 Iconplus_Rekap_Laporan,Iconplus_Master_Regional){
            moment.locale('id');
            $scope.moment = moment;
            $scope.isinputkontrak = $routeParams.isinputkontrak;
            $scope.ispembatalan = false;

            $scope.unitid = $auth.userdata.unitid;
            $scope.usergroupid = $auth.userdata.usergroupid;
            if ($scope.usergroupid == 5) {
                $scope.nama_pln = 'PT PLN Kantor Pusat';
            }
            if ($scope.usergroupid == 4) {
                $scope.id_regional = $auth.userdata.kode_wilayah;
                Iconplus_Master_Regional.retrieve({
                    select: "id_regional, regional, nama_regional",
                    where:"id_regional = "+$scope.id_regional}).then(function (response) {
                    // // console.log(response.data);
                    $scope.cari.nama_regional = response.data.regional;
                });
            }
            if ($scope.usergroupid <= 3) {
                $scope.kode_wilayah = $auth.userdata.kode_wilayah;
                Iconplus_Master_Wilayah.retrieve({kode_wilayah:$scope.kode_wilayah}).then(function (response) {
                    // // console.log(response.data);
                    $scope.cari.nama_wilayah = response.data.nama;
                });
            }
            $scope.cari = {};
            $scope.cari.tahun = moment().format();

            $scope.filter = {};
            var tableFilter = {};

            $scope.$watchGroup(["cari.tahun"], function (val) {
                if(val) {
                    $scope.table.reload();
                }
            });

            if ($scope.usergroupid == 5 && $scope.action != 'view') {
                Iconplus_Master_Wilayah.list({
                    select: "kode_wilayah,nama",
                    // where:"id_bidang = "+$scope.cari.bidang
                    order: "nama"
                }).then(function (responsex) {
                    $scope.listwilayah = responsex.data;
                });
            }
            else if ($scope.usergroupid == 4 && $scope.action != 'view') {
                Iconplus_Master_Wilayah.list({
                    select: "kode_wilayah,nama",
                    where:"id_regional = "+$scope.id_regional,
                    order: "nama"
                }).then(function (responsex) {
                    $scope.listwilayah = responsex.data;
                });
            }

            $scope.pilih_wilayah = function (item) {
                $scope.cari.kode_wilayah = item.kode_wilayah;
                $scope.kode_wilayah = item.kode_wilayah;
                $scope.cari.nama = item.nama;
                $scope.table.reload();
            };


            $scope.table = {
                total_data: [],
                filter: tableFilter,
                reload: function(){
                    // set parameter untuk dikirim
                    var param = angular.copy($scope.table.filter);
                    param.limit = $scope.table.limit;
                    param.offset = $scope.table.offset;
                    param.kode_wilayah = $scope.kode_wilayah;
                    param.id_regional = $scope.id_regional;
                    param.thbllap = moment($scope.cari.tahun).format('YYYYMM');
                    // param.order = "id desc";

                    // cek apakah sedang mengambil data, batalkan jika ada
                    if($scope.table.isloading != null && $scope.table.isloading.abort)
                        $scope.table.isloading.abort();

                    // kirim data ke server
                    $scope.table.isloading = Iconplus_Rekap_Laporan_Header.table(param);
                    $scope.table.isloading.then(function(response){
                        $scope.table.total = response.data.total;
                        $scope.table.data = response.data.list;
                    });
                },
            };

            $scope.rowCreated = function(){
                $("#fixTable").tableHeadFixer({"head" : false, "left" : 2});
                $('table thead tr th').css('background-color', '#eee');
            };

            $scope.rowCreated();

            $scope.btnedit = function (index, item) {
                if (parseInt(item.status_proses) + 1  == $scope.usergroupid) {
                    return $button('', {
                        title: '',
                        class: 'btn btn-sm btn-warning',
                        icon : 'fa fa-send-o',
                        description : 'Proses Kirim Laporan',
                        href: alt.baseUrl + 'prosesrekap/detail?action=edit&kode_wilayah=' + item.kode_wilayah+'&thbllap='+item.thbllap+'&status_proses='+item.status_proses+'&id_laporan='+item.id_laporan
                    });
                } else {
                    return $button('view', {
                        title: '',
                        class: 'btn btn-sm btn-info',
                        href: alt.baseUrl + 'prosesrekap/detail?action=view&kode_wilayah=' + item.kode_wilayah+'&thbllap='+item.thbllap+'&status_proses='+item.status_proses+'&id_laporan='+item.id_laporan
                    });
                };
            };
            $scope.btnrekap = function (index, item) {
                return $button('', {
                    title: '',
                    class: 'btn btn-sm btn-danger',
                    icon : 'fa fa-bolt',
                    description : 'Proses Rekap Laporan',
                    onclick: function () {
                        var data = {};
                        data.thbllap = item.thbllap;
                        data.kode_wilayah = item.kode_wilayah;
                        Iconplus_Rekap_Laporan.update_rekap(data).then(function (response) {
                            $window.location.href = alt.baseUrl + 'prosesrekap/detail?action=edit&kode_wilayah=' + item.kode_wilayah+'&thbllap='+item.thbllap+'&status_proses='+item.status_proses+'&id_laporan='+item.id_laporan;
                            $alert.add('Data Rekap berhasil diUpdate!', $alert.success);
                        });
                    }
                });
            };

            $scope.btnrekapregional =  $button('', {
                title: 'Rekap Laporan Regional',
                class: 'btn btn-sm btn-success',
                icon : 'fa fa-bolt',
                description : 'Proses Rekap Laporan Regional',
                onclick: function () {
                    var data = {};
                    data.thbllap = moment($scope.cari.tahun).format('YYYYMM');
                    data.kode_wilayah = $scope.id_regional;
                    Iconplus_Rekap_Laporan.update_rekap(data).then(function (response) {
                        $window.location.href = alt.baseUrl + 'laporan/rekap';
                        $alert.add('Data Rekap berhasil diUpdate!', $alert.success);
                    });
                }
            });

            $scope.btnrekappusat =  $button('', {
                title: 'Rekap Laporan PLN Pusat',
                class: 'btn btn-sm btn-success',
                icon : 'fa fa-bolt',
                description : 'Proses Rekap Laporan PLN Pusat',
                onclick: function () {
                    var data = {};
                    data.thbllap = moment($scope.cari.tahun).format('YYYYMM');
                    data.kode_wilayah = '1000';
                    Iconplus_Rekap_Laporan.update_rekap(data).then(function (response) {
                        $window.location.href = alt.baseUrl + 'laporan/rekap';
                        $alert.add('Data Rekap berhasil diUpdate!', $alert.success);
                    });
                }
            });

            $scope.$watch('filter',function(val){
                if($scope.filter.value && $scope.filter.key){
                    delete $scope.table.filter.blank;
                    $scope.table.filter = angular.extend($scope.table.filter,{
                        [$scope.filter.key] : $scope.filter.value
                    });
                }else{
                    $scope.table.filter = angular.copy(angular.extend(tableFilter, {
                        "blank" : "1"
                    }));
                }
            },true);

            $scope.convertstatus = function (val) {
                if(val == '0'){
                    return '0 - Proses Update Realisasi (User/Staff)';
                }
                if(val == '1'){
                    return '1 - Verifikasi Rekap Laporan (Manajer)';
                }
                if(val == '2'){
                    return '2 - Persetujuan Rekap Laporan (General Manager)'
                }
                if(val == '3'){
                    return '3 - Review & Evaluasi Laporan (Regional)';
                }
                if(val == '4'){
                    return '4 - Konsolidasi Laporan (PLN Pusat)';
                }
            };

            /*Iconplus_Master_Dashboard_Status.list().then(function(response){
                    angular.forEach(response.data, function(val, key) {
                        $scope.tahap1 = {
                            color: 'blue',
                            icon: 'fa fa-comment',
                            data: {
                                nama: 'Input Penugasan',
                                jabatan: '(Admin Pemasaran)',
                                jumlah: val.input,
                                url: alt.baseUrl + 'penugasan/penugasan/list',
                            },
                        };

                        $scope.tahap2 = {
                            color: 'red',
                            icon: 'fa fa-bar-chart-o',
                            data: {
                                nama: 'Evaluasi Penugasan',
                                jabatan: '(Manajer Pemasaran)',
                                jumlah: val.evaluasiman,
                                url: alt.baseUrl + 'penugasan/penugasan/list'
                            }
                        };

                        $scope.tahap3 = {
                            color: 'green',
                            icon: 'fa fa-shopping-cart',
                            data: {
                                nama: 'Review Penugasan',
                                jabatan: '(Manajer Senior Pemasaran)',
                                jumlah: val.evaluasims,
                                url: alt.baseUrl + 'penugasan/penugasan/list'
                            }
                        };

                        $scope.tahap4 = {
                            color: 'yellow',
                            icon: 'fa fa-television',
                            data: {
                                nama: 'Verifikasi Penugasan',
                                jabatan: '(Direktur Pemasaran)',
                                jumlah: val.evaluasidir,
                                url: alt.baseUrl + 'penugasan/penugasan/list'
                            }
                        };
                    });

                });*/

        }];
});
