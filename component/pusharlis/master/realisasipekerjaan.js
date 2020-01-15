define([
    'component/system/index'
], function(){
    alt.factory('Pusharlis_Realisasipekerjaan', ['System', '$log', '$q', function(System, $log, $q){
        var api = System('master/realisasipekerjaan');

        api.insert = function(data){
            return this.connect('insert', data, {ismultipart: true});
        };

        api.retrieve = function(data){
            return this.connect('retrieve', data);
        };

        api.list = function(data){
            return this.connect('list', data);
        };

        api.get = function(data){
            return this.connect('get', data);
        };

        api.update= function(data){
            return this.connect('update', data, {ismultipart: true});
        };
        return api;
    }]);
});