define([
    'component/system/index'
], function(){
    alt.factory('Pusharlis_Master_Manufaktur', ['System', '$log', '$q', function(System, $log, $q){
        var api = System('master/manufaktur');

        api.peruwp = function(data){
            return this.connect('peruwp', data);
        };

        return api;
    }]);
});