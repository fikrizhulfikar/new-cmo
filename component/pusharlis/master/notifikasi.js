define([
    'component/system/index'
], function(){
    alt.factory('Pusharlis_Master_Notifikasi', ['System', '$log', '$q', function(System, $log, $q){
        var api = System('master/notifikasi');

        return api;
    }]);
});