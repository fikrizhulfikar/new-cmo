define([
    'component/system/index'
], function(){
    alt.factory('Dashboard_Regional', ['System', '$log', '$q', function(System, $log, $q){
        var api = System('dashboard/vdashboardregional');

        return api;
    }]);
});