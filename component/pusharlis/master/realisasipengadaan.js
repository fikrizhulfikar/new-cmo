define([
    'component/system/index'
], function(){
    alt.factory('Pusharlis_Realisasipengadaan', ['System', '$log', '$q', function(System, $log, $q){
        var api = System('master/realisasipengadaan');

        api.insert = function(data){
            return this.connect('insert', data);
        };

        api.retrieve = function(data){
            return this.connect('retrieve', data);
        };

        api.list = function(data){
            return this.connect('list', data);
        };

        api.update = function(data){
            return this.connect('update', data);
        };

        api.get = function(data){
            return this.connect('get', data);
        };

        return api;
    }]);
});