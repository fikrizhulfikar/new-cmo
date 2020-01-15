define([
    'component/system/index'
], function(){
    alt.factory('Integ_Soap', ['System', '$log', '$q', function(System, $log, $q){
        var api = System('integ/soap');

        api.getDataByIdPelNoMeter = function(data){
            return this.connect('getDataByIdPelNoMeter', data);
        };
        api.list = function(data){
            return this.connect('list', data);
        };
        api.keyval = function(data){
            return this.connect('keyval', data);
        };
        return api;
    }]);
});