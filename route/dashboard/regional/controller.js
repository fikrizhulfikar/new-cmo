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
    'component/iconplus/master/vmasterdatarekon',
    'component/iconplus/master/vpivotrekaplaporan'
], function(moment,accounting){
    return ['$scope', '$timeout', '$routeParams', '$button', '$log', '$auth', '$notification',
        'Iconplus_Vpivot','Master_Data_Rekon',
        function($scope, $timeout, $routeParams, $button, $log, $auth,$notification,
                 Iconplus_Vpivot,Master_Data_Rekon){

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

            $scope.$watchGroup(["cari.tahun","cari.tahun2"], function (val) {
                if(val) {
                    $scope.reload();
                }
            });

            $scope.reload = function(){
                // Iconplus_Vpivot.list({
                //     select : "KODE_WILAYAH, REGIONAL, nourut,INDIKATOR, KETERANGAN, (case when keterangan = 'Target' then MAX(JUMLAH) ELSE SUM(JUMLAH) END) JUMLAH",
                //     where  : "THBLLAP between '"+moment($scope.cari.tahun).format('YYYYMM')+"' and '"+moment($scope.cari.tahun2).format('YYYYMM')+"' and id_regional = '0'",
                //     group  : "REGIONAL, KODE_WILAYAH, nourut,INDIKATOR, KETERANGAN",
                //     order : "KODE_WILAYAH"}).then(function(response){
                //     var data = response.data;
                //     $(function(){
                //         $("#output").pivotUI(
                //             data, {
                //                 rows: ["nourut","indikator"],
                //                 cols: ["regional","keterangan"],
                //                 vals: ["jumlah"],
                //                 aggregatorName: "Sum",
                //                 rendererName: "Heatmap",
                //                 renderers: $.extend(
                //                     $.pivotUtilities.renderers,$.pivotUtilities.plotly_renderers,
                //                     $.pivotUtilities.export_renderers)
                //             });
                //     });
                // });
                Master_Data_Rekon.list().then(function(responsev){
                    var datax = responsev.data;
                    $(function(){
                        $("#output").pivotUI(
                            datax, {
                                rows: ["jenis_layanan"],
                                cols: ["nama_unit"],
                                vals: ["total"],
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