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
    'component/iconplus/dashboard/vmonitoringbpp',
    'component/iconplus/viewtarget/sfc',
    'component/iconplus/mastertarget/sfc'
], function(moment){
    return ['$scope', '$routeParams', "$export", '$log', '$button', '$auth', '$popup', 'Iconplus_Master_Wilayah',
        'Master_Jenis_Pembangkit','Master_Nama_Pembangkit','Iconplus_View_Sfc', 'Iconplus_Master_Sfc','Monitoring_BPP',
        function ($scope, $routeParams, $export, $log, $button, $auth, $popup, Iconplus_Master_Wilayah,Master_Jenis_Pembangkit,
                  Master_Nama_Pembangkit,Iconplus_View_Sfc, Iconplus_Master_Sfc,Monitoring_BPP){

        $scope.$auth = $auth;
        var tableFilter = {};
            $scope.moment = moment;
            $scope.accounting = accounting;


            $scope.cari = {
                tahun: moment().format(),
                bidang:$auth.userdata.unitid
            };
            var datatahun = moment().format('YYYY');
            var unit = $auth.userdata.unitid;




            $scope.$watchGroup(["cari.tahun","cari.kode_wilayah","cari.jenis_pembangkit","cari.nama_pembangkit"], function (val) {
                if(val) {
                    var datatahun = moment($scope.cari.tahun).format('YYYYMM');
                    // var unit = $scope.cari.bidang;
                    // var chargecode = $scope.cari.chargecode;
                    $scope.table.reload();
                }
                // // console.log(datatahun);
                // // console.log(unit);
            });

            $scope.btnprint = $button('print', {
                title: 'Export Excel',
                icon: 'fa fa-file-excel-o',
                class: 'btn btn-default',
                onclick: function () {
                    $export.excel(document.getElementById("datatarget").innerHTML, "Rekap BPP");
                }
            });
            $scope.ref = {
                pembangkit: {}
            };
            Master_Jenis_Pembangkit.list().then(function(response){
                angular.forEach(response.data, function(val, key){
                    $scope.ref.pembangkit[val.jenis_pembangkit] = val;
                });
            });
            Iconplus_Master_Wilayah.list({
                select:"kode_wilayah,nama",
                // where:"id_bidang = "+$scope.cari.bidang
                order:"nama"
            }).then(function(response){
                $scope.listwilayah = response.data;

            });
            $scope.pilih_wilayah = function (item) {
                $scope.cari.kode_wilayah = item.kode_wilayah;
                $scope.cari.nama = item.nama;
                Master_Nama_Pembangkit.list({
                    select:"kode_pembangkit,nama_pembangkit",
                    where:"indikator = 'SFC' and kode_wilayah = '"+$scope.cari.kode_wilayah+"'",
                    order:"nama_pembangkit"
                }).then(function(response){
                    $scope.listpembangkit = response.data;
                });
            };
            $scope.pilih_pembangkit = function (item) {
                $scope.cari.nama_pembangkit = item.nama_pembangkit;
            };
            Master_Nama_Pembangkit.list({
                select:"kode_pembangkit,nama_pembangkit",
                where:"indikator = 'SFC'",
                order:"nama_pembangkit"
            }).then(function(response){
                $scope.listpembangkit = response.data;
            });

            $scope.table = {
                filter: {
                    // id_tab: $scope.id_tab
                },
                total_data: [],
                isloading: null,
                reload: function () {
                    // set parameter untuk dikirim
                    var param = angular.copy($scope.table.filter);
                    param.limit = 68;
                    param.offset = $scope.table.offset;
                    // param.thbllap = moment($scope.cari.tahun).format('YYYYMM');
                    param.where = "thbllap = '"+moment($scope.cari.tahun).format('YYYYMM')+"'";
                    // param.thbllap = datatahun;
                    // param.kode_wilayah = $scope.cari.kode_wilayah;
                    // param.jenis_pembangkit = $scope.cari.jenis_pembangkit;
                    // param.nama_pembangkit = $scope.cari.nama_pembangkit;
                    //param.order = 'thbllap';
                    // // console.log($scope.table.filter);

                    // cek apakah sedang mengambil data, batalkan jika ada
                    if ($scope.table.isloading != null && $scope.table.isloading.abort)
                        $scope.table.isloading.abort();

                    // kirim data ke server
                    $scope.table.isloading = Monitoring_BPP.list(param);
                    $scope.table.isloading.then(function (response) {
                        // $scope.table.total = response.data.total;
                        $scope.table.data = response.data;
                    });
                }
            };

            $scope.btnedit = function (index, item) {
                return $button('edit', {
                    title: '',
                    class: 'btn btn-sm btn-warning',
                    href: alt.baseUrl + 'target/_efisiensisfc/detail?action=edit&id_tab=' + item.id_tab
                });
            };

            $scope.btnremove = function (index, item) {
                if ($scope.id_tab != '') {
                    return $button('remove', {
                        title: '',
                        class: 'btn btn-sm btn-danger',
                        onclick: function () {
                            $popup.confirm({
                                caption: "Anda yakin akan menghapus data: " + item.kode_wilayah + "-" + item.nama_wilayah + "-" + item.id_tab + " ?",
                                buttons: [
                                    $button('yes', {
                                        onclick: function () {
                                            Iconplus_Master_Sfc.remove({id_tab: item.id_tab}).then(function (response) {
                                                $scope.table.reload();
                                                $alert.add('Data berhasil dihapus!', $alert.success);
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
                } else {
                    return $button('remove', {
                        title: '',
                        class: 'btn btn-sm btn-danger',
                        disabled: true
                    });
                }
            };

            $scope.btnupload = $button('add', {
                title: 'Upload',
                icon: 'fa fa-upload',
                class: 'btn btn-success',
                href: alt.baseUrl + 'target/_efisiensisfc?action=add'
            });

            $scope.btnadd = $button('add', {
                title: 'Tambah Data',
                icon: 'fa fa-plus',
                class: 'btn btn-info',
                href: alt.baseUrl + 'target/_efisiensisfc/detail?action=add',
            })

            $scope.rowCreated = function(){
                $("#fixTable").tableHeadFixer({"head" : false, "left" : 2});
                $('table thead tr th').css('background-color', '#eee');
            };
    }];
});