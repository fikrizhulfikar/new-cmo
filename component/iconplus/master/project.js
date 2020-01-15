define([
    'component/system/index'
], function(){
    alt.factory('Iconplus_Master_Project', ['System', '$log', '$q', function(System, $log, $q){
        var api = System('master/project');

        api.table = function(data){
            return this.connect('table', data);
        };
        api.insert = function(data){
            return this.connect('insert', data);
        };
        api.delete = function(data){
            return this.connect('delete', data);
        };

        api.update = function(data){
            return this.connect('update', data);
        };
        api.list = function(data){
            return this.connect('list', data);
        };

        api.keyval = function(data){
            return this.connect('keyval', data);
        };
        api.retrieve = function(data){
            return this.connect('retrieve', data);
        };
        
        return api;
    }]);
});