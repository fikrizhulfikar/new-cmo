define([
    'component/system/index'
], function(){
    alt.factory('Monitoring_Waktu', ['System', '$log', '$q', function(System, $log, $q){
        var api = System('master/vmonitoringwaktu');

        api.table = function(data){
            return this.connect('table', data);
        };

        api.keyval = function(data){
            return this.connect('keyval', data);
        };

        return api;
    }]);
});