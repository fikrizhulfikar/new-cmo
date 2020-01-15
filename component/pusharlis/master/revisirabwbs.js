define([
    'component/system/index'
], function(){
    alt.factory('Pusharlis_Master_Revisi_RabWbs', ['System', '$log', '$q', function(System, $log, $q){
        var api = System('master/revisirabwbs');

        api.table = function(data){
            return this.connect('table', data);
        };

        api.list = function(data){
            return this.connect('list', data);
        };

        api.keyval = function(data){
            return this.connect('keyval', data);
        };

        api.retrieve = function(data){
            return this.connect('retrieve', data);
        };

        api.update = function(data){
            return this.connect('update', data, {ismultipart: true});
        };

        api.insertorupdate = function(data){
            return this.connect('insertorupdate', data);
        };

        return api;
    }]);
});