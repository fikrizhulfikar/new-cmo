define([
    'component/system/index'
], function(){
    alt.factory('Pembubaran_Timpro', ['System', '$log', '$q', function(System, $log, $q){
        var api = System('master/pembubarantimpro');

        api.insert = function(data){
            return this.connect('insert', data);
        };

        api.retrieve = function(data){
            return this.connect('retrieve', data);
        };

        return api;
    }]);
});