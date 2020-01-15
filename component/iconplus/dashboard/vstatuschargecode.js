define([
    'component/system/index'
], function(){
    alt.factory('Dashboard_Status_Chargecode', ['System', '$log', '$q', function(System, $log, $q){
        var api = System('dashboard/vstatuschargecode');

        return api;
    }]);
});