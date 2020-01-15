define([
    'component/system/index'
], function(){
    alt.factory('Master_Trx_Permohonan_Baru', ['System', '$log', '$q', function(System, $log, $q){
        var api = System('master/trxpermohonanbaru');

        api.table = function(data){
            return this.connect('table', data);
        };

        api.delete = function(data){
            return this.connect('delete', data);
        };
        
        return api;
    }]);
});