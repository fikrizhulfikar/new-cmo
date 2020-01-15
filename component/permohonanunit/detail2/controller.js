define([
    'asset/lib/moment/min/moment-with-locales.min',
    'component/alt/button/service',
    'component/activiti/task',
    'component/pusharlis/master/unit',
    'component/pusharlis/master/proyek',
    'component/pusharlis/master/prima',
    'component/pusharlis/master/kelompokbidang',
    'component/pusharlis/master/kategori',
    'component/pusharlis/master/type',
    'component/pusharlis/master/pegawai',
    'component/pusharlis/master/customer',
    'component/pusharlis/master/perjanjian',
    'component/pusharlis/master/proyekprima'
], function(moment){
    return [
        '$scope', '$routeParams', '$log', '$button', '$popup', '$validate', '$alert', '$window', 'Pusharlis_Master_Unit',
        'Pusharlis_Master_Proyek','Pusharlis_Master_Prima','Pusharlis_Master_Kelompok_Bidang','Pusharlis_Master_Pegawai',
        'Pusharlis_Master_Kategori', 'Pusharlis_Master_Type', 'Pusharlis_Master_Perjanjian', 'Pusharlis_Master_Proyekprima', 'Pusharlis_Master_Customer', 'Activiti_Task',
        function($scope, $routeParams, $log, $button, $popup, $validate, $alert, $window, Pusharlis_Master_Unit,
                 Pusharlis_Master_Proyek, Pusharlis_Master_Prima, Pusharlis_Master_Kelompok_Bidang,Pusharlis_Master_Pegawai,
                 Pusharlis_Master_Kategori, Pusharlis_Master_Type, Pusharlis_Master_Perjanjian, Pusharlis_Master_Proyekprima, Pusharlis_Master_Customer, Activiti_Task){
            $scope.action = $routeParams.action;

            // referensi
            $scope.ref = {
                unit: {},
                bidang: {},
                pegawai: {},
                proyek: {},
                prima: {},
                // proyekprima: {},
                kategori: {},
                type: {},
                customer: {}
            };
            Pusharlis_Master_Unit.list().then(function(response){
                angular.forEach(response.data, function(val, key){
                    $scope.ref.unit[val.unitid] = val;
                });
            });

            Pusharlis_Master_Prima.list().then(function(response){
                angular.forEach(response.data, function(val, key){
                    $scope.ref.prima[val.nomorsurat] = val;
                });
            });

            Pusharlis_Master_Kelompok_Bidang.list().then(function(response){
                angular.forEach(response.data, function(val, key){
                    $scope.ref.bidang[val.id_bidang] = val;
                });
            });

            Pusharlis_Master_Pegawai.list().then(function(response){
                angular.forEach(response.data, function(val, key){
                    $scope.ref.pegawai[val.id_pegawai] = val;
                });
            });

            Pusharlis_Master_Proyek.list().then(function(response){
                angular.forEach(response.data, function(val, key){
                    $scope.ref.proyek[val.nomorsurat] = val;
                });
            });

            Pusharlis_Master_Kategori.list().then(function(response){
                angular.forEach(response.data, function(val, key){
                    $scope.ref.kategori[val.categoryid] = val;
                });
            });

            Pusharlis_Master_Type.list().then(function(response){
                angular.forEach(response.data, function(val, key){
                    $scope.ref.type[val.typeid] = val;
                });
            });

            Pusharlis_Master_Customer.list().then(function(response){
                angular.forEach(response.data, function(val, key){
                    $scope.ref.customer[val.customerid] = val;
                });
            });

            Pusharlis_Master_Perjanjian.list({where:"nopihakpertama is not null"}).then(function(response){
                $scope.ref.perjanjian = response.data;
            });

            Pusharlis_Master_Proyekprima.list().then(function(response){
                $scope.ref.proyekprima  = response.data;
            });

            // data
            $scope.id = '';
            $scope.data = {
                processid: "pusharlis"
            };
            $scope.datadisposisi = {};

            $scope.file = {
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
                    });
                    $scope.data.id = $scope.id;
                    $scope.data.definitionKey = response.data.definitionKey;
                    $scope.file.data = response.data.usrPermohonan_dokumen;
                    $scope.table = angular.fromJson(eval($scope.id [val].jenis_produk));
                });
            };


            $scope.$watch('data.usrPermohonan_tglsurat', function(val){
                if(val) {
                    $scope.data.usrPermohonan_tglsurat2 = moment(val, 'YYYYMMDD').format();
                    $scope.data.usrPermohonan_tglinput = moment().format();
                    var tglsurat = moment(val,'YYYYMMDD').format();
                    $scope.data.usrPermohonan_durasi = moment($scope.data.usrPermohonan_tglinput).diff(tglsurat,'days');
                }
            });

            $scope.$watch('data.usrPermohonan_tglsurat2', function(val){
                if(val) {
                    $scope.data.usrPermohonan_tglsurat = moment(val).format('YYYYMMDD');
                }
            });

            $scope.$watch('data.usrPermohonan_tglperjanjian2', function(val){
                if(val) {
                    $scope.data.usrPermohonan_tglperjanjian = moment(val).format('YYYYMMDD');
                }
            });

            // $scope.$watchGroup(['data.usrPermohonan_unitasalid','data.usrPermohonan_unittujuanid'], function(val){
            //     if($scope.data.usrPermohonan_unitasalid && $scope.data.usrPermohonan_unittujuanid){
            //         $scope.data.usrPermohonan_unitasalnama = $scope.ref.customer[val[0]].name;
            //         $scope.data.usrPermohonan_unittujuannama = $scope.ref.unit[val[1]].name;
            //     }
            // });

            $scope.$watch('data.usrPermohonan_nosurat', function(val){
                if($scope.data.usrPermohonan_nosurat){
                    $scope.table = angular.fromJson(eval($scope.data.usrPermohonan_data));
                }
            });


            $scope.$watch('id', function(val, key){
                $scope.retrieve();
            });

            $scope.get = function(){
                return angular.copy($scope.data);
            };
        }
    ];
});