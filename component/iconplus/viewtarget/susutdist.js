define([
    'component/system/index'
], function(){
    alt.factory('Iconplus_View_SusutDist', ['System', '$log', '$q', function(System, $log, $q){
        var api = System('view/viewsusutdist');

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

                api.simpan = function(data){
                    return this.connect('simpan', data);
                };


                api.upload = function(data){
                    return this.connect('upload', data);
                };

                api.retrieve = function(data){
                    return this.connect('retrieve', data);
                };
                return api;
    }]);
});