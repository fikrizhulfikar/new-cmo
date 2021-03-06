define([
    'component/system/index'
], function(){
    alt.factory('View_Monitoring_Enjiniring', ['System', '$log', '$q', function(System, $log, $q){
        var api = System('master/vmonitoringenjiniring');

        api.table = function(data){
            return this.connect('table', data);
        };

        api.list = function(data){
            return this.connect('list', data);
        };

        return api;
    }]);
});