define([
    'component/system/index'
], function(){
    alt.factory('Pusharlis_Master_Nomor_Proyek', ['System', '$log', '$q', function(System, $log, $q){
        var api = System('master/nomorproyek');

        api.getNextNumber = function(data){
            return this.connect('getNextNumber', data);
        };

        return api;
    }]);
});