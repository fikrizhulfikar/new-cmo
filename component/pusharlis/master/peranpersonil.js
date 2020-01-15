define([
    'component/system/index'
], function(){
    alt.factory('Master_Peran_Personil', ['System', '$log', '$q', function(System, $log, $q){
        var api = System('master/peranpersonil');

        api.table = function(data){
            return this.connect('table', data);
        };

        return api;
    }]);
});