define([
    'component/system/index'
], function(){
    alt.factory('Activiti_Task', ['System', '$log', '$q' ,function(System, $log, $q){
        var api = System('workflow/task', 'id');

        api.table = function(data){
            return this.connect('table', data);
        };

        api.history = function(data){
            return this.connect('history', data);
        };

        api.save = function(data){
            return this.connect('save', data, {ismultipart: true});
        };

        api.complete = function(data){
            return this.connect('complete', data,{ismultipart: true});
        };

        api.correct = function(data){
            return this.connect('correct', data,{ismultipart: true});
        };

        api.deleteHistory = function(data){
            return this.connect('deleteHistory', data);
        };

        return api;
    }]);
});