define([
    'component/system/index'
], function(){
    alt.factory('Master_Item_Rab', ['System', '$log', '$q', function(System, $log, $q){
        var api = System('master/itemrab');

        api.table = function(data){
            return this.connect('table', data);
        };

        api.retrieve = function(data){
            return this.connect('retrieve', data);
        };

        api.insert = function(data){
            return this.connect('insert', data);
        };
        
        api.list = function(data){
            return this.connect('list', data);
        };

        api.count = function(data){
            return this.connect('count', data);
        };
        
        api.delete = function(data) {
            return this.connect('delete', data);  
        };
        
        return api;
    }]);
});