/**
 * Created by adm.gilang on 25/06/2018.
 */

define([
    'component/system/index'
], function(){
    alt.factory('Iconplus_Master_Permohonan', ['System', '$log', '$q', function(System, $log, $q){
        var api = System('master/permohonan');

        api.table = function(data){
            return this.connect('table', data);
        };

        api.list = function(data){
            return this.connect('list', data);
        };

        api.keyval = function(data){
            return this.connect('keyval', data);
        };

        return api;
    }]);
});