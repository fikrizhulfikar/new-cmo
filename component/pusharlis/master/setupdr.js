define([
    'component/system/index'
], function(){
    alt.factory('Master_SetupDR', ['System', '$log', '$q', function(System, $log, $q){
        var api = System('master/setupdr');

        api.retrive = function(data){
            return this.connect('retrive', data);
        };

        api.insertorupdate = function(data){
            return this.connect('insertorupdate', data);
        };

        return api;
    }]);
});