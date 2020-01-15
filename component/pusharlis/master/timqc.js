define([
    'component/system/index'
], function(){
    alt.factory('Master_Tim_QC', ['System', '$log', '$q', function(System, $log, $q){
        var api = System('master/timqc');

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

        return api;
    }]);
});