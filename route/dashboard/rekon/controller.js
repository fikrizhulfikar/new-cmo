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
    'component/iconplus/master/vmasterdatarekon'
], function(moment,accounting){
    return ['$scope', '$timeout', '$routeParams', '$button', '$log', '$auth', '$notification',
        'Master_Data_Rekon',
        function($scope, $timeout, $routeParams, $button, $log, $auth,$notification,
                 Master_Data_Rekon){

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

            $scope.$watchGroup(["cari.tahun"], function (val) {
                if(val) {
                    $scope.periode = moment($scope.cari.tahun).format('YYYYMM');
                    $scope.reload();
                }
                // // console.log(datatahun);
                // // console.log(unit);
            });


            $scope.reload = function(){
                Master_Data_Rekon.list({select : "jenis_layanan, sum(jumlah) jumlah, sum(total) total",
                    where  : "THBLLAP = 201812",
                    group  : "JENIS_LAYANAN",
                    order : "jenis_layanan"}).then(function(response){
                    var data = response.data;

                    for(var i = 1; i <= 1; i++){
                        if(!$scope['chart' + i]) $scope['chart' + i] = {
                            data: response.data
                        };
                        else if($scope['chart' + i].reload){
                            $scope['chart' + i].data = response.data;
                            $scope['chart' + i].reload();
                        }
                    }
                });
                Master_Data_Rekon.list({thbllap:201812}).then(function(responsev){
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