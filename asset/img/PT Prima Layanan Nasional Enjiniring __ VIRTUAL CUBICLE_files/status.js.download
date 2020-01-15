define([
    'component/system/index'
], function(){
    alt.factory('Iconplus_Master_Status', ['System', '$log', '$q', function(System, $log, $q){
        var api = System('master/status');

        api.table = function(data){
            return this.connect('table', data);
        };

        api.retrieve = function(data){
            return this.connect('retrieve', data);
        };

        return api;
    }]);
});