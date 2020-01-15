define([
    'component/system/index'
], function(){
    alt.factory('Pusharlis_Master_Template_Rab', ['System', '$log', '$q', function(System, $log, $q){
        var api = System('master/templaterab');

        api.table = function(data){
            return this.connect('table', data);
        };

        api.delete = function(data){
            return this.connect('delete', data);
        };
        
        return api;
    }]);
});