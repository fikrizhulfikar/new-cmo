define([
    'component/system/index'
], function(){
    alt.factory('Integ_Ap2t', ['System', '$log', '$q', function(System, $log, $q){
        var api = System('integ/ap2t');

        api.getDataPelangganByIdpel = function(data){
            return this.connect('getDataPelangganByIdpel', data);
        };
        return api;
    }]);
});