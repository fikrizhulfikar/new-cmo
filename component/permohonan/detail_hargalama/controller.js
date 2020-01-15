define([
    'asset/lib/moment/min/moment-with-locales.min',
    'asset/js/accounting.min',
    'asset/lib/select2/js/select2.full.min',
    'component/alt/button/service',
    'component/iconplus/master/unit',
    'component/iconplus/master/bandwith',
    'component/iconplus/master/jarak',
    'component/iconplus/master/hargasewa',
    'component/iconplus/master/hargainstalasi',
    'component/iconplus/master/permohonan',
    'component/activiti/task'
], function(moment,accounting){
    return [
        '$scope', '$routeParams', '$auth', '$log', '$button', '$popup', '$validate', '$alert', '$window',
        'Activiti_Task','Iconplus_Master_Unit','Iconplus_Master_Bandwith','Iconplus_Master_Jarak',
        'Iconplus_Master_Harga_Sewa','Iconplus_Master_Harga_Instalasi', 'Iconplus_Master_Permohonan',
        function($scope, $routeParams, $auth, $log, $button, $popup, $validate, $alert, $window,
                 Activiti_Task, Iconplus_Master_Unit,Iconplus_Master_Bandwith, Iconplus_Master_Jarak,Iconplus_Master_Harga_Sewa,
                 Iconplus_Master_Harga_Instalasi, Iconplus_Master_Permohonan){

            $scope.action = $routeParams.action;

            $scope.accounting = accounting;

            $scope.unitid = $auth.userdata.unitid;

            $scope.table = [];

            $(".select2").select2();

            $scope.id = '';

            $scope.data = {
                processid: "odp"
            };

            $scope.data.usrPermohonan_unitid = $scope.unitid;

            $scope.data.hidden_unitid = $scope.unitid;

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
                bandwith:[],
                jarak:[],
                permohonan:[]
            };

            Iconplus_Master_Unit.list().then(function(response){
                $scope.ref.unit  = response.data;
            });

            Iconplus_Master_Unit.retrieve({unitid:$scope.unitid}).then(function(response){

                debugger;

                $scope.data.usrPermohonan_namaunit  = response.data.name;
                $scope.data.usrPermohonan_unitid = response.data.unitid;

                console.log("tes"+$scope.unitid);
            });

            Iconplus_Master_Permohonan.list().then(function(response){
                $scope.ref.permohonan  = response.data;
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
                    // debugger;
                });
            };

            $scope.$watch('modal.data.jenislayanan',function(val){
                Iconplus_Master_Bandwith.list({jenis_layanan:val}).then(function(response){
                    $scope.ref.bandwith  = response.data;
                });
                Iconplus_Master_Jarak.list({jenis_layanan:val}).then(function(response){
                    $scope.ref.jarak  = response.data;
                });
            });

            $scope.$watch('modal.data.jenislayanan',function(val){
                Iconplus_Master_Bandwith.list({jenis_layanan:val}).then(function(response){
                    $scope.ref.bandwith  = response.data;
                });
                Iconplus_Master_Jarak.list({jenis_layanan:val}).then(function(response){
                    $scope.ref.jarak  = response.data;
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
                    $scope.modal.data.lokasi = $scope.data.usrPermohonan_lokasi;

                    $scope.modal.buttons = [$scope.btnsavemodal, $scope.btnclose];
                    $scope.modal.open();
                }
            });

            $scope.btnupload = $button('add', {
                //class : 'btn btn-success',
                title: 'Upload Detail',
                onclick: function(){

                    if ($scope.uploadfilepermohonan)
                    {
                        $scope.uploadfilepermohonan = false;
                    }
                    else
                    {
                        $scope.uploadfilepermohonan = true;
                    }

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

                    debugger;

                    if ($scope.modal.data.jenispermohonan == 'aktivasi')
                    {
                        $scope.modal.data.serviceid = "";
                        $scope.modal.data.nomorsid = "";
                    }
                    var data = angular.copy($scope.modal.data);

                    if($scope.modal.action == 'add') {

                        console.log(data);
                        $scope.table.push(data);

                        /*
                        //insert into DB
                        $scope.datajson = angular.toJson($scope.modal.data);
                        Iconplus_Master_Permohonan.insert({
                            permohonan : $scope.datajson,unitid : $scope.modal.data.unitid,namaunit :$scope.modal.data.namaunit
                        });*/
                    }
                    else{
                        $scope.table[$scope.modal.index] = data;

                        /*
                         //insert into DB
                         $scope.datajson = angular.toJson($scope.modal.data);
                         Iconplus_Master_Permohonan.insert({
                         permohonan : $scope.datajson,unitid : $scope.modal.data.unitid,namaunit :$scope.modal.data.namaunit
                         });*/
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

            $scope.pilih_unit = function (name,unitid){
                // $scope.modal.data.jabatan = nama_peran;
                // if ($scope.unitid != 0) {
                // $scope.data.usrPermohonan_unitid = $auth.userdata.unitid;
                // $scope.data.usrPermohonan_namaunit = $scope.ref.unit[$scope.unitid].name;
                // }

                debugger;

                $scope.data.usrPermohonan_namaunit = name;
                $scope.data.hidden_unitid = unitid;
            }

            $scope.$watch('data.usrPermohonan_unitid', function(val){
                if(val) {
                    // $scope.data.usrPermohonan_namaunit = $scope.ref.unit[val].name;
                    $scope.data.usrPermohonan_namaunit = val.name;
                    // $scope.data.usrPermohonan_unitid = val.unitid;
                    $scope.data.usrPermohonan_lokasi = val.lokasi;
                }
            });

            $scope.pilih_serviceid = function (nomor_sid){
                $scope.modal.data.nomorsid = nomor_sid;
            }

            $scope.$watch('data.serviceid',function(val){
                if(val) {
                    $scope.modal.data.nomorsid = val.nomor_sid;
                    $scope.modal.data.jenislayanan = val.jenislayanan;
                    $scope.modal.data.keteranganlayanan = val.keteranganlayanan;
                    $scope.modal.data.lokasi = val.lokasi;
                    $scope.modal.data.catatan = val.catatan;
                    $scope.modal.data.jarak = val.jarak;
                    $scope.modal.data.kapasitas = val.kapasitas;
                    $scope.modal.data.originating = val.originating;
                    $scope.modal.data.koordinat_originating = val.koord_originating;
                    $scope.modal.data.alamat_originating = val.alamat_originating;
                    $scope.modal.data.terminating = val.terminating;
                    $scope.modal.data.koordinat_terminating = val.koord_terminating;
                    $scope.modal.data.alamat_terminating = val.alamat_terminating;
                }
            });

            $scope.$watchGroup(["modal.data.jenislayanan", "modal.data.keteranganlayanan", "modal.data.lokasi", "modal.data.jarak", "modal.data.kapasitas"], function (val) {
                if(val) {
                    Iconplus_Master_Harga_Sewa.retrieve({jenis_layanan: $scope.modal.data.jenislayanan,
                        keterangan_layanan: $scope.modal.data.keteranganlayanan,
                        lokasi: $scope.modal.data.lokasi,
                        jarak: $scope.modal.data.jarak,
                        bandwidth: $scope.modal.data.kapasitas
                    }).then(function(response){
                        $scope.modal.data.rpsewa = response.data.rpsewa;
                    })};
            });

            $scope.$watch('modal.data.jenislayanan', function (val) {
                if(val) {
                    Iconplus_Master_Harga_Instalasi.retrieve({jenis_layanan: $scope.modal.data.jenislayanan
                    }).then(function(response){
                        $scope.modal.data.rpinstalasi = response.data.rpinstalasi;
                    })};
            });

            $scope.uploadpermohonan = {
                isupload: $scope.action != 'view',
                isview: $scope.action != 'add',
                //accept:'application/vnd.ms-excel',
                accept:'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            };

            $scope.$watch('uploadpermohonan.model', function(val){
                if(val) {
                    $scope.formatfilesalah = false;
                    var xlsdata = [];
                    var jsonxls =[];
                    var headerData = [];
                    var headerDataTable = [];
                    var f = $scope.uploadpermohonan.model,
                        r = new FileReader();
                    r.onloadend = function (e) {
                        var data = e.target.result;

                        //READ workbook content
                        var workbook = XLSX.read(data, {type: 'binary'});
                        var worksheet = workbook.Sheets[workbook.SheetNames[0]];
                        xlsdata = XLSX.utils.sheet_to_json(worksheet, {header:1});
                        headerData = xlsdata[0];

                        //Help Variabel untuk Perulangan
                        var i=0;
                        var j = xlsdata.length;
                        var k = headerData.length;

                        //Making Table Title Object
                        for (i=0;i<k;i++) {
                            headerDataTable.push({title: headerData[i]});
                        }

                        //Parsing String to JSON (ISI TABEL) dinamically
                        var dataTemp="";
                        var l=0;
                        for(i=1;i<j;i++){
                            dataTemp +="{";
                            for(l=0;l<k;l++){
                                dataTemp = dataTemp + '"' +headerData[l] + '":"' + xlsdata[i][l]+'"';
                                if(l<k-1){
                                    dataTemp+=",";
                                }
                            }
                            dataTemp +="}";
                            jsonxls.push(JSON.parse(dataTemp.replace("'","")));
                            dataTemp="";
                        }


                        if(xlsdata.length > 0) {
                            $scope.data.usrPermohonan_upload = angular.toJson(xlsdata);
                            $scope.modalpermohonan.data = jsonxls;
                            $scope.modalpermohonan.head = headerDataTable;
                        }
                        else{
                            $scope.formatfilesalah = true;
                            $scope.modalpermohonan.data = null;
                            $scope.modalpermohonan.head = null;
                        }
                        $scope.$apply();
                    };
                    r.readAsBinaryString(f);
                }
                else{
                    $scope.formatfilesalah = true;
                    $scope.data.usrPermohonan_upload = null;
                }
            });

            $scope.showpermohonan = $button('view', {
                title: 'Preview',
                onclick: function(){
                    $scope.modalpermohonan.buttons = [$scope.btnsavemodalpermohonan, $scope.btnclosemodalpermohonan];
                    $scope.modalpermohonan.open();
                }
            });

            $scope.modalpermohonan = {
                header: 'Detail Data Permohonan',
                class : 'modal-lg',
                data  : {},
                head: {}
            };

            $scope.btnsavemodalpermohonan = $button('save', {
                onclick: function(){
                    var isvalid = $validate()

                    var isvalid2 = isvalid.check();

                    if (!isvalid2) return false;
                    //$scope.modalpermohonan.data.unitid = $scope.data.usrPermohonan_unitid;
                    //$scope.modalpermohonan.data.namaunit = $scope.data.usrPermohonan_namaunit;
                    var data = angular.copy($scope.modalpermohonan.data);

                    var json = [];
                    for(var i = 0; i < data.length; i++)
                    {
                        json = data[i];
                        $scope.table.push(json);
                    }

                    /*
                    //insert into DB
                    $scope.datajson = angular.toJson($scope.modalpermohonan.data);
                    Iconplus_Master_Permohonan.insert({
                        permohonan : $scope.datajson,unitid : $scope.modalpermohonan.data.unitid,namaunit :$scope.modalpermohonan.data.namaunit
                    });
                    */

                    $scope.modalpermohonan.close();
                }
            });

            $scope.btnclosemodalpermohonan = $button('close', {
                title: 'Batal',
                onclick: function(){
                    $scope.modalpermohonan.close();
                    // $scope.dokumendetail.clear();
                }
            });
        }
    ];
});