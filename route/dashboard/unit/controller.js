requirejs.s.contexts._.config.shim['asset/lib/pivot/dist/plotly-basic-latest.min'] = {
    deps: ['asset/lib/jquery/jquery.min', 'asset/lib/jquery-ui/jquery-ui.min', ]
};
// requirejs.s.contexts._.config.shim['asset/lib/pivot/dist/plotly-latest.min'] = {
//     deps: ['asset/lib/jquery/jquery.min', 'asset/lib/jquery-ui/jquery-ui.min', ]
// };
requirejs.s.contexts._.config.shim['asset/lib/pivot/dist/pivot'] = {
    deps: ['asset/lib/jquery/jquery.min', 'asset/lib/jquery-ui/jquery-ui.min', ]
};
requirejs.s.contexts._.config.shim['asset/lib/pivot/dist/plotly_renderers'] = {
    deps: ['asset/lib/jquery/jquery.min', 'asset/lib/jquery-ui/jquery-ui.min', ]
};

define([
    'asset/lib/moment/min/moment-with-locales.min',
    'component/alt/button/service',
    'asset/js/accounting.min',
    'asset/lib/pivot/dist/plotly-basic-latest.min',
    'asset/lib/pivot/dist/pivot',
    'asset/lib/pivot/dist/plotly_renderers',
    'component/iconplus/dashboard/vdashboardunit',
    'component/iconplus/master/vpivotrekaplaporan',
    'component/iconplus/masterpendukung/regional'
], function(moment,accounting){
    return ['$scope', '$timeout', '$routeParams', '$button', '$log', '$auth', '$notification',
        'Dashboard_Unit','Iconplus_View_Regional','Iconplus_Vpivot',
        function($scope, $timeout, $routeParams, $button, $log, $auth,$notification,
                 Dashboard_Unit,Iconplus_View_Regional,Iconplus_Vpivot){

            $scope.accounting = accounting;

            $scope.moment = moment;

            $scope.toolbar = {
                title: 'Dashboard'
            };

            $scope.filter = {};
            $scope.dashboard = {};
            $scope.dashboard2 = {};
            $scope.dashboard3 = {};
            $scope.btnsearch = $button('search', {
                class: 'btn btn-primary',
                onclick: function(){
                    $scope.reload();
                }
            });

            Iconplus_View_Regional.list({
                select:"id_regional,regional, nama_regional",
                // where:"id_bidang = "+$scope.cari.bidang
                order:"id_regional"
            }).then(function(response){
                $scope.listregional = response.data;

            });

            $scope.cari = {};
            var now = moment().format();
            var    now2;
            var    now3;
            now2 = moment(now).format('YYYY')+'01';
            now3 = moment(now2, "YYYYMM").format();
            $scope.cari = {
                // tahun: moment().format(),
                tahun: now3,
                tahun2: moment().format()
            };
            $scope.cari.nama_regional = 'KANTOR PUSAT & JASA';
            $scope.pilih_regional = function (item) {
                $scope.cari.id_regional = item.id_regional;
                $scope.cari.nama_regional = item.nama_regional;
            };

            $scope.$watchGroup(["cari.tahun","cari.tahun2","cari.id_regional","cari.nama_regional"], function (val) {
                if(val) {
                    $scope.reload();
                }
                // // console.log(datatahun);
                // // console.log(unit);
            });


            $scope.reload = function(){
                var param = {};
                param.select = "ID_REGIONAL, REGIONAL, KODE_WILAYAH, NAMA_WILAYAH, KETERANGAN, (case when keterangan = 'Target' then MAX(JUMLAH) ELSE SUM(JUMLAH) END) JUMLAH,  MIN(THBLLAP) THBLMIN, MAX(THBLLAP) THBLMAX";
                param.where  = "THBLLAP between "+moment($scope.cari.tahun).format('YYYYMM')+" and "+moment($scope.cari.tahun2).format('YYYYMM')+" and regional = '"+$scope.cari.nama_regional+"'";
                param.group = "ID_REGIONAL, REGIONAL, KODE_WILAYAH, NAMA_WILAYAH, KETERANGAN";
                param.order = "NAMA_WILAYAH,KETERANGAN";
                param.kode_wilayah = $scope.cari.kode;

                Dashboard_Unit.list(param).then(function(response){
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
                Iconplus_Vpivot.list({
                    select : "REGIONAL, KODE_WILAYAH, NAMA_WILAYAH, nourut,INDIKATOR, KETERANGAN, (case when keterangan = 'Target' then MAX(JUMLAH) ELSE SUM(JUMLAH) END) JUMLAH",
                    where  : "THBLLAP between '"+moment($scope.cari.tahun).format('YYYYMM')+"' and '"+moment($scope.cari.tahun2).format('YYYYMM')+"' and id_regional <> '0' and regional = '"+$scope.cari.nama_regional+"'",
                    group  : "REGIONAL, KODE_WILAYAH, NAMA_WILAYAH, nourut,INDIKATOR, KETERANGAN",
                    order : "NAMA_WILAYAH,KETERANGAN"}).then(function(response){
                    var data = response.data;
                    $(function(){
                        $("#output").pivotUI(
                            data, {
                                rows: ["nourut","indikator"],
                                cols: ["nama_wilayah","keterangan"],
                                vals: ["jumlah"],
                                aggregatorName: "Sum",
                                rendererName: "Heatmap",
                                renderers: $.extend(
                                    $.pivotUtilities.renderers,$.pivotUtilities.plotly_renderers,
                                    $.pivotUtilities.export_renderers)
                            });
                    });
                });
            };

            $scope.reload();
        }];
});