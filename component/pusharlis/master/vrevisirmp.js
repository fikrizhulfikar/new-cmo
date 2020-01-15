define([
    'component/system/index'
], function(){
    alt.factory('Master_VRevisi_RMP', ['System', '$log', '$q', function(System, $log, $q){
        var api = System('master/vrevisirmp');

        api.table = function(data){
            return this.connect('table', data);
        };

        api.list = function(data){
            return this.connect('list', data);
        };

        api.keyval = function(data){
            return this.connect('keyval', data);
        };

        return api;
    }]);
});