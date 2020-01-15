define([
    'component/system/index'
], function(){
    alt.factory('VPembubaran_Timpro', ['System', '$log', '$q', function(System, $log, $q){
        var api = System('master/vpembubarantimpro');

        api.table = function(data){
            return this.connect('table', data);
        };

        api.tablemonitoring = function(data){
            return this.connect('tablemonitoring', data);
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