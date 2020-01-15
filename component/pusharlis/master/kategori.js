define([
    'component/system/index'
], function(){
    alt.factory('Pusharlis_Master_Kategori', ['System', '$log', '$q', function(System, $log, $q){
        var api = System('master/category');

        api.table = function(data){
            return this.connect('table', data);
        };

        return api;
    }]);
});