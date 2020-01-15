define([
    'component/system/index'
], function(){
    alt.factory('Master_Temp_Pemeriksaan_QC', ['System', '$log', '$q', function(System, $log, $q){
        var api = System('master/temppemeriksaanqc');

        return api;
    }]);
});