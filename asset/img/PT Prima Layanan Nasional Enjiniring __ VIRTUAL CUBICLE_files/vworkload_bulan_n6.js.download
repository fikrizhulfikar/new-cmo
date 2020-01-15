define([
    'component/system/index'
], function(){
    alt.factory('Master_vWorkload_Bulan_n6', ['System', '$log', '$q', function(System, $log, $q){
        var api = System('master/vworkloadbulann6');

        api.table = function(data){
            return this.connect('table', data);
        };

        return api;
    }]);
});