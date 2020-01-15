define([
    'component/system/index'
], function(){
    alt.factory('Iconplus_Master_PersediaanBatubara', ['System', '$log', '$q', function(System, $log, $q){
        var api = System('master/persediaanbatubara');

        api.table = function(data){
            return this.connect('table', data);
        };

        api.list = function(data){
            return this.connect('list', data);
        };

        api.keyval = function(data){
            return this.connect('keyval', data);
        };

        api.insert = function(data){
            return this.connect('insert', data);
        };

        api.upload = function(data){
            return this.connect('upload', data);
        };
        api.uploadreal = function(data){
            return this.connect('uploadreal', data);
        };
        api.retrieve = function(data){
            return this.connect('retrieve', data);
        };

        return api;
    }]);
});