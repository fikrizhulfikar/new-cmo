define([
    'component/system/index'
], function(){
    alt.factory('Master_Casettlement_PurchasingHeader', ['System', '$log', '$q', function(System, $log, $q){
        var api = System('master/casettlementPurchasingHeader');

        api.table = function(data){
            return this.connect('table', data);
        };
        api.list = function(data){
            return this.connect('list', data);
        };

        api.insert = function(data){
            return this.connect('insert', data);
        };

        api.update = function(data){
            return this.connect('update', data);
        };

        api.updatestatus = function(data){
            return this.connect('updatestatus', data);
        };

        return api;
    }]);
});