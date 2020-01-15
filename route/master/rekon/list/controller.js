define([
    'asset/lib/moment/min/moment-with-locales.min',
    'component/alt/button/service',
    'asset/js/accounting.min',
    'component/iconplus/master/rekon',
    'component/iconplus/master/unit'
], function(moment){
    return ['$scope', '$routeParams', '$log', '$button', '$export','$auth', '$popup', 'Iconplus_Master_Rekon','Iconplus_Master_Unit',
        function($scope, $routeParams, $log, $button, $export, $auth, $popup, Iconplus_Master_Rekon,Iconplus_Master_Unit){
        // toolbar
        $scope.toolbar = {
            title: 'Data Rekon',
            description: 'Pengelolaan Data Rekon'
        };
        // breadcrumb
        $scope.breadcrumb = {
            data: [{
                title: alt.title,
                url: alt.baseUrl
            }, {
                title: 'Data Rekon',
                url: alt.baseUrl + 'master/rekon/list',
                isactive: true
            }]
        };
        //button add
        $scope.btnadd = $button('add', {
            title: 'Tambah',
            icon: 'fa fa-plus',
            class: 'btn btn-primary',
            href: alt.baseUrl + 'master/rekon/detail?action=add'
        });

        //button upload
        $scope.btnupload = $button('add', {
            title: 'Upload',
            icon: 'fa fa-upload',
            class: 'btn btn-success',
            href: alt.baseUrl +  'master/rekon/detail?action=add'
        });

        //button
         $scope.btnprint = $button('', {
            title: 'Export Excel',
            icon: 'fa fa-file-excel-o',
            class: 'btn btn-default',
            onclick: function () {
                $export.excel(document.getElementById("datatargetform").innerHTML, "Rekon");
            }
        });

        $scope.$auth = $auth;
        $scope.moment = moment;
        //$scope.thbllap = $routeParams.thbllap;
        console.log($scope.$auth);
        console.log($routeParams);

        var tableFilter = {};
        // $scope.id_tab = $routeParams.id_tab;
        $scope.action = $routeParams.action;
        $scope.usergroupid = $auth.userdata.usergroupid;
        $scope.cari = {
            tahun: moment().format(),
            unit_id : $routeParams.unitid,
            layanan: ""
        };

        if ($scope.usergroupid == 2) {
            $scope.unit_id = $auth.userdata.unitid;
        }

        if ($scope.usergroupid <= 3) {
            $scope.kode_wilayah = $auth.userdata.kode_wilayah;
            $scope.cari.kode_wilayah = $auth.userdata.kode_wilayah;
        }
        
        $scope.accounting = accounting;
        
        $scope.ref = {
                pembangkit: {},
                wilayah:{}
            };

        // var datatahun = moment().format('YYYY');
        var unit = $auth.userdata.unitid;

            if ($scope.action == 'view') {
                $scope.cari.kode_wilayah = $routeParams.kode_wilayah;
                Iconplus_Master_Rekon.retrieve({kode_wilayah:$routeParams.kode_wilayah}).then(function (response) {
                    // // console.log(response.data);
                    // $scope.cari.kode_wilayah = response.data.kode_wilayah;
                    $scope.cari.nama_wilayah = response.data.nama;
                    $scope.cari.unit = $scope.ref.wilayah[+$scope.cari.unit];
                });
                if ($scope.thbllap >= '201701') {
                    $scope.cari.tahun = moment($routeParams.thbllap, "YYYYMM").format(); // moment($routeParams.thbllap).format('YYYYMM');
                }
            }
            else if ($scope.action != 'view' && $scope.usergroupid == 2) {

                Iconplus_Master_Rekon.retrieve({unit_id:unit}).then(function (response) {
                    console.log(response.data);
                    $scope.cari.unit_id = response.data.unit_id;
                    $scope.cari.nama_unit = response.data.nama_unit;

                });
                if ($scope.thbllap >= '201701') {
                    $scope.cari.tahun = moment($scope.thbllap, "YYYYMM").format(); // moment($routeParams.thbllap).format('YYYYMM');
                }
            }

        $scope.table = {
            total_data: [],
            isloading: null,
            reload: function () {
                // set parameter untuk dikirim
                var param = angular.copy($scope.table.filter);
                param.thbllap = moment($scope.cari.tahun).format('YYYYMM');
                param.limit = $scope.table.limit;
                param.offset = $scope.table.offset;
                // param.id_regional = $scope.id_regional;
                if ($scope.cari.unit_id != null ) {
                    param.where = "unit_id = "+$scope.cari.unit_id;
                }
                // param.unit_id = $scope.cari.unit_id;
                param.jenis_layanan = $scope.jenis;
                // console.log();
                // param.nama_pembangkit = $scope.cari.nama_pembangkit;

                // cek apakah sedang mengambil data, batalkan jika ada
                if ($scope.table.isloading != null && $scope.table.isloading.abort)
                    $scope.table.isloading.abort();

                // kirim data ke server
                $scope.table.isloading = Iconplus_Master_Rekon.table(param);
                $scope.table.isloading.then(function (response) {
                    $scope.table.total = response.data.total;
                    $scope.table.data = response.data.list;
                });
            }
        };



        // Master_Jenis_Pembangkit.list().then(function(response){
        //     angular.forEach(response.data, function(val, key){
        //         $scope.ref.pembangkit[val.jenis_pembangkit] = val;
        //     });
        // });

    
        Iconplus_Master_Rekon.list({
            select: "unit_id,nama_unit",
            group:"unit_id,nama_unit",
            order:"unit_id"
        }).then(function (responsex) {
            $scope.listunit = responsex.data;
            //console.log($scope.listunit);
        });

        Iconplus_Master_Rekon.list({
            select: "jenis_layanan",
            group:"jenis_layanan"
        }).then(function(responsex){
            $scope.listlayanan = responsex.data;
        });
      
        $scope.pilih_unit = function (item) {
            $scope.cari.unit_id = item.unit_id;
            // //$scope.cari.nama = item.nama;
            // Iconplus_Master_Rekon.list({
            //     select:"*",
            //     where:"unit_id = '"+$scope.cari.kode_wilayah+"'",
            //     order:"nama_unit"
            // }).then(function(response){
            //     $scope.listpembangkit = response.data;
            // });
            $scope.table.reload();
        };
        $scope.pilih_layanan = function (item) {
            $scope.cari.jenis_layanan = item.jenis_layanan;
            $scope.table.reload();
           // $scope.cari.jenis_pembangkit = item.jenis_pembangkit;
        };
        

        $scope.btnedit = function (index, item) {
            return $button('edit', {
                title: '',
                class: 'btn btn-sm btn-warning',
                href: alt.baseUrl + 'master/rekon/detail?action=edit&uni_tid=' + item.unit_id
            });
        };

        $scope.btnview = function (index, item) {
            return $button('view', {
                title: '',
                icon:'fa fa-eye',
                class: 'btn btn-sm btn-info',
                href: alt.baseUrl + 'master/rekon/detail?action=view&unit_id=' + item.unit_id
            });
        };

        $scope.btnremove = function (index, item) {
            return $button('remove', {
                title: '',
                class: 'btn btn-sm btn-danger',
                onclick: function () {
                    $popup.confirm({
                        caption: "Anda yakin akan menghapus unit : " + item.name + " ?",
                        buttons: [
                            $button('yes', {
                                onclick: function () {
                                    Iconplus_Master_Rekon.remove({unitid: item.unitid}).then(function (response) {
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
        };

            $scope.jenis = {};
            $scope.$watchGroup(["cari.tahun","cari.unit"], function (val) {
                if(val) {
                    var datatahun = moment($scope.cari.tahun).format('YYYYMM');
                    var unit = $scope.cari.unit;

                    $scope.table.reload();
                }
                // // console.log(datatahun);
                // // console.log(unit);
            });
            $scope.$watchGroup(["cari.jenis_layanan"], function (val) {
                if(val) {
                   var jenis_layanan = $scope.cari.jenis_layanan;
                    $scope.jenis = jenis_layanan.jenis_layanan;
                    //var chargecode = $scope.cari.chargecode;
                    $scope.table.reload();
                }
                // // console.log(datatahun);
                // // console.log(unit);
            });

        $scope.$watch('filter',function(val, oldval){
            if(oldval.key != val.key){
                $scope.filter.value = '';
            }else {
                if ($scope.filter.key && $scope.filter.value) {
                    if ($scope.filter.key != 'id_regional') {
                        $scope.table.filter[$scope.filter.key] = $scope.filter.value;
                    } else {
                        $scope.table.filter['where'] = $scope.filter.key + ' = ' + $scope.filter.value;
                    }
                } else {
                    $scope.table.filter = {};
                }
            }
        },true);
    }];
});