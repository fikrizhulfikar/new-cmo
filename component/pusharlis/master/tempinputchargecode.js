define([
    'component/system/index'
], function(){
    alt.factory('Master_Temp_Input_Chargecode', ['System', '$log', '$q', function(System, $log, $q){
        var api = System('master/tempinputchargecode');

        api.table = function(data){
            return this.connect('table', data);
        };

        api.list = function(data){
            return this.connect('list', data);
        };

        api.keyval = function(data){
            return this.connect('keyval', data);
        };

        api.insert = function(data){
            return this.connect('insert', data);
        };

        api.update = function(data){
            return this.connect('update', data);
        };

        api.delete = function(data){
            return this.connect('delete', data);
        };

        return api;
    }]);
});