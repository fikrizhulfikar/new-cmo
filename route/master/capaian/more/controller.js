// requirejs.s.contexts._.config.shim['asset/lib/jquery-te/jquery-te-1.4.0.min'] = {
//     deps: ['asset/lib/jquery/jquery-2.0.min']
// };


define([
    'component/alt/button/service',
    'component/iconplus/master/capaian',
    'component/iconplus/master/vprojectstream',
     'component/iconplus/master/vstreamcapaian',
    'asset/lib/jquery-te/jquery-te-1.4.0.min'
], function(){
    return ['$scope', '$route', '$routeParams', '$log', '$button', '$auth', '$window', '$alert', '$validate', '$popup', 'Iconplus_Master_Vprojectstream','Iconplus_Master_Capaian','Iconplus_Master_Vstreamcapaian',
        function($scope, $route, $routeParams, $log,  $button, $auth, $window, $alert, $validate, $popup, Iconplus_Master_Vprojectstream,Iconplus_Master_Capaian,Iconplus_Master_Vstreamcapaian ){
        // toolbar
        $scope.toolbar = {
            title: 'Pengelolaan Capaian',
            description: 'Pengelolaan Capaian dari Aplikasi CMO'
        };
        //  $scope.refvprojectstream = {};
        //     Iconplus_Master_Vprojectstream.keyval().then(function(response){
        //     $scope.refvprojectstream = response.data;
        // });
        // breadcrumb
        $scope.breadcrumb = {
            data: [{
                title: alt.title,
                url: alt.baseUrl
            }, {
                title: 'Pengelolaan Capaian',
                url: alt.baseUrl + 'master/capaian/list',
                isactive: true
            }]
        };


        $scope.$auth = $auth;

        $scope.table = {
            total_data: [],
            isloading: null,
            reload: function () {
                // set parameter untuk dikirim
                var param = angular.copy($scope.table.filter);
                param.orderby = "id_project"
                param.limit = $scope.table.limit;
                param.offset = $scope.table.offset;
                
                // cek apakah sedang mengambil data, batalkan jika ada
                if ($scope.table.isloading != null && $scope.table.isloading.abort)
                    $scope.table.isloading.abort();

                // kirim data ke server
                $scope.table.isloading = Iconplus_Master_Vstreamcapaian.table(param);
                $scope.table.isloading.then(function (response) {
                    $scope.table.total = response.data.total;
                    $scope.table.data = response.data.list;
                });
            }
        };

        $scope.modal = {
                header: 'Master Aktivitas',
                data  : {

                }
            }

        var state = ''; 
       $scope.btnadd = $button('add', {
                title: 'Tambah',
                icon: 'fa fa-plus-circle',
                class: 'btn btn-default',
                onclick: function(){
                    state = 'add';
                    $scope.aktivitas = {
                        id_capaian:"",
                        nama_capaian:"",
                        // createddate:moment().format('DD-MMM-YYYY'),
                        createdby: $auth.userdata.name
                    }
                    $scope.modal.open();
                }
            });

       $scope.btnupload = $button('upload', {
                title: 'Upload',
                icon: 'fa fa-plus-circle',
                class: 'btn btn-info',
            });

        $scope.btnedit = function (index, item) {
                return $button('edit', {
                    title: '',
                    class: 'btn btn-sm btn-warning',
                    onclick: function(){
                        //$('.jqte_editor').jqteVal('');
                        state = 'edit';
                        //$scope.modal.data.item_id = item.item_id;
                        // console.log(item.id_berita);

                        Iconplus_Master_Aktivitas.list({id_aktivitas: item.id_aktivitas}).then(function(response){
                            $scope.aktivitas = angular.copy(response.data);
                            // $scope.modal.data.table = angular.copy(response.data);
                            //console.log($scope.berita);
                            // $scope.unit.unitid = response.data.unitid;
                            // $scope.unit.name = response.data.name;
                            // $scope.unit.sname = response.data.sname;
                            // $scope.unit.isdeleted = response.data.isdeleted;
                            // $scope.unit.address = response.data.address;
                            // $scope.unit.telp = response.data.telp;
                            // $scope.unit.fax = response.data.fax;
                            console.log($scope.id_aktivitas);
                            //angular.element('.jqte_editor').append(response.data.konten); //'.jqte_editor' <= class editornya
                            //angular.element('textarea').append(response.data.konten);
                        
                            $scope.modal.open();
                        });

                        
                    }
                });
            };

       $scope.btnview = function (index, item) {
            return $button('view', {
                title: '',
                icon:'fa fa-eye',
                class: 'btn btn-sm btn-info',
                href: alt.baseUrl + 'master/capaian/detail?action=view&id_project=' +item.id_project+'&id_stream='+item.id_stream+'&id_capaian='+item.id_capaian
            });
        };

        $scope.btnclose =  $button('close', {
                    title: 'Batal',
                    icon:'fas fa-times-circle',
                    class: 'btn btn-sm btn-danger',
                    onclick: function(){
                        $scope.modal.close();
                      $route.reload();
                       
                    }
                });

        $scope.btnsave = $button('save', {
                title: 'Simpan',
                onclick: function(){ 
                    if(state == 'add'){
                        //$scope.unit.unitid = angular.element('#unitid').val();
                        var isvalid = $validate()
                            .rule($validate.required($scope.aktivitas.id_project), 'Harap isi nama unit terlebih dahulu!')
                            .rule($validate.required($scope.aktivitas.id_stream), 'Harap isi alamat terlebih dahulu!')
                            .rule($validate.required($scope.aktivitas.id_capaian), 'Harap isi alamat terlebih dahulu!')
                            .rule($validate.required($scope.aktivitas.id_aktivitas), 'Harap isi nama unit terlebih dahulu!')
                            .rule($validate.required($scope.aktivitas.nama_aktivitas), 'Harap isi alamat terlebih dahulu!')
                            .check();
                        if(!isvalid) return;
                        Iconplus_Master_Aktivitas.insert({
                            id_project: $routeParams.id_project,
                            id_stream: $routeParams.id_stream,
                            id_capaian: $routeParams.id_capaian,
                            // id_aktivitas: $routeParams.id_aktivitas,
                            nama_aktivitas: $scope.aktivitas.nama_aktivitas}).then(function (response) {
                            // console.log(response);    
                            $scope.modal.close();
                            $alert.add('Data berhasil disimpan!', $alert.success);
                            $route.reload();

                            //console.log(response);    
                        });
                    }else if(state == 'edit'){
                        var isvalid = $validate()
                            .rule($validate.required($scope.aktivitas.nama_aktivitas), 'Harap isi nama unit terlebih dahulu!')
                            
                            .rule($validate.required($scope.aktivitas.id_aktivitas), 'Harap isi telpon terlebih dahulu!')
                            .check();
                        if(!isvalid) return;
                        $scope.unit.action = 'edit';
                        Iconplus_Master_Aktivitas.update({
                            id_aktivitas: $scope.aktivitas.id_aktivitas,
                            nama_aktivitas: $scope.aktivitas.nama_aktivitas,
                            
                            // telp: $scope.unit.telp,
                            where:"id_aktivitas = "+$scope.aktivitas.id_aktivitas}).then(function (response) {
                            $scope.modal.close();
                            $alert.add('Data berhasil diubah!', $alert.success);
                            $route.reload();
                            //console.log(response);    
                        });
                    }
                }
            });

        $scope.btnremove = function (index, item) {
            return $button('remove', {
                title: '',
                class: 'btn btn-sm btn-danger',
                onclick: function () {
                    $popup.confirm({
                        caption: "Anda yakin akan menghapus aktivitas : " + item.name + " ?",
                        buttons: [
                            $button('yes', {
                                onclick: function () {
                                    Iconplus_Master_Aktivitas.remove({id_aktivitas: item.id_aktivitas}).then(function (response) {
                                        $scope.table.reload();
                                        $alert.add('Data berhasil dihapus!', $alert.success);
                                    });
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
                }
            });
        };
        $scope.$watch('filter',function(val, oldval){
            if(oldval.key != val.key){
                $scope.filter.value = '';
            }else {
                if ($scope.filter.key && $scope.filter.value) {
                    if ($scope.filter.key != 'unitid') {
                        $scope.table.filter[$scope.filter.key] = $scope.filter.value;
                    } else {
                        $scope.table.filter['where'] = $scope.filter.key + ' = ' + $scope.filter.value;
                    }
                } else {
                    $scope.table.filter = {};
                }
            }
        },true);
    }];
});