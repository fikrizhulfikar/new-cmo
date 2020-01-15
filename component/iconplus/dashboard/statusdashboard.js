define([
    'component/system/index'
], function(){
    alt.factory('Dashboard_Status', ['System', '$log', '$q', function(System, $log, $q){
        var api = System('dashboard/statusdashboard');

        return api;
    }]);
});