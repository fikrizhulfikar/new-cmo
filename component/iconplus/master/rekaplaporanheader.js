define([
    'component/system/index'
], function(){
    alt.factory('Iconplus_Rekap_Laporan_Header', ['System', '$log', '$q', function(System, $log, $q){
        var api = System('master/rekaplaporanheader');

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

        api.update = function(data){
            return this.connect('update', data);
        };

        return api;
    }]);
});