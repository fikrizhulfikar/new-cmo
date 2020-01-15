define([
    'component/system/index'
], function(){
    alt.factory('Genarete_Produk', ['System', '$log', '$q', function(System, $log, $q){
        var api = System('master/generateproduk');

        api.produk = function(data){
            return this.connect('produk', data);
        };

        api.list = function(data){
            return this.connect('list', data);
        };

        api.keyval = function(data){
            return this.connect('keyval', data);
        };

        return api;
    }]);
});