// requirejs.s.contexts._.config.shim['asset/lib/jquery-te/jquery-te-1.4.0.min'] = {
//     deps: ['asset/lib/jquery/jquery-2.0.min']
// };


define([
    'component/alt/button/service',
    'component/iconplus/master/pedoman',
    'component/iconplus/master/vprojectstream',
    'component/iconplus/master/vprojectstream',
    // 'asset/lib/jquery-te/jquery-te-1.4.0.min'
], function(){
    return ['$scope', '$route', '$routeParams', '$log', '$button', '$auth', '$window', '$alert', '$validate', '$popup', 'Iconplus_Master_Vprojectstream','Iconplus_Master_Vprojectstream','Iconplus_Master_Pedoman',
        function($scope, $route, $routeParams, $log,  $button, $auth, $window, $alert, $validate, $popup, Iconplus_Master_Vprojectstream,Iconplus_Master_Project,Iconplus_Master_Stream,Iconplus_Master_Pedoman){
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

       

        console.log(Iconplus_Master_Vprojectstream);
        $scope.breadcrumb = {
            data: [{
                title: alt.title,
                url: alt.baseUrl
            }, {
                title: 'Pengelolaan Capaian',
                url: alt.baseUrl + 'master/pedoman/list',
                isactive: true
            }]
        };

        $scope.pedomans = [
            {
                id_pedoman:1,
                judul_dokumen: 'Surat Keterangan',
                keterangan:'test',
                file:'https://robohash.org/velutconsequuntur.png?size=50x50&set=set1',
                modifiedtime:'2019-09-30',
                modifieduser:'Rozy',
            }    
        ];

        console.log($scope.pedomans);


        $scope.$auth = $auth;

        $scope.table = {
            total_data: [],
            isloading: null,
            reload: function () {
                // set parameter untuk dikirim
                var param = angular.copy($scope.table.filter);
                param.limit = $scope.table.limit;
                param.offset = $scope.table.offset;

                // cek apakah sedang mengambil data, batalkan jika ada
                if ($scope.table.isloading != null && $scope.table.isloading.abort)
                    $scope.table.isloading.abort();

                // kirim data ke server
                $scope.table.isloading = Iconplus_Master_Vprojectstream.table(param);
                $scope.table.isloading.then(function (response) {
                    $scope.table.total = response.data.total;
                    $scope.table.data = response.data.list;
                });
            }
        };

        $scope.modal = {
                header: 'Master Role Project',
                data  : {

                }
            }

        var state = ''; 
       $scope.btnadd = $button('add', {
                title: 'Tambah',
                icon: 'fa fa-plus',
                class: 'btn btn-default',
                onclick: function(){
                    state = 'add';
                    $scope.pedoman = {
                        id_pedoman:"",
                        judul_dokumen:"",
                        // createddate:moment().format('DD-MMM-YYYY'),
                        createdby: $auth.userdata.name
                    }
                    $scope.modal.open();
                }
            });

    

       // $scope.btnview = function (index, item) {
       //      return $button('view', {
       //          title: '',
       //          icon:'fa fa-search',
       //          class: 'btn btn-sm btn-info',
       //          href: alt.baseUrl + 'master/capaian/detail?action=view&id_project=' +item.id_project+'&id_stream='+item.id_stream
       //      });
       //  };
           $scope.btnedit = function (index, item) {
                return $button('edit', {
                    title: '',
                    class: 'btn btn-sm btn-warning',
                    onclick:function (){
                         $scope.modal.open();
                    }
                });
            };

        $scope.btnclose =  $button('close', {
                    title: 'Batal',
                    // icon:'fas fa-times-circle',
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
                            .rule($validate.required($scope.pedoman.judul_dokumen), 'Harap isi stream terlebih dahulu!')
                            .rule($validate.required($scope.role_project.nama_project), 'Harap isi capaian terlebih dahulu!')
                           
                            .check();
                        if(!isvalid) return;
                        Iconplus_Master_Role_Project.insert({
                            username: $scope.role_project.username,
                            nama_capaian: $scope.role_project.nama_project,
                            }).then(function (response) {
                            $scope.modal.close();
                            $alert.add('Data berhasil disimpan!', $alert.success);
                            $route.reload();

                            //console.log(response);    
                        });
                    }else if(state == 'edit'){
                        var isvalid = $validate()
                            .rule($validate.required($scope.unit.name), 'Harap isi nama unit terlebih dahulu!')
                            .rule($validate.required($scope.unit.address), 'Harap isi alamat terlebih dahulu!')
                            .rule($validate.required($scope.unit.telp), 'Harap isi telpon terlebih dahulu!')
                            .check();
                        if(!isvalid) return;
                        $scope.unit.action = 'edit';
                        Iconplus_Master_Unit.update({
                            name: $scope.unit.name,
                            sname: $scope.unit.name,
                            address: $scope.unit.address,
                            telp: $scope.unit.telp,
                            where:"unitid = "+$scope.unit.unitid}).then(function (response) {
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
                        caption: "Anda yakin akan menghapus project : " + item.name + " ?",
                        buttons: [
                            $button('yes', {
                                onclick: function () {
                                    Iconplus_Master_Vprojectstream.remove({id_project: item.id_vprojectstream}).then(function (response) {
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