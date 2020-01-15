define([
    'component/system/index'
], function(){
    alt.factory('Iconplus_Input_Sfc', ['System', '$log', '$q', function(System, $log, $q){
        var api = System('master/sfcinput');

        api.table = function(data){
            return this.connect('table', data);
        };

        api.remove = function(data){
            return this.connect('delete', data);
        };

        return api;
    }]);
});