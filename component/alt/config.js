alt.application = 'EIC PLNE';
alt.title = 'PT Prima Layanan Nasional Enjiniring';
alt.description = 'VIRTUAL CUBICLE';
alt.version = '1.0.0';
alt.environment = 'development';
//alt.serverUrl = 'http://10.14.153.184:8080/eic-wsldap/';
// alt.serverUrl = 'http://localhost:9090/';
alt.serverUrl = 'http://103.3.77.74/eic-wsldap/';
// alt.serverUrl = 'http://live.iconpln.co.id:8007/pusharlis-webservice/';
// alt.urlArgs = alt.environment == 'production' ? '_v=' + alt.version : '_t=' + (+new Date());
alt.urlArgs = '_v=' + alt.version;
alt.defaultRoute = 'auth/login';
alt.secure = {};
alt.correctionUrl = 'koreksi/list';

alt.module('ngSanitize'); 
alt.module('ui.select');
alt.module('datePicker');

// set window title
document.title = alt.title + ' :: ' + alt.description;

// advanced configuration
alt.run(['$log', '$q', '$rootScope', '$route', '$window', '$auth', '$alert', '$api', '$timeout', function($log, $q, $rootScope, $route, $window, $auth, $alert, $api, $timeout){
    $rootScope.$auth = $auth;
    $rootScope.template = 'full';
    
    $rootScope.toggleCollapse = function (id) {
        document.getElementById(id).classList.toggle('collapse');
    };

    $rootScope.$on('$routeChangeStart', function(event, currRoute, prevRoute){
        alt.menu = ($auth.userdata.usergroupid == 1) ? 'sysadmin' : 'administrasi';

        if($auth.userdata.usergroupid == 1) {
            alt.menu = 'sysadmin';
        }
        if($auth.userdata.usergroupid == 2) {
            alt.menu = 'direng';
        }
        if($auth.userdata.usergroupid == 3) {
            alt.menu = 'manajersenior';
        }
        if($auth.userdata.usergroupid == 4) {
            alt.menu = 'manajerenjiniring';
        }
        if($auth.userdata.usergroupid == 5) {
            alt.menu = 'pemasaran';
        }
        if($auth.userdata.usergroupid == 6) {
            alt.menu = 'qc';
        }
        if($auth.userdata.usergroupid == 7) {
            alt.menu = 'ptl';
        }
        if($auth.userdata.usergroupid == 8) {
            alt.menu = 'ptl';
        }
        if($auth.userdata.usergroupid == 9) {
            alt.menu = 'admin';
        }
        if($auth.userdata.usergroupid == 10) {
            alt.menu = 'pemasaran';
        }
        $rootScope.template = currRoute.params.altcontroller == 'auth' ? 'full' : 'content';

        $rootScope.toggleMenu = function(){
            document.getElementById('page-sidebar').classList.toggle('collapse');
            document.getElementById('top-menu-user').classList.remove('open');
            document.getElementById('top-menu-notif').classList.remove('visible');
        };

        $rootScope.closeMenu = function(){
            if(document.getElementById('page-sidebar').classList.contains('open')) {
                document.getElementById('page-sidebar').classList.add('collapse');
                document.getElementById('top-menu-user').classList.remove('open');
                document.getElementById('top-menu-notif').classList.remove('visible');
            }
        };

        if(currRoute.params.altcontroller != 'auth' && currRoute.params.altaction){
            if($auth.islogin()){
                $api('system').connect('auth/token', {}, {skipAuthorization: true}).then(function(response) {
                    $auth.login(response.data)
                }, function(error){
                    $alert.add('Anda belum login atau sesi anda sudah habis!', $alert.danger);
                    $auth.logout();
                    $window.location.href = alt.baseUrl + 'auth/login';
                });
            }
        }

        if(alt.environment == 'production' && typeof alt.secure.key === 'undefined') $api('system/auth').connect('secure').then(function(response){
            alt.secure = response.data;
        });
    });
}]).config(['$provide', '$httpProvider', '$compileProvider', function($provide, $httpProvider, $compileProvider){
    $provide.factory('secureHttpInterceptor', ['$auth', '$log', '$q', '$window', function($auth, $log, $q, $window){
        return {
            request: function(config){
                if(config.data && alt.environment == 'production' && config.method == "POST" && config.url.indexOf(alt.serverUrl) === 0 && config.headers["Content-Type"] == "application/x-www-form-urlencoded"){
                    var key = CryptoJS.enc.Base64.parse(alt.secure.key);
                    var iv = CryptoJS.enc.Base64.parse(alt.secure.iv);
                    var encrypted = CryptoJS.AES.encrypt(
                        config.data,
                        key,
                        { mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7, iv: iv});

                    config.data = encrypted.toString();
                }
                return config;
            },
            response: function(response){
                if(alt.environment == 'production' && response.config.method == "POST" && response.config.url.indexOf(alt.serverUrl) === 0 && response.config.headers["Content-Type"] == "application/x-www-form-urlencoded" && response.config.url.indexOf("auth/secure") == -1){
                    var encrypted = CryptoJS.enc.Base64.parse(response.data);
                    var key = CryptoJS.enc.Base64.parse(alt.secure.key);
                    var iv = CryptoJS.enc.Base64.parse(alt.secure.iv);
                    var decrypted = CryptoJS.enc.Utf8.stringify(CryptoJS.AES.decrypt(
                        { ciphertext: encrypted },
                        key,
                        { mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7, iv: iv}));

                    try{
                        response.data = angular.fromJson(decrypted);
                    }catch(e){
                        response.data = decrypted;
                    }
                }
                return response;
            }
        };
    }]);

    $httpProvider.interceptors.push('secureHttpInterceptor');
}]);