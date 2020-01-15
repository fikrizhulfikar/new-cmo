define([
    'component/system/index'
], function(){
    alt.factory('Master_List_Desain', ['System', '$log', '$q', function(System, $log, $q){
        var api = System('master/vlistdesain');

        api.list = function(data){
            return this.connect('list', data);
        };

        api.table = function(data){
            return this.connect('table', data);
        };

        api.delete = function(data){
            return this.connect('delete', data);
        };

        return api;
    }]);
});