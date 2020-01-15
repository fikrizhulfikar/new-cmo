define([
    'component/system/index'
], function(){
    alt.factory('Iconplus_Sap', ['System', '$log', '$q', function(System, $log, $q){
        var api = System('sap/master');

        api.getmetthod = function(data){
            return this.connect('getmetthod', data);
        };

        api.postrab = function(data){
            return this.connect('postrab', data);
        };

        return api;
    }]);
});