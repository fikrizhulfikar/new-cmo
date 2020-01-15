define([
    'component/system/index'
], function(){
    alt.factory('Master_SapBudget', ['System', '$log', '$q', function(System, $log, $q){
        var api = System('master/sapbudget');

        api.table = function(data){
            return this.connect('table', data);
        };

        api.list = function(data){
            return this.connect('list', data);
        };

        api.keyval = function(data){
            return this.connect('keyval', data);
        };

        api.insert = function(data){
            return this.connect('insert', data);
        };

        return api;
    }]);
});