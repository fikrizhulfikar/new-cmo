define([
    'component/system/index'
], function(){
    alt.factory('Pusharlis_Master_Type', ['System', '$log', '$q', function(System, $log, $q){
        var api = System('master/type');

        api.table = function(data){
            return this.connect('table', data);
        };

        return api;
    }]);
});