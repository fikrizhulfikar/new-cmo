define([
    'component/system/index'
], function(){
    alt.factory('Iconplus_Generatedoc', ['System', '$log', '$q', function(System, $log, $q){
        var api = System('generatedoc');


        api.sktim = function(data){
            return this.connect('sktim', data);
        };


        return api;
    }]);
});