define([
    "component/system/index"
], function(){
    alt.factory("Alf_Sites", ["System", "$log", "$q" ,function(System, $log, $q){
        var api = System("alfresco/sites");

        api.table = function(data){
            return this.connect("table", data);
        };

        api.createSite = function(data){
            return this.connect("createSite", data);
        };

        return api;
    }]);
});