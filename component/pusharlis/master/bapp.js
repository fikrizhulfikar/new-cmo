define([
    'component/system/index'
], function(){
    alt.factory('Pusharlis_Master_Bapp', ['System', '$log', '$q', function(System, $log, $q){
        var api = System('master/bapp');

        api.table = function(data){
            return this.connect('table', data);
        };

        api.insert = function(data){
            return this.connect('insert', data, {ismultipart: true});
        };

        api.update = function(data){
            return this.connect('update', data, {ismultipart: true});
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