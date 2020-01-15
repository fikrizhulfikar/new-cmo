// requirejs.s.contexts._.config.shim['asset/lib/jquery-te/jquery-te-1.4.0.min'] = {
//     deps: ['asset/lib/jquery/jquery-2.0.min']
// };


define([
    'component/alt/button/service',
    'component/iconplus/master/capaian',
    'component/iconplus/master/vprojectstream',
    'asset/lib/jquery-te/jquery-te-1.4.0.min'
], function(){
    return ['$scope', '$route', '$routeParams', '$log', '$button', '$auth', '$window', '$alert', '$validate', '$popup', 'Iconplus_Master_Vprojectstream','Iconplus_Master_Capaian',
        function($scope, $route, $routeParams, $log,  $button, $auth, $window, $alert, $validate, $popup, Iconplus_Master_Vprojectstream,Iconplus_Master_Capaian ){
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

            $scope.detail = {
                action: $routeParams.action,
                id_project: $routeParams.id_project,
                id_stream: $routeParams.id_stream
            };


            if($routeParams.action == 'view'){
                if ($scope.detail.id_project != '') Iconplus_Master_Vprojectstream.retrieve({
                    id_project: $scope.detail.id_project,
                    id_stream: $scope.detail.id_stream
                }).then(function(response){
                        $scope.capaian = angular.copy(response.data);

                     });
            }



            if($routeParams.action == 'add'){
                if ($scope.detail.id_project != '') Iconplus_Master_Vprojectstream.retrieve({id_project: $scope.detail.id_project}).then(function(response){
                        $scope.capaian = angular.copy(response.data);

                     });
            }


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
                $scope.table.isloading = Iconplus_Master_Capaian.table(param);
                $scope.table.isloading.then(function (response) {
                    $scope.table.total = response.data.total;
                    $scope.table.data = response.data.list;
                });

            }
        };

        $scope.modal = {
                header: 'Master Capaian',
                data  : {

                }
            }

        var state = ''; 
       $scope.btnadd = $button('add', {
                title: 'Capaian',
                icon: 'fa fa-plus-circle',
                class: 'btn btn-default',
                onclick: function(){
                    state = 'add';
                    $scope.unit = {
                        id_unit:"",
                        nama_unit:"",
                        // createddate:moment().format('DD-MMM-YYYY'),
                        createdby: $auth.userdata.name
                    }
                    $scope.modal.open();
                }
            });

        $scope.btnedit = function (index, item) {
                return $button('edit', {
                    title: '',
                    class: 'btn btn-sm btn-warning',
                    onclick: function(){
                        //$('.jqte_editor').jqteVal('');
                        // console.log(item.id_capaian);
                        console.log(item);
                        state = 'edit';
                        Iconplus_Master_Capaian.list({id_capaian: item.id_capaian}).then(function(response){

                            $scope.capaian = angular.copy(response.data[0]);
                            // $scope.modal.data.table = angular.copy(response.data);
                            console.log($scope.capaian);
                            $scope.modal.open();
                        });

                        
                    }
                });
            };

       $scope.btnview = function (index, item) {
            return $button('view', {
                title: '',
                icon:'fa fa-eye ',
                class: 'btn btn-sm btn-info',
                href: alt.baseUrl + 'master/capaian/more/?action=view'
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
                            .rule($validate.required($scope.capaian.nama_project), 'Harap isi nama unit terlebih dahulu!')
                            .rule($validate.required($scope.capaian.nama_stream), 'Harap isi alamat terlebih dahulu!')
                             .rule($validate.required($scope.capaian.nama_capaian), 'Harap isi alamat terlebih dahulu!')
                            .check();
                        if(!isvalid) return;
                        Iconplus_Master_Capaian.insert({
                            id_stream: $routeParams.id_stream,
                            id_project: $routeParams.id_project,
                            nama_capaian: $scope.capaian.nama_capaian,


                        }).then(function (response) {
                            console.log(response);    
                            $scope.modal.close();
                            $alert.add('Data berhasil disimpan!', $alert.success);
                            $route.reload();

                            //console.log(response);    
                        });
                    }else if(state == 'edit'){
                        var isvalid = $validate()
                            .rule($validate.required($scope.capaian.id_capaian), 'Harap isi nama unit terlebih dahulu!')
                            .rule($validate.required($scope.capaian.nama_capaian), 'Harap isi alamat terlebih dahulu!')
                            .check();
                        if(!isvalid) return;
                        Iconplus_Master_Capaian.update({
                            id_capaian: $scope.capaian.id_capaian,
                            nama_capaian: $scope.capaian.nama_capaian,
                            where:"id_capaian = "+$scope.capaian.id_capaian}).then(function (response) {
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
                        caption: "Anda yakin akan menghapus capaian : " + item.name + " ?",
                        buttons: [
                            $button('yes', {
                                onclick: function () {
                                    Iconplus_Master_Capaian.remove({id_capaian: item.id_capaian}).then(function (response) {
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