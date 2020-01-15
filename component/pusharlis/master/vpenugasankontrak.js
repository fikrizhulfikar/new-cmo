define([
    'component/system/index'
], function(){
    alt.factory('Pusharlis_Master_Penugasan_Kontrak', ['System', '$log', '$q', function(System, $log, $q){
        var api = System('master/viewpenugasankontrak');

        api.table = function(data){
            return this.connect('table', data);
        };

        api.list = function(data){
            return this.connect('list', data);
        };

        return api;
    }]);
});