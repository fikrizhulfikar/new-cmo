alt.modules.api=angular.module("alt-api",[]).config(["$provide","$httpProvider",function(e,t){t.defaults.headers.post["Content-Type"]="application/x-www-form-urlencoded";var n=null;e.factory("httpInterceptor",["$log","$q","$window",function(e,t,r){return{request:function(e){if(n=n||e.transformRequest,e.headers["Content-Type"])if(0===e.headers["Content-Type"].indexOf("application/x-www-form-urlencoded")){var t=[],r=function(e,t){if("$$hashKey"==e)return"";var n;switch(typeof t){case"string":case"number":return e+"="+encodeURIComponent(t);case"object":n=[];for(var a in t)t.hasOwnProperty(a)&&"$$hashKey"!=a&&n.push(r(e+"["+a+"]",t[a]));return n.join("&");case"array":n=[];for(a=0;a<t.length;a++)n.push(r(e+"["+a+"]",t[a]));return n.join("&")}};for(var a in e.data)e.data.hasOwnProperty(a)&&"$$hashKey"!=a&&t.push(r(a,e.data[a]));e.transformRequest=n,e.data=t.join("&")}else 0==e.headers["Content-Type"].indexOf("multipart/form-data")&&(e.transformRequest=[function(t){var n=new FormData,r=function(e,t,n){if("$$hashKey"==t)return"";switch(typeof n){case"string":case"number":e.append(t,n);break;case"object":if("undefined"!=typeof File&&n instanceof File)e.append(t,n);else if("undefined"==typeof File&&void 0!==n.name)e.append(t,n);else for(var a in n)n.hasOwnProperty(a)&&"$$hashKey"!=a&&r(e,t+"["+a+"]",n[a]);break;case"array":for(a=0;a<n.length;a++)r(e,t+"["+a+"]",n[a])}};for(var a in e.data)e.data.hasOwnProperty(a)&&"$$hashKey"!=a&&r(n,a,e.data[a]);return n}],delete e.headers["Content-Type"]);return e},response:function(e){var n={};try{n=angular.copy(e)}catch(e){}if("object"==typeof e.data){if(n.version=e.data.v||100,n.code=e.data.s||e.data.c||e.data.code||e.status||200,n.status=n.code,n.data=e.data.d||e.data.data||e.data,n.message=e.data.m||e.data.msg||e.data,n.time=e.data.t||0,n.usage=e.data.u||"",n.token=e.data.token||e.token||"",200!=n.status)return 401==n.status?(r.location.href=alt.baseUrl+"auth/login",t.reject(n)):(n.message=n.message||"Gagal terhubung ke server",t.reject(n))}else if(0===e.config.url.indexOf(alt.serverUrl)&&200!=e.status&&"object"!=typeof e.data)return n.code=-1,n.status=n.code,n.message="Tidak dapat terhubung ke server","development"==alt.environment.toLowerCase()&&(n.message+="<br/>"+e.data),t.reject(n);return n}}}]),t.interceptors.push("httpInterceptor")}]).factory("$api",["$http","$log","$q",function(e,t,n){return function(t,r,a){var o=(t=t||"").split("/");return r=r||o[o.length-1]+"id",t=(0!==t.indexOf(alt.serverUrl)?alt.serverUrl:"")+t,a=alt.extend({connect:function(){return!0},success:function(){return!0},error:function(){return!0}},a),{url:t,pkey:r,config:a,connect:function(r,o,s){r=(0!==(r=r||"").indexOf("/")?"/":"")+r,(o=o||{}).__frontendurl__=window.location.hash,s=alt.extend({skipAuthorization:!1,ismultipart:!1,method:"POST"},s);var i=n.defer(),u=!1,c=i.promise,d=n.defer(),f={headers:{"Content-Type":s.ismultipart?"multipart/form-data":"application/x-www-form-urlencoded"},skipAuthorization:s.skipAuthorization,method:s.method,data:o,url:t+r,timeout:d.promise};return!1!==a.connect(f)?e(f).then(function(e){!1!==a.success(e,f,i,u)&&i.resolve(e,f,i,u)},function(e){!1!==a.error(e,f,i,u)&&i.reject(e,f,i,u)}):!1!==a.error({message:"Tidak dapat terhubung"},f,i,u)&&i.reject({message:"Tidak dapat terhubung"},f,i,u),c.abort=function(){u=!0,d.resolve()},c},count:function(e,t){return this.connect("count",e,t)},list:function(e,t){return this.connect("list",e,t)},retrieve:function(e,t,n){if(e=e||"",t=t||{},"object"==typeof e)try{t=angular.copy(e)}catch(n){t=e}else t[r]=e;return this.connect("retrieve",t,n)},keyvalues:function(e,t){return this.connect("keyvalues",e,t)},insert:function(e,t){return this.connect("insert",e,t)},update:function(e,t){return this.connect("update",e,t)},remove:function(e,t,n){if(e=e||"",t=t||{},"object"==typeof e)try{t=angular.copy(e)}catch(n){t=e}else t[r]=e;return this.connect("delete",t,n)},isexist:function(e,t){return this.connect("is_exist",e,t)}}}}]),alt.module("alt-api",alt.modules.api);