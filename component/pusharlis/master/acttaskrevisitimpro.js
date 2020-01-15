define([
    'component/system/index'
], function(){
    alt.factory('Master_Act_Task_Revisi_Timpro', ['System', '$log', '$q', function(System, $log, $q){
        var api = System('master/acttaskrevisitimpro');

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