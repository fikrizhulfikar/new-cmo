define([
    "component/system/index"
], function(){
    alt.factory("Cmis_Dir", ["System", "$log", "$q" ,function(System, $log, $q){
        var api = System("cmis/dir", "id");

        api.table = function(data){
            return this.connect("table", data);
        };

        return api;
    }]);
});