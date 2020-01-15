define([
    'asset/lib/moment/min/moment-with-locales.min',
    'asset/js/accounting.min',
    'component/alt/button/service',
    'component/iconplus/master/gudang',
    'component/activiti/task',
    'component/iconplus/integ/ap2t'
], function(moment, accounting){
    return [
        '$scope', '$routeParams', '$auth', '$log', '$button', '$popup', '$validate', '$alert', '$window', 'Activiti_Task',
        'Iconplus_Master_Gudang','Integ_Ap2t',
        function($scope, $routeParams, $auth, $log, $button, $popup, $validate, $alert, $window, Activiti_Task, Iconplus_Master_Gudang,
                 Integ_Ap2t){
            $scope.action = $routeParams.action;
            $scope.table = [];
            $scope.combobox = [];

            // data
            $scope.id = '';
            $scope.data = {
                processid: "ail"
            };

            $scope.btnsearch = $button('search', {
                title: 'Cari',
                onclick: function(){
                    Integ_Ap2t.getDataPelangganByIdpel({idpel:$scope.data.usrPermohonan_idpel}).then(function(response){
                        console.log(response.data.Results.Row.NAMA);
                        $scope.data.usrPermohonan_nama  = response.data.Results.Row.NAMA;
                        $scope.data.usrPermohonan_unitup  = response.data.Results.Row.UNITUP;
                        $scope.data.usrPermohonan_alamat = response.data.Results.Row.PNJ+" "+response.data.Results.Row.NAMAPNJ+" No."+ response.data.Results.Row.NOBANG+" "+response.data.Results.Row.KETNOBANG+" RT."+ response.data.Results.Row.RT+" RW."+ response.data.Results.Row.RW+" "+ response.data.Results.Row.LINGKUNGAN;
                        $scope.data.usrPermohonan_tarif  = response.data.Results.Row.TARIF;
                        $scope.data.usrPermohonan_daya  = response.data.Results.Row.DAYA+" "+response.data.Results.Row.KDAYA;
                        $scope.data.usrPermohonan_namagardu = response.data.Results.Row.KDGARDU;
                        $scope.data.usrPermohonan_notiang  = response.data.Results.Row.NOTIANG;
                        $scope.data.usrPermohonan_merekmeter = response.data.Results.Row.MEREK_KWH+" "+response.data.Results.Row.TYPE_KWH;
                        $scope.data.usrPermohonan_nometer  = response.data.Results.Row.NOMETER_KWH;
                        $scope.data.usrPermohonan_jenis_mk = response.data.Results.Row.JENIS_MK;
                        $scope.data.usrPermohonan_blthmut = response.data.Results.Row.THBLMUT;

                    })


                }
            });

            // $scope.data = {
            //     id : $routeParams.id
            // };
            $scope.ref = {
                gudang: {}
            };
            Iconplus_Master_Gudang.list().then(function(response){
                angular.forEach(response.data, function(val, key){
                    $scope.ref.gudang[val.gudangid] = val;
                });
            });

            
/*            $scope.data.usrPermohonan_gudang = function(val){
                $scope.data.usrPermohonan_namagudang = $scope.ref.gudang[val].name;
            };*/
            
            $scope.datadisposisi = {};

            $scope.file = {
                // ismulti: true,
                isupload: $scope.action != 'view',
                isview: $scope.action != 'add',
                accept:'application/pdf',
                data:{}
            };
            $scope.i01_dokumen = {
                // ismulti: true,
                isupload: $scope.action != 'view',
                isview: $scope.action != 'add',
                accept:'application/pdf',
                data:{}
            };
            $scope.identitas_dokumen = {
                // ismulti: true,
                isupload: $scope.action != 'view',
                isview: $scope.action != 'add',
                accept:'application/pdf',
                data:{}
            };
            $scope.i03_dokumen = {
                // ismulti: true,
                isupload: $scope.action != 'view',
                isview: $scope.action != 'add',
                accept:'application/pdf',
                data:{}
            };
            $scope.spjbtl_dokumen = {
                // ismulti: true,
                isupload: $scope.action != 'view',
                isview: $scope.action != 'add',
                accept:'application/pdf',
                data:{}
            };
            $scope.i09_dokumen = {
                // ismulti: true,
                isupload: $scope.action != 'view',
                isview: $scope.action != 'add',
                accept:'application/pdf',
                data:{}
            };
            $scope.i10_dokumen = {
                // ismulti: true,
                isupload: $scope.action != 'view',
                isview: $scope.action != 'add',
                accept:'application/pdf',
                data:{}
            };
            $scope.i11_dokumen = {
                // ismulti: true,
                isupload: $scope.action != 'view',
                isview: $scope.action != 'add',
                accept:'application/pdf',
                data:{}
            };
            $scope.slo_dokumen = {
                // ismulti: true,
                isupload: $scope.action != 'view',
                isview: $scope.action != 'add',
                accept:'application/pdf',
                data:{}
            };
            $scope.lain2_dokumen = {
                // ismulti: true,
                isupload: $scope.action != 'view',
                isview: $scope.action != 'add',
                accept:'application/pdf',
                data:{}
            };

            $scope.retrieve = function(){
                if($scope.id) Activiti_Task.retrieve({id: $scope.id, definitionKey:'usrPermohonan'}).then(function(response){
                    $scope.status = response.data.definitionKey;
                    angular.forEach(response.data.processVariable, function(val, key){
                        if(key.indexOf('usrPermohonan_') == 0)
                            $scope.data[key] = val;
                        if(key.indexOf('usrPermohonan_data') == 0) {
                            if($scope.usr == 'usrPermohonan')$scope.data[key] = val;
                            $scope.data[key] = val;
                            $scope.table = angular.fromJson(eval(val));
                        }
                    });
                    $scope.data.id = $scope.id;
                    $scope.data.definitionKey = response.data.definitionKey;
                    $scope.file.data = response.data.usrPermohonan_dokumen;
                    $scope.i01_dokumen.data = response.data.i01_dokumen;
                    $scope.identitas_dokumen.data = response.data.identitas_dokumen;
                    $scope.i03_dokumen.data = response.data.i03_dokumen;
                    $scope.spjbtl_dokumen.data = response.data.spjbtl_dokumen;
                    $scope.i09_dokumen.data = response.data.i09_dokumen;
                    $scope.i10_dokumen.data = response.data.i10_dokumen;
                    $scope.i11_dokumen.data = response.data.i11_dokumen;
                    $scope.slo_dokumen.data = response.data.slo_dokumen;
                    $scope.lain2_dokumen.data = response.data.lain2_dokumen;
                });
            };

/*
            $scope.$watch('data.usrPermohonan_tglsurat2', function(val){
                if(val) {
                    $scope.data.usrPermohonan_tglsurat= moment(val).format('YYYYMMDD');
                }
            });
            $scope.$watch('data.usrPermohonan_tglsurat', function(val){
                if(val) {
                    $scope.data.usrPermohonan_tglsurat2 = moment(val, 'YYYYMMDD').format();
                    $scope.data.usrPermohonan_tglinput = moment().format();
                    var tglsurat = moment(val,'YYYYMMDD').format();
                    $scope.data.usrPermohonan_durasi = moment($scope.data.usrPermohonan_tglinput).diff(tglsurat,'days');
                }
            });
*/

            $scope.$watch('id', function(val, key){
                $scope.retrieve();
            });


            $scope.get = function(){
                return angular.copy($scope.data);
            };

        }
    ];
});