define([
    'component/system/index'
], function(){
    alt.factory('Pusharlis_Master_Amandemen_Kontrak', ['System', '$log', '$q', function(System, $log, $q){
        var api = System('master/amandemenkontrak');

        api.table = function(data){
            return this.connect('table', data);
        };

        api.insert = function(data){
            return this.connect('insert', data, {ismultipart: true});
        };

        api.update = function(data){
            return this.connect('update', data, {ismultipart: true});
        };

        api.listchargecode = function(data){
            return this.connect('listchargecode', data);
        };

        api.listchargecode = function(data){
            return this.connect('listchargecode', data);
        };

        api.insertkontrakasli = function(data){
            return this.connect('insertkontrakasli', data);
        };

        return api;
    }]);
});