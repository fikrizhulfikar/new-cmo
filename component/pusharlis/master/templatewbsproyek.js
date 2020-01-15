define([
    'component/system/index'
], function(){
    alt.factory('Pusharlis_Master_Template_Wbs_Proyek', ['System', '$log', '$q', function(System, $log, $q){
        var api = System('master/templatewbsproyek');
        
        api.update = function(data){
            return this.connect('update', data, {ismultipart: true});
        };
        
        api.insert = function(data){
            return this.connect('insert', data, {ismultipart: true});
        };

        api.table = function(data){
            return this.connect('table', data);
        };
        
        return api;
    }]);
});