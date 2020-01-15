define([
    'component/system/index'
], function(){
    alt.factory('Iconplus_View_Sfc', ['System', '$log', '$q', function(System, $log, $q){
        var api = System('view/viewsfc');

        api.table = function(data){
            return this.connect('table', data);
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

        api.remove = function(data){
            return this.connect('delete', data);
         };
        return api;
    }]);
});