define([
    'component/system/index'
], function(){
    alt.factory('Pusharlis_Setup_DR_Baru', ['System', '$log', '$q', function(System, $log, $q){
        var api = System('master/setupdrbaru');

        api.table = function(data){
            return this.connect('table', data);
        };

        api.list = function(data){
            return this.connect('list', data);
        };

        api.insertorupdate = function(data){
            return this.connect('insertorupdate', data);
        };

        api.keyval = function(data){
            return this.connect('keyval', data);
        };

        api.retrievesetupdr = function(data){
            return this.connect('retrievesetupdr', data);
        };

        api.retrieve = function(data){
            return this.connect('retrieve', data);
        };

        api.getpegawai = function(data){
            return this.connect('getpegawai', data);
        };

        return api;
    }]);
});