define([
    'component/system/index'
], function(){
    alt.factory('Pusharlis_Rencanapekerjaan', ['System', '$log', '$q', function(System, $log, $q){
        var api = System('master/rencanapekerjaan');

        api.insert = function(data){
            return this.connect('insert', data, {ismultipart: true});
        };

        api.retrieve = function(data){
            return this.connect('retrieve', data);
        };

        api.update= function(data){
            return this.connect('update', data);
        };

        return api;
    }]);
});