alt.application = 'Simponi';
alt.title = 'PT Indonesia Comnets Plus';
alt.description = 'CHANGE MANAGEMENT OFFICE';
alt.version = '1.0.0';
alt.environment = 'development';
//String ldap_host = "103.56.233.178";
//alt.serverUrl = 'http://10.14.153.169:8080/newcmo-webservice/';
//alt.serverUrl = 'https://cmo.pln.co.id/newcmo-webservice/';
alt.serverUrl = "http://localhost:9393/";
// alt.cmisUrl = "http://localhost:9080/";
alt.urlArgs = alt.environment == 'production' ? '_v=' + alt.version : '_t=' + (+new Date());
// alt.urlArgs = '_v=' + alt.version;
alt.defaultRoute = 'dashboard/administrasi';
alt.secure = {};
alt.correctionUrl = 'koreksi/list';
alt.timeout = 600000;
alt.isCmisEnabled = false;

var isCleansing = false;
alt.routeFolder += (isCleansing ? '_clean' : '');
alt.componentFolder += (isCleansing ? '_clean' : '');
alt.menuFolder = "menu" + (isCleansing ? '_clean' : '');

alt.module('ngSanitize'); 
alt.module('ui.select');
alt.module('datePicker');

document.title = alt.title + ' :: ' + alt.description;