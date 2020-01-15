define([
    'component/system/index'
], function(){
    alt.factory('Dashboard_Status_Penugasan', ['System', '$log', '$q', function(System, $log, $q){
        var api = System('dashboard/vstatuspenugasan');

        return api;
    }]);
});