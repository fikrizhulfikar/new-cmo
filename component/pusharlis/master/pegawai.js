define([
    'component/system/index'
], function(){
    alt.factory('Pusharlis_Master_Pegawai', ['System', '$log', '$q', function(System, $log, $q){
        var api = System('master/pegawai');

        api.table = function(data){
            return this.connect('table', data);
        };

        api.keyval = function(data){
            return this.connect('keyval', data);
        };

        return api;
    }]);
});