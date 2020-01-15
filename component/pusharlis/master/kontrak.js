define([
    'component/system/index'
], function(){
    alt.factory('Pusharlis_Master_Kontrak', ['System', '$log', '$q', function(System, $log, $q){
        var api = System('master/kontrak');

        api.table = function(data){
            return this.connect('table', data);
        };

        api.insert = function(data){
            return this.connect('insert', data, {ismultipart: true});
        };

        api.update = function(data){
            return this.connect('update', data, {ismultipart: true});
        };

        api.amandemen = function(data){
            return this.connect('amandemen', data, {ismultipart: true});
        };

        return api;
    }]);
});