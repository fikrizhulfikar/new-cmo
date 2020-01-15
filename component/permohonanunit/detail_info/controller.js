define([
    'asset/lib/moment/min/moment-with-locales.min',
    'asset/lib/select2/js/select2.full.min',
    'component/alt/button/service',
    'component/iconplus/master/unit',
    'component/activiti/task'
], function(moment){
    return [
        '$scope', '$routeParams', '$auth', '$log', '$button', '$popup', '$validate', '$alert', '$window',
        'Activiti_Task','Iconplus_Master_Unit',
        function($scope, $routeParams, $auth, $log, $button, $popup, $validate, $alert, $window,
                 Activiti_Task, Iconplus_Master_Unit){
            $scope.action = $routeParams.action;
            $scope.unitid = $auth.userdata.unitid;
            $scope.table = [];
            $(".select2").select2();

            // data
            $scope.id = '';
            $scope.data = {
                processid: "odp"
            };
            $scope.datadisposisi = {};

            $scope.file = {
                ismulti: true,
                isupload: $scope.action != 'view',
                isview: $scope.action != 'add',
                accept:'application/pdf',
                data:{}
            };

            $scope.ref = {
                unit:[]
            };

            Iconplus_Master_Unit.list().then(function(response){
                $scope.ref.unit  = response.data;
            });

            $scope.retrieve = function(){
                if($scope.id) Activiti_Task.retrieve({id: $scope.id, definitionKey:'usrPermohonan'}).then(function(response){
                    $scope.status = response.data.definitionKey;
                    angular.forEach(response.data.processVariable, function(val, key){
                        if(key.indexOf('usrPermohonan_') == 0)
                            $scope.data[key] = val;
                        if(key.indexOf('usrPermohonan_data') == 0) {
                            if($scope.usr == 'usrPermohonan')$scope.data[key] = val;
                            $scope.table = angular.fromJson(eval(val));
                        }
                    });
                    $scope.data.id = $scope.id;
                    $scope.data.definitionKey = response.data.definitionKey;
                    $scope.file.data = response.data.usrPermohonan_dokumen;
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

            $scope.btnadd = $button('add', {
                //class : 'btn btn-success',
                title: 'Tambah Detail',
                onclick: function(){
                    $scope.modal.data = {};
                    $scope.modal.action = 'add';
                    $scope.modal.buttons = [$scope.btnsavemodal, $scope.btnclose];
                    $scope.modal.open();
                }
            });

            $scope.modal = {
                header: 'Detail Data Permohonan',
                class : 'modal-lg',
                action: 'view',
                data  : {},
                buttons: []
            };
            $scope.btnsavemodal = $button('save', {
                onclick: function(){
                    // $scope.modal.data.dokumendetail = $scope.dokumendetail.model;
                    var isvalid = $validate()
                    // .rule($validate.required($scope.modal.data.jabatan), 'Jabatan harus diisi!')
                    // .rule($validate.required($scope.modal.data.nama_pegawai), 'Nama harus diisi!')

                    var isvalid2 = isvalid.check();

                    if (!isvalid2) return false;

                    var data = angular.copy($scope.modal.data);
                    // $scope.dokumendetail.clear();
                    if($scope.modal.action == 'add') {
                        $scope.table.push(data);
                    }
                    else{
                        $scope.table[$scope.modal.index] = data;
                    }
                    $scope.modal.close();
                }
            });
            $scope.btnclose = $button('close', {
                title: 'Batal',
                onclick: function(){
                    $scope.modal.close();
                    // $scope.dokumendetail.clear();
                }
            });

            $scope.data.usrPermohonan_nosurat = "";
            $scope.data.usrPermohonan_kategori = "NETWORK";

            $scope.$watch('id', function(val, key){
                $scope.retrieve();
            });

            $scope.get = function(){
                return angular.copy($scope.data);
            };

            $scope.getnoproyek = {selected : undefined};
            $scope.getunit = {selected : undefined};
            $scope.pilih_unit = function (name){
                // $scope.modal.data.jabatan = nama_peran;
                $scope.data.usrPermohonan_namaunit = name;
            }
        }
    ];
});