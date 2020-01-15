define([
    'component/system/index'
], function(){
    alt.factory('Iconplus_Master_Act_Task_Po', ['System', '$log', '$q', function(System, $log, $q){
        var api = System('master/acttaskpo');

        api.table = function(data){
            return this.connect('table', data);
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