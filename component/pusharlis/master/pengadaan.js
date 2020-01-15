define([
    'component/system/index'
], function(){
    alt.factory('Pusharlis_Master_Pengadaan', ['System', '$log', '$q', function(System, $log, $q){
        var api = System('workflow/pengadaan');

        api.table = function(data){
            return this.connect('table', data);
        };

        api.insert = function(data){
            return this.connect('insert', data, {ismultipart: true});
        };

        api.update = function(data){
            return this.connect('update', data, {ismultipart: true});
        };

        return api;
    }]);
});