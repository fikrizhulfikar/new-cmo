define([
    'component/system/index'
], function(){
    alt.factory('Template_Produk', ['System', '$log', '$q', function(System, $log, $q){
        var api = System('master/templateproduk');

        api.table = function(data){
            return this.connect('table', data);
        };

        api.list = function(data){
            return this.connect('list', data);
        };

        api.keyval = function(data){
            return this.connect('keyval', data);
        };

        api.delete = function(data){
            return this.connect('delete', data);
        };

        api.update = function(data){
            return this.connect('update', data);
        };


        return api;
    }]);
});