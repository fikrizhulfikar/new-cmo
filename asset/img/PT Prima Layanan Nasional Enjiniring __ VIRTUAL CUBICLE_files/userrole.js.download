define([
    'component/system/index'
], function(){
    alt.factory('System_User_Userrole', ['System', '$log', '$q', function(System, $log, $q){
        var api = System('user/userrole');

        api.table = function(data){
            return this.connect('table', data);
        };

        return api;
    }]);
});