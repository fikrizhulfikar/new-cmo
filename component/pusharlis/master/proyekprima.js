define([
    'component/system/index'
], function(){
    alt.factory('Pusharlis_Master_Proyekprima', ['System', '$log', '$q', function(System, $log, $q){
        var api = System('master/proyekprima');

        api.table = function(data){
            return this.connect('table', data);
        };
        
        return api;
    }]);
});