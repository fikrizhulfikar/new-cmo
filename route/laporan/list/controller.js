requirejs.s.contexts._.config.shim['asset/js/tableHeadFixer'] = {
    deps: ['asset/lib/jquery/jquery.min']
};

requirejs.s.contexts._.config.shim['asset/lib/bootstrap/dist/js/bootstrap.min'] = {
    deps: ['asset/lib/jquery/jquery.min']
};

define([
    'asset/lib/moment/min/moment-with-locales.min',
    'asset/js/accounting.min',
    'asset/lib/jquery/jquery.min',
    'asset/lib/bootstrap/dist/js/bootstrap.min',
    'asset/js/tableHeadFixer',
    'component/alt/button/service',
    'component/activiti/task',
    'component/activiti/process',
    'component/system/user/userrole',
    'component/iconplus/master/unit',
    'component/pusharlis/generatedoc',
    'component/iconplus/master/permohonan'
], function(moment,accounting){
    return ['$scope', '$auth', '$q', '$routeParams', '$log', '$button', '$window', 'Iconplus_Master_Unit','Iconplus_Master_Permohonan', 'Pusharlis_Generatedoc',
        function($scope, $auth, $q, $routeParams, $log, $button, $window, Iconplus_Master_Unit,Iconplus_Master_Permohonan, Pusharlis_Generatedoc){
            moment.locale('id');
            $scope.moment = moment;
            $scope.accounting = accounting;
            $scope.unitid = $auth.userdata.unitid;
            $scope.usergroupid = $auth.userdata.usergroupid;

            $(document).ready(function(){
                $('#myTab a').click(function (e) {
                    e.preventDefault();
                    $(this).tab('show');
                })
            });

            //filter
            $scope.filter = {};
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
                debugger;
                $scope.table.filter = {};
                if($scope.filter.usrLaporan_unitid.unitid) $scope.table.filter.unitid = "= "+$scope.filter.usrLaporan_unitid.unitid;
                if($scope.filter.bulanawal) $scope.table.filter.tglproses = moment($scope.filter.bulanawal).format('/MM/YYYY');
                //if($scope.filter.bulanakhir) $scope.table.filter.tglproses = moment($scope.filter.bulanakhir).format('/MM/YYYY');
            };

            // table
            $scope.isAllowGetData = false;
            $scope.rekap = {};
            $scope.rekapjumlah = {kategori: 0, status: 0};
            $scope.table = {
                total_data: [],
                filter: {},
                reload: function(){
                    if ($scope.isAllowGetData) {
                        // set parameter untuk dikirim
                        var param = angular.copy($scope.table.filter);
                        param.limit = $scope.table.limit;
                        param.offset = $scope.table.offset;
                        if($auth.userdata.usergroupid == 7){
                            param.id_ptl = "= "+$auth.userdata.userid;
                        }

                        /*if($auth.userdata.usergroupid == 7){
                            param.where = "chargecode in (" + $scope.proyekArray.join(",") + ")";
                        }*/

                        // cek apakah sedang mengambil data, batalkan jika ada
                        if ($scope.table.isloading != null && $scope.table.isloading.abort)
                            $scope.table.isloading.abort();

                        // kirim data ke server
                        // $scope.table.isloading = Activiti_Process.table(param);
                        $scope.table.isloading = Iconplus_Master_Permohonan.table(param);
                        $scope.table.isloading.then(function (response) {
                            $scope.table.total = response.data.total;
                            $scope.table.data = response.data.list;
                            $scope.showReport = true;
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
                        href: alt.baseUrl + 'monitoring/status/detail?penugasanid=' + item.penugasanid + '&processInstanceId=' + item.proc_inst_id_,
                        class: 'btn btn-sm btn-primary'
                    })
                ];
            };

            // referensi
            $scope.ref = {
                unit: {}
            };

            Iconplus_Master_Unit.list().then(function(response){
                $scope.ref.unit  = response.data;
            });

            Iconplus_Master_Unit.retrieve({unitid: $scope.unitid}).then(function(response){
                $scope.data.usrLaporan_namaunit  = response.data.name;
                $scope.filter.usrLaporan_unitid = $scope.unitid;
                console.log("tes"+$scope.unitid);
            });

            $scope.proyekArray = [];
            var paramfilter ={
                select:"proc_inst_id_, chargecode, pekerjaan"
            };
            if($auth.userdata.usergroupid == 7){
                paramfilter.id_ptl = "= " + $auth.userdata.userid;
            }
            // Pusharlis_Master_Act_Process.list(paramfilter).then(function(response){
            //     $scope.ref.proyek = response.data;
            //     // angular.forEach(response.data, function(val, key){
            //     //     $scope.ref.proyek[val.chargecode] = val;
            //     //     $scope.proyekArray.push("'" + val.chargecode + "'");
            //     // });
            // });


            $scope.pilih_chargecode = function(val){
                $scope.filter_chargecode = val ;
            };

            $scope.combobox1 = [];

            $scope.pilih_unit = function (name){
                // $scope.modal.data.jabatan = nama_peran;
                // if ($scope.unitid != 0) {
                // $scope.data.usrPermohonan_unitid = $auth.userdata.unitid;
                // $scope.data.usrPermohonan_namaunit = $scope.ref.unit[$scope.unitid].name;
                // }
                $scope.data.usrLaporan_namaunit = name;
            }

            $scope.$watch('filter.usrLaporan_unitid', function(val){
                if(val) {
                    // $scope.data.usrPermohonan_namaunit = $scope.ref.unit[val].name;
                    $scope.data.usrLaporan_namaunit = val.name;
                    // $scope.data.usrPermohonan_unitid = val.unitid;
                }
            });

            $scope.getnoproyek = {selected : undefined};
            $scope.getunit = {selected : undefined};
            $scope.getchargecode = {selected : undefined};
            // chart
            $scope.chart1 = {};
            $scope.chart2 = {};

            $scope.printdoc = $button('print',{

                class: 'btn btn-sm btn-warning',
                title: 'Cetak Report',
                ondblclick: function(){
                    // Iconplus_Master_Jadwal.update($scope.jadwal).then(function (response) {
                    //     $alert.add('Data berhasil diedit!', $alert.success);
                    // });
                    debugger;
                    $scope.cetak = {};
                    $scope.cetak.tabelcm = angular.toJson($scope.table.data);
                    //$scope.cetak.chargecode = "A.I1.2.18.002";

                    Pusharlis_Generatedoc.permohonan($scope.cetak).then(function(response) {
                        $window.location.href = alt.serverUrl + response.data;
                    });
            }});
        }];
});