define([
    'component/system/index'
], function(){
    alt.factory('Pusharlis_Rencanapekerjaanuwp', ['System', '$log', '$q', function(System, $log, $q){
        var api = System('master/rencanapekerjaanuwp');

        api.insert = function(data){
            return this.connect('insert', data, {ismultipart: true});
        };

        api.retrieve = function(data){
            return this.connect('retrieve', data);
        };

        api.update= function(data){
            return this.connect('update', data);
        };

        api.list = function(data){
            return this.connect('list', data);
        };
        
        return api;
    }]);
});