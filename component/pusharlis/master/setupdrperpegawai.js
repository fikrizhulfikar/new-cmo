define([
    'component/system/index'
], function(){
    alt.factory('Master_Setup_DR_Perpegawai', ['System', '$log', '$q', function(System, $log, $q){
        var api = System('master/setupdrperpegawai');

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