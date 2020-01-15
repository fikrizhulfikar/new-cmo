define([
    'component/system/index'
], function(){
    alt.factory('VDashboard_Rekap', ['System', '$log', '$q', function(System, $log, $q){
        var api = System('dashboard/vdashboardrekap');

        return api;
    }]);
});