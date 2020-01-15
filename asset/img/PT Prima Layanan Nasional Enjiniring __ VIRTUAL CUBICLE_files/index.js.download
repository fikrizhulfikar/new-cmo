/*define([
], function(){
    alt.factory('System', ['$log', '$api', '$alert', '$q', '$rootScope', '$loading', function($log, $api, $alert, $q, $rootScope, $loading){
        return function(url, pkey){
            pkey = pkey || '';
            return $api(url, pkey, {
                connect: function(params){
                    $loading.show();
                },
                success: function(response){
                    $loading.close();
                },
                error: function(error, params, deferred, iscancelled){
                    $loading.close();
                    if(iscancelled) return true;

                    error.message = error.message || (error.data ? error.data.message : 'Error tidak diketahui');
                    if(typeof error.message === "string"){
                        $alert.add(error.message, $alert.danger);
                    }else if(error.message.length){
                        angular.forEach(error.message, function(message){
                            $alert.add(message, $alert.danger);
                        });
                    }
                }
            });
        };
    }]);
});*/

define([
], function(){
    alt.factory('System', ['$log', '$api', '$alert', '$q', '$rootScope', '$loading', function($log, $api, $alert, $q, $rootScope, $loading){
        var pool = {};
        return function(url, pkey){
            pkey = pkey || '';
            return $api(url, pkey, {
                connect: function(params){
                    if(params.url.indexOf("notif") == -1){
                        pool[params.url] = "connecting";
                        $loading.show();
                    }
                },
                success: function(response){
                    var result = true;
                    if(pool[response.config.url]){
                        pool[response.config.url] = "success";
                        result = Object.values(pool).every(function(status){
                            return status != "connecting"
                        });
                    }

                    if(result){
                        $loading.close();
                        pool = {};
                    }
                },
                error: function(error, params, deferred, iscancelled){
                    var result = true;
                    if(pool[error.config.url]){
                        pool[error.config.url] = "error";
                        result = Object.values(pool).every(function(status){
                            return status != "connecting"
                        });
                    }
                    
                    if(result){
                        $loading.close();
                        pool = {};
                    }
                    if(iscancelled) return true;

                    error.message = error.message || (error.data ? error.data.message : 'Error tidak diketahui');
                    if(typeof error.message === "string"){
                        $alert.add(error.message, $alert.danger);
                    }else if(error.message.length){
                        angular.forEach(error.message, function(message){
                            $alert.add(message, $alert.danger);
                        });
                    }
                }
            });
        };
    }]);
});
