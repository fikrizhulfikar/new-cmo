define([
    'component/system/index'
], function(){
    alt.factory('Activiti_Process', ['System', '$log', '$q' ,function(System, $log, $q){
        var api = System('workflow/process', 'id');

        api.table = function(data){
            return this.connect('table', data);
        };

        api.save = function(data){
            return this.connect('save', data);
        };

        api.task = function(data){
            return this.connect('task', data);
        };

        return api;
    }]);
});