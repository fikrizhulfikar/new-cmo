define([
    'component/system/index'
], function(){
    alt.factory('Dashboard_Sumber_Data', ['System', '$log', '$q', function(System, $log, $q){
        var api = System('master/vsumberdata');

        return api;
    }]);
});