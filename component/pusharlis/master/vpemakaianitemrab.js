define([
    'component/system/index'
], function(){
    alt.factory('Master_Pemakaian_Rab', ['System', '$log', '$q', function(System, $log, $q){
        var api = System('master/pemakaianitemrab');

        api.table = function(data){
            return this.connect('table', data);
        };

        api.retrieve = function(data){
            return this.connect('retrieve', data);
        };

        api.list = function(data){
            return this.connect('list', data);
        };

        api.listpengeluarantotalrab = function(data){
            return this.connect('listpengeluarantotalrab', data);
        };

        api.keyval = function(data){
            return this.connect('keyval', data);
        };

        return api;
    }]);
});