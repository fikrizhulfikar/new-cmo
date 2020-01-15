define([
    'component/system/index'
], function(){
    alt.factory('Pusharlis_Master_Expense', ['System', '$log', '$q', function(System, $log, $q){
        var api = System('master/expense');

        api.table = function(data){
            return this.connect('table', data);
        };
        api.list = function(data){
            return this.connect('list', data);
        };

        api.insert = function(data){
            return this.connect('insert', data, {ismultipart: true});
        };

        api.update = function(data){
            return this.connect('update', data, {ismultipart: true});
        };

        api.getkwitansi = function(data){
            return this.connect('getkwitansi', data, {ismultipart: true});
        };

        api.updatestatus = function(data){
            return this.connect('updatestatus', data);
        };

        api.listwithpemakaianrab = function(data){
            return this.connect('listwithpemakaianrab', data);
        };

        return api;
    }]);
});