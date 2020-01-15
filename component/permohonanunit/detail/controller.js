define([
    'asset/lib/moment/min/moment-with-locales.min',
    'asset/lib/select2/js/select2.full.min',
    'component/alt/button/service',
    'component/iconplus/master/unit',
    'component/iconplus/master/bandwith',
    'component/activiti/task'
], function(moment){
    return [
        '$scope', '$routeParams', '$auth', '$log', '$button', '$popup', '$validate', '$alert', '$window',
        'Activiti_Task','Iconplus_Master_Unit','Iconplus_Master_Bandwith',
        function($scope, $routeParams, $auth, $log, $button, $popup, $validate, $alert, $window,
                 Activiti_Task, Iconplus_Master_Unit,Iconplus_Master_Bandwith){
            $scope.action = $routeParams.action;
            $scope.unitid = $auth.userdata.unitid;
            $scope.table = [];
            $(".select2").select2();

            // data
            $scope.id = '';
            $scope.data = {
                processid: "odp"
            };

            Iconplus_Master_Unit.retrieve({unitid:$scope.unitid}).then(function(response){
                $scope.data.usrPermohonan_namaunit  = response.data.name;
                $scope.data.usrPermohonan_unitid = $scope.unitid;
            });

            $scope.datadisposisi = {};

            $scope.file = {
                ismulti: true,
                isupload: $scope.action != 'view',
                isview: $scope.action != 'add',
                accept:'application/pdf',
                data:{}
            };

            $scope.ref = {
                unit:[],
                bandwith:[]
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
                    // $scope.table.data = angular.fromJson(response.data.usrPermohonan_data);
                    $scope.data.definitionKey = response.data.definitionKey;
                    $scope.file.data = response.data.usrPermohonan_dokumen;
                    debugger;
                });
            };

            $scope.$watch('modal.data.jenislayanan',function(val){
                Iconplus_Master_Bandwith.list({jenis_layanan:val}).then(function(response){
                    $scope.ref.bandwith  = response.data;
                });
            });

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
            $scope.viewTransaksi = function(index,item){

                $scope.modal.data = angular.copy(item);
                $scope.modal.index = index;
                $scope.modal.buttons = [$scope.btnclose];
                $scope.modal.action = 'view';
                $scope.modal.open();
            };

            $scope.editTransaksi = function(index,item){
                $scope.modal.data = angular.copy(item);
                // $scope.dokumendetail.data = item.dokumendata;
                $scope.modal.index = index;
                $scope.modal.buttons = [$scope.btnsavemodal, $scope.btnclose];
                $scope.modal.action = 'edit';
                $scope.modal.open();
            };

            $scope.removeTransaksi = function(index,item){
                $popup.confirm({
                    caption: 'Apakah anda yakin?',
                    buttons: [
                        $button('yes', {
                            onclick: function () {
                                    $scope.table.splice(index,1);
                                $popup.close(true);
                            }
                        }),
                        $button('no', {
                            onclick: function () {
                                $popup.close(false);
                            }
                        })
                    ]
                });
            };

            $scope.btnclose = $button('close', {
                title: 'Batal',
                onclick: function(){
                    $scope.modal.close();
                    // $scope.dokumendetail.clear();
                }
            });

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
                // if ($scope.unitid != 0) {
                // $scope.data.usrPermohonan_unitid = $auth.userdata.unitid;
                // $scope.data.usrPermohonan_namaunit = $scope.ref.unit[$scope.unitid].name;
                // }
                $scope.data.usrPermohonan_namaunit = name;
            }
            $scope.$watch('data.usrPermohonan_unitid', function(val){
                if(val) {
                    $scope.data.usrPermohonan_namaunit = $scope.ref.unit[val].name;
                    $scope.data.usrPermohonan_unitid = val;
                }
            });

        }
    ];
});