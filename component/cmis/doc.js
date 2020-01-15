define([
    "component/system/index"
], function(){
    alt.factory("Cmis_Doc", ["System", "$log", "$q" ,function(System, $log, $q){
        var api = System("cmis/doc", "id");

        api.table = function(data){
            return this.connect("table", data);
        };

        return api;
    }]);
});