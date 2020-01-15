define([
    'component/system/index'
], function(){
    alt.factory('Pusharlis_Purchasing_Header', ['System', '$log', '$q', function(System, $log, $q){
        var api = System('master/purchasingheader');

        api.table = function(data){
            return this.connect('table', data);
        };

        api.list = function(data){
            return this.connect('list', data);
        };

        api.retrieve = function(data){
            return this.connect('retrieve', data);
        };

        api.insert = function(data){
            return this.connect('insert', data, {ismultipart: true});
        };

        api.update = function(data){
            return this.connect('update', data, {ismultipart: true});
        };

        api.updategrandtotal = function(data){
            return this.connect('updategrandtotal', data, {ismultipart: true});
        };

        api.updatestatus = function(data){
            return this.connect('updatestatus', data);
        };

        api.delete = function(data){
            return this.connect('delete', data);
        };

        api.keyval = function(data){
            return this.connect('keyval', data);
        };

        return api;
    }]);
});