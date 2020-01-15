define([
    'component/system/index'
], function(){
    alt.factory('Iconplus_Rekap_Laporan', ['System', '$log', '$q', function(System, $log, $q){
        var api = System('master/rekaplaporan');

        api.table = function(data){
            return this.connect('table', data);
        };

        api.list = function(data){
            return this.connect('list', data);
        };

        api.keyval = function(data){
            return this.connect('keyval', data);
        };

        api.update_rekap = function(data){
            return this.connect('update_rekap', data);
        };

        return api;
    }]);
});