define([
    'component/system/index'
], function(){
    alt.factory('Pusharlis_Purchasing_Line', ['System', '$log', '$q', function(System, $log, $q){
        var api = System('master/purchasingline');

        api.table = function(data){
            return this.connect('table', data);
        };

        api.list = function(data){
            return this.connect('list', data);
        };

        api.listwithsettlement = function(data){
            return this.connect('listwithsettlement', data);
        };

        api.retrieve = function(data){
            return this.connect('retrieve', data);
        };

        api.insert = function(data){
            return this.connect('insert', data);
        };

        api.update = function(data){
            return this.connect('update', data);
        };

        api.remove = function(data){
            return this.connect('remove', data);
        };

        api.keyval = function(data){
            return this.connect('keyval', data);
        };

        return api;
    }]);
});