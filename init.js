alt.initViewComponents = function(scope){
    scope.penugasan = {data: {}, dokumenpenugasan: {isupload: false}};
    scope.evaluasipenugasan = {data: {}, dokumenevaluasi: {isupload: false}, dokumenanalisa: {isupload: false}, dokumenwbs: {isupload: false}, dokumenpendukung: {isupload: false}};
    scope.penerbitanchargecode = {data: {}, dokumen: {isupload:false}};
    scope.inputpenawaranlingkup = {data: {}};
    scope.inputpenawaranharga = {data: {},dokumenpenawaranharga:{isupload:false}};
    scope.approvalpenawaranman = {data: {}};
    scope.approvalpenawaranms = {data: {}};
    scope.uploadpenawaranharga = {data: {}, dokumenpenawaran: {isupload: false}};
    scope.validasipenawarandir = {data: {}};
    scope.kontrak = {data: {}, dokumenkontrakview: {isupload: false}, suratpenugasanview: {isupload: false}};
    scope.produkbobot = {data: {wbs:[]}};
    scope.approvemanprodukbobot = {data: {}};
    scope.penentuantimpro = {data: {}};
    scope.approvaltimproman = {data: {}};
    scope.approvaltimproms = {data: {}};
    scope.uploadsktimpro = {data: {}, dokumensktimproview: {isupload: false}};
    scope.validasitimpro = {data: {}};
    scope.waktuproduk = {data: {}};
    scope.approvalwaktuprodukman = {data: {}};
    scope.inputrmp = {data: {}};
    scope.approvermpman = {data: {}};
    scope.uploadrmp = {data: {}, dokumenrmpview: {isupload: false}};
    scope.inputdpd = {data: {}};
    scope.approvedpdman = {data: {}};
    scope.approvedpdqc = {data: {}};
    scope.uploaddpd = {data: {}, dokumendpdview: {isupload: false}};
};


alt.getFilesFromResponse = function(scope, response){
    if(response.data.dokumen && scope.penugasan) scope.penugasan.dokumenpenugasan.data = response.data.usrPenugasan_dokumen || response.data.dokumen;
    if(response.data.dokumenevaluasi && scope.evaluasipenugasan) scope.evaluasipenugasan.dokumenevaluasi.data = response.data.usrPenugasanEvaluasi_dokumen || response.data.dokumenevaluasi;
    if(response.data.dokumenanalisa && scope.evaluasipenugasan) scope.evaluasipenugasan.dokumenanalisa.data = response.data.usrPenugasanEvaluasi_dokumenanalisa || response.data.dokumenanalisa;
    if(response.data.dokumenwbs && scope.evaluasipenugasan) scope.evaluasipenugasan.dokumenwbs.data = response.data.usrPenugasanEvaluasi_dokumenwbs || response.data.dokumenwbs;
    if(response.data.dokumenpendukung && scope.evaluasipenugasan) scope.evaluasipenugasan.dokumenpendukung.data = response.data.usrPenugasanEvaluasi_dokumenpendukung || response.data.dokumenpendukung;
    if(response.data.dokumenpenawaranharga && scope.inputpenawaranharga) scope.inputpenawaranharga.dokumenpenawaranharga.data = response.data.dokumenpenawaranharga;
    if(response.data.dokumen && scope.penerbitanchargecode) scope.penerbitanchargecode.dokumen.data = response.data.usrPermohonan_dokumen;
    if(response.data.dokumenpenawaran && scope.uploadpenawaranharga) scope.uploadpenawaranharga.dokumenpenawaran.data = response.data.usrPenawaranUpload_dokumen || response.data.dokumenpenawaran;
    if(response.data.dokumenkontrak && scope.kontrak) scope.kontrak.dokumenkontrakview.data = response.data.dokumenkontrak;
    if(response.data.suratpenugasan && scope.kontrak) scope.kontrak.suratpenugasanview.data = response.data.suratpenugasan;
    if(response.data.usrPengesahanTimpro_dokumen && scope.uploadsktimpro) scope.uploadsktimpro.dokumensktimproview.data = response.data.usrPengesahanTimpro_dokumen;
    if(response.data.usrProsedurKSMMR_dokumen && scope.uploadrmp) scope.uploadrmp.dokumenrmpview.data = response.data.usrProsedurKSMMR_dokumen;
    if(response.data.usrKualitasMS_dokumen && scope.uploaddpd) scope.uploaddpd.dokumendpdview.data = response.data.usrKualitasMS_dokumen;
};

alt.getDataFromResponse = function(scope, response){
    scope.penugasan.data = response.data;
    scope.evaluasipenugasan.data = response.data;
    scope.inputpenawaranharga.data = response.data;
    scope.approvalpenawaranman.data = response.data;
    scope.approvalpenawaranms.data = response.data;
    angular.forEach(response.data.processVariable, function(val, key){
        if(scope.penugasan)             if(key.indexOf('usrPenugasan_') == 0) scope.penugasan.data[key] = val;
        if(scope.evaluasipenugasan)     if(key.indexOf('usrPenugasanEvaluasi_') == 0) scope.evaluasipenugasan.data[key] = val;
        if(scope.penerbitanchargecode)  if(key.indexOf('usrPermohonan_') == 0) scope.penerbitanchargecode.data[key] = val;
        if(scope.inputpenawaranlingkup) if(key.indexOf('usrPenawaranLingkup_') == 0) scope.inputpenawaranharga.data[key] = val;
        if(scope.inputpenawaranharga)   if(key.indexOf('usrPenawaran_') == 0) scope.inputpenawaranharga.data[key] = val;
        if(scope.approvalpenawaranman)  if(key.indexOf('usrPenawaranMan_') == 0) scope.approvalpenawaranman.data[key] = val;
        if(scope.approvalpenawaranms)   if(key.indexOf('usrPenawaranMS_') == 0) scope.approvalpenawaranms.data[key] = val;
        if(scope.uploadpenawaranharga)  if(key.indexOf('usrPenawaranUpload_') == 0) scope.uploadpenawaranharga.data[key] = val;
        if(scope.validasipenawarandir)  if(key.indexOf('usrPenawaranValidasi_') == 0) scope.validasipenawarandir.data[key] = val;
        if(scope.kontrak)               if(key.indexOf('usrKontrak_') == 0) scope.kontrak.data[key] = val;
        // if(scope.produkbobot)           if(key.indexOf('usrProdukAsman_') == 0) scope.produkbobot.data[key] = val;
        if(scope.approvemanprodukbobot) if(key.indexOf('usrProdukMAdkon_') == 0) scope.approvemanprodukbobot.data[key] = val;
        if(scope.penentuantimpro)       if(key.indexOf('usrUsulanTimpro_') == 0) scope.penentuantimpro.data[key] = val;
        if(scope.approvaltimproman)     if(key.indexOf('usrSetujuTimpro_') == 0) scope.approvaltimproman.data[key] = val;
        if(scope.approvaltimproms)      if(key.indexOf('usrSahTimpro_') == 0) scope.approvaltimproms.data[key] = val;
        if(scope.uploadsktimpro)        if(key.indexOf('usrPengesahanTimpro_') == 0) scope.uploadsktimpro.data[key] = val;
        if(scope.validasitimpro)        if(key.indexOf('usrValidasiTimpro_') == 0) scope.validasitimpro.data[key] = val;
        if(scope.waktuproduk)           if(key.indexOf('usrWaktuPTL_') == 0) scope.approvalwaktuprodukman.data[key] = val;
        if(scope.approvalwaktuprodukman)if(key.indexOf('usrWaktuMan_') == 0) scope.approvalwaktuprodukman.data[key] = val;
        if(scope.inputrmp)              if(key.indexOf('usrProsedurPTL_') == 0) scope.inputrmp.data[key] = val;
        if(scope.approvermpman)         if(key.indexOf('usrProsedurPTL_') == 0) scope.approvermpman.data[key] = val;
        if(scope.uploadrmp)             if(key.indexOf('usrProsedurSKMMR_') == 0) scope.uploadrmp.data[key] = val;
        if(scope.inputdpd)              if(key.indexOf('usrKualitasPTL_') == 0) scope.inputdpd.data[key] = val;
        if(scope.approvedpdman)         if(key.indexOf('usrKualitasMan_') == 0) scope.approvedpdman.data[key] = val;
        if(scope.approvedpdqc)          if(key.indexOf('usrKualitasQC_') == 0) scope.approvedpdqc.data[key] = val;
        if(scope.uploadrmp)             if(key.indexOf('usrKualitasMS_') == 0) scope.uploadrmp.data[key] = val;
    });
};

alt.initComponentAll = function(scope, response){
    alt.initViewComponents(scope);
    alt.getDataFromResponse(scope,response);
    alt.getFilesFromResponse(scope,response);
};

alt.getDirectory = function($routeParams){
    var keys = Object.keys($routeParams).sort().reverse(),
        path = "";

    angular.forEach(keys, function(key){
        if(key.indexOf("alt") === 0)
            path += $routeParams[key] + '/'
    });

    return alt.routeFolder + '/' + path;
};

alt.prevRoute = {};
alt.run(['$log', '$q', '$rootScope', '$route', '$window', '$auth', '$alert', '$api', '$timeout', function($log, $q, $rootScope, $route, $window, $auth, $alert, $api, $timeout){
    $rootScope.$auth = $auth;
    $rootScope.template = 'full';

    alt.directive('formatNumber', function(){
        return {
            restrict :'A',
            require:'ngModel',
            link : function(scope, element, attrs, ngModel){
                element[0].style.textAlign = "right";

                var params = attrs.formatNumber.split(" ");
                var precision = params[0] || 0;
                var thousand = params[1] || ".";
                var decimal = params[2] || ",";

                function setAnotherValue(){
                    ngModel.$parsers.push(function(){
                        value = accounting.unformat(ngModel.$viewValue, decimal);
                        ngModel.$setViewValue(accounting.formatNumber(value, precision, thousand, decimal));
                        ngModel.$render();
                        return value;
                    });

                    ngModel.$formatters.push(function (){
                        value = accounting.formatNumber(ngModel.$modelValue, precision, thousand, decimal);
                        return value;
                    });
                }
                setAnotherValue();

                element.bind('keydown', function () {
                    scope.$apply(setAnotherValue);
                });
            }
        }
    });

    $rootScope.toggleCollapse = function (id) {
        document.getElementById(id).classList.toggle('collapse');
    };

    $rootScope.$on('$routeChangeStart', function(event, currRoute, prevRoute){
        alt.menu = ($auth.userdata.usergroupid == 1) ? 'sysadmin' : 'administrasi';

        if($auth.userdata.usergroupid == 1) {
            alt.menu = 'sysadmin';
        }
        if($auth.userdata.usergroupid == 2) {
            alt.menu = 'unit';
        }
        if($auth.userdata.usergroupid == 3) {
            alt.menu = 'sti';
        }
        if($auth.userdata.usergroupid == 4) {
            alt.menu = 'kpk';
        }
        if($auth.userdata.usergroupid == 5) {
            alt.menu = 'sbu';
        }
        if($auth.userdata.usergroupid == 6) {
            alt.menu = 'sbu';
        }
        if($auth.userdata.usergroupid == 7) {
            alt.menu = 'view';
        }
        $rootScope.template = currRoute.params.altcontroller === 'auth' ? 'full' : 'content';

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
                    // $alert.add('Anda belum login atau sesi anda sudah habis!', $alert.danger);
                    // $auth.logout();
                    // $window.location.href = alt.baseUrl + 'auth/login';
                });
            }
        }

        if(alt.environment == 'production' && typeof alt.secure.key === 'undefined') $api('system/auth').connect('secure').then(function(response){
            alt.secure = response.data;
        });
    });

    /*$rootScope.$on('$routeChangeLoaded', function(event, currRoute, prevRoute){
        console.log('here');
    });*/
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