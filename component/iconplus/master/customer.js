define([
    'component/system/index'
], function(){
    alt.factory('Iconplus_Master_Customer', ['System', '$log', '$q', function(System, $log, $q){
        var api = System('master/customer');

        api.table = function(data){
            return this.connect('table', data);
        };

        return api;
    }]);
});