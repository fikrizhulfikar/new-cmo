define([
    'component/system/index'
], function(){
    alt.factory('Master_Revisi_DPD', ['System', '$log', '$q', function(System, $log, $q){
        var api = System('master/revisidpd');

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

        api.insertorupdate = function(data){
            return this.connect('insertorupdate', data);
        };

        api.update = function(data){
            return this.connect('update', data, {ismultipart: true});
        };

        return api;
    }]);
});