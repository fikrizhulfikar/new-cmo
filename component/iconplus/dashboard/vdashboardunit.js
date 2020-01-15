define([
    'component/system/index'
], function(){
    alt.factory('Dashboard_Unit', ['System', '$log', '$q', function(System, $log, $q){
        var api = System('dashboard/vdashboardunit');

        return api;
    }]);
});