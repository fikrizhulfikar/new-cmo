define([
    'component/system/index'
], function(){
    alt.factory('Dashboard_Status_Proyek_Kontrak', ['System', '$log', '$q', function(System, $log, $q){
        var api = System('dashboard/vstatusproyekkontrak');

        return api;
    }]);
});