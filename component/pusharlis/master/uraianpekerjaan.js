define([
    'component/system/index'
], function(){
    alt.factory('Pusharlis_Master_Uraianpekerjaan', ['System', '$log', '$q', function(System, $log, $q){
        var api = System('master/uraianpekerjaan');

        api.insert = function(data){
            return this.connect('insert', data);
        };

        api.retrieve = function(data){
            return this.connect('retrieve', data);
        };

        return api;
    }]);
});