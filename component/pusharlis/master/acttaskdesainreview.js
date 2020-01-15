define([
    'component/system/index'
], function(){
    alt.factory('Master_Act_Task_Desain_Review', ['System', '$log', '$q', function(System, $log, $q){
        var api = System('master/acttaskdesainreview');

        api.table = function(data){
            return this.connect('table', data);
        };

        api.tablemonitoring = function(data){
            return this.connect('tablemonitoring', data);
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