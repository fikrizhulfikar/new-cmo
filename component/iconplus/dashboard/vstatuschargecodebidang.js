define([
    'component/system/index'
], function(){
    alt.factory('Dashboard_Status_Chargecode_Bidang', ['System', '$log', '$q', function(System, $log, $q){
        var api = System('dashboard/vstatuschargecodebidang');

        return api;
    }]);
});