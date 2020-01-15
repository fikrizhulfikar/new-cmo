define([
    'component/system/index'
], function(){
    alt.factory('System_User_Usergroup', ['System', '$log', '$q', function(System, $log, $q){
        var api = System('system/usergroup');

        api.table = function(data){
            return this.connect('table', data);
        };

        api.keyval = function(data){
            return this.connect('keyval', data);
        };

        return api;
    }]);
});