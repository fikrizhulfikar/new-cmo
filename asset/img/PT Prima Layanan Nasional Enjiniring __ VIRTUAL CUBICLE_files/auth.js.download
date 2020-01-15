define([
    'component/system/index'
], function(){
    alt.factory('System_Auth', ['System', '$log', '$q', function(System, $log, $q){
        var api = System('system/auth');

        api.login = function(data){
            return this.connect('login', data);
        };

        api.logout = function(data){
            return this.connect('logout', data);
        };

        return api;
    }]);
});