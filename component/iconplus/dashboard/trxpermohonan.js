define([
    'component/system/index'
], function(){
    alt.factory('Trx_Permohonan', ['System', '$log', '$q', function(System, $log, $q){
        var api = System('master/trxpermohonan');

        return api;
    }]);
});