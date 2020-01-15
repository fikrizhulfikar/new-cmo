define([
    'asset/lib/moment/min/moment-with-locales.min',
    'component/alt/button/service',
    'component/pusharlis/master/vmonitoringpemasaran',
    'component/pusharlis/generatedoc',
    'component/pusharlis/master/vmonitoringenjiniring'
], function(moment){
    return [
        '$scope', '$routeParams', '$log', '$button', '$validate', '$alert', '$window', 'View_Monitoring_Pemasaran', 'View_Monitoring_Enjiniring',  'Pusharlis_Generatedoc',
        function($scope, $routeParams, $log, $button, $validate, $alert, $window, View_Monitoring_Pemasaran, View_Monitoring_Enjiniring, Pusharlis_Generatedoc){
            $scope.moment = moment;
            $scope.action = $routeParams.action;
            $scope.title = 'Lihat';

            // pills step
            $scope.pills = {
                steps: [
                    { title: "PEMASARAN" },
                    { title: "ENJINIRING" }
                ],
                onselect: function(currentid, previousid){}
            };
            $scope.data = {};
            View_Monitoring_Enjiniring.list({id_penugasan: "= " + $routeParams.processInstanceId}).then(response => {
                $scope.data.enjiniring = response.data;
            });

            View_Monitoring_Pemasaran.list({id_penugasan: "= " + $routeParams.penugasanid, order: "nourut asc"}).then(response => {
                $scope.data.pemasaran = response.data;
            });

            // data
            $scope.data = {
                id : $routeParams.id
            };

            $scope.btncancel = $button('back',{
                href: alt.baseUrl + 'monitoring/status/list'
            });

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
                    $scope.cetak.chargecode = "A.I1.2.18.002";

                    Pusharlis_Generatedoc.chargecode($scope.cetak).then(function(response) {
                        $window.location.href = alt.serverUrl + response.data;
                    });
            }});
        }
    ];
});