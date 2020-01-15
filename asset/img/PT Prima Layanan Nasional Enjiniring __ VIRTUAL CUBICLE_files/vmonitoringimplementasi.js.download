define([
    'component/system/index'
], function(){
    alt.factory('V_monitoring_implementasi', ['System', '$log', '$q', function(System, $log, $q){
        var api = System('master/vmonitoringimplementasi');

        api.table = function(data){
            return this.connect('table', data);
        };

        api.insert = function(data){
            return this.connect('insert', data, {ismultipart: true});
        };

        api.update = function(data){
            return this.connect('update', data, {ismultipart: true});
        };

        return api;
    }]);
});