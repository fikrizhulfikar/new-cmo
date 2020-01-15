define([
    'component/system/index'
], function(){
    alt.factory('Pusharlis_Master_Template_Word', ['System', '$log', '$q', function(System, $log, $q){
        var api = System('master/templateword');

        api.update = function(data){
            return this.connect('update', data, {ismultipart: true});
        };

        api.table = function(data){
            return this.connect('table', data);
        };

        return api;
    }]);
});