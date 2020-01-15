define([
    'component/system/index'
], function(){
    alt.factory('Pusharlis_VRealisasi_Biaya_Bln', ['System', '$log', '$q', function(System, $log, $q){
        var api = System('master/realisasibiayabln');

        api.table = function(data){
            return this.connect('table', data);
        };
        api.list = function(data){
            return this.connect('list', data);
        };

        api.insert = function(data){
            return this.connect('insert', data, {ismultipart: true});
        };

        api.update = function(data){
            return this.connect('update', data, {ismultipart: true});
        };

        return api;
    }]);
});