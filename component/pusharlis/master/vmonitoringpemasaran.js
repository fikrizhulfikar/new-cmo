define([
    'component/system/index'
], function(){
    alt.factory('View_Monitoring_Pemasaran', ['System', '$log', '$q', function(System, $log, $q){
        var api = System('master/vmonitoringpemasaran');

        api.table = function(data){
            return this.connect('table', data);
        };

        api.list = function(data){
            return this.connect('list', data);
        };

        return api;
    }]);
});