
define([
    'component/system/index'
], function(){
    alt.factory('System_User', ['System', '$log', '$q', function(System, $log, $q){
        var api = System('system/user');

        api.table = function(data){
            return this.connect('table', data);
        };

        api.list = function(data){
            return this.connect('list', data);
        };

        api.remove = function(data){
            return this.connect('delete', data);
        };

        api.retrievebyusername = function(data){
            return this.connect('retrievebyusername', data);
        };

        api.chpass = function(data){
            return this.connect('chpass', data);
        };

        return api;
    }]);
});