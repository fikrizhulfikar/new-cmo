define([
    'asset/lib/moment/min/moment-with-locales.min',
    'asset/lib/jquery/jquery.min',
    'component/iconplus/master/kendala',
    'component/alt/button/service'
], function(moment){
    return ['$scope', '$route', '$routeParams', '$log', '$button', '$auth', '$window', '$alert', '$validate', '$popup', 'Iconplus_Master_Kendala',
        function($scope, $route, $routeParams, $log,  $button, $auth, $window, $alert, $validate, $popup, Iconplus_Master_Kendala){
        //moment
        moment.locale('id');
        $scope.moment = moment;
        // toolbar
        $scope.toolbar = {
            title: 'Pengelolaan Kendala',
            description: 'Pengelolaan Kendala dari Aplikasi Customer Solution'
        };
        //  $scope.refkendala = {};
        //     Iconplus_Master_Kendala.keyval().then(function(response){
        //     $scope.refkendala = response.data;
        // });
        // breadcrumb
        $scope.breadcrumb = {
            data: [{
                title: alt.title,
                url: alt.baseUrl
            }, {
                title: 'Pengelolaan Kendala',
                url: alt.baseUrl + 'master/kendala/list',
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
                param.limit = $scope.table.limit;
                param.offset = $scope.table.offset;

                // cek apakah sedang mengambil data, batalkan jika ada
                if ($scope.table.isloading != null && $scope.table.isloading.abort)
                    $scope.table.isloading.abort();

                // kirim data ke server
                $scope.table.isloading = Iconplus_Master_Kendala.table(param);
                $scope.table.isloading.then(function (response) {
                    $scope.table.total = response.data.total;
                    $scope.table.data = response.data.list;
                });
            }
        };

        $scope.modal = {
                header: 'Master Project',
                data  : {

                }
            }

        var state = ''; 
       $scope.btnadd = $button('add', {
                title: 'Tambah',
                icon: 'fa fa-plus-circle',
                class: 'btn btn-default',
                onclick: function(){
                    //console.log($scope.kendala);
                    state = 'add';
                    $scope.kendala = {
                        id_kendala:"",
                        fase:"",
                        kendala:"",
                        status_prioritas:"",
                        //created_date:moment().format('DD-MMM-YYYY HH:mm:ss'),
                        created_date:moment().format('DD-MMM-YYYY'),
                        created_by: $auth.userdata.name
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
                        state = 'edit';
                        //$scope.modal.data.item_id = item.item_id;
                        Iconplus_Master_Kendala.retrieve({id_kendala: item.id_kendala}).then(function(response){
                            $scope.kendala = angular.copy(response.data);
                            $scope.modal.data.table = angular.copy(response.data);
                            //console.log($scope.berita);
                            $scope.kendala.id_kendala = response.data.id_kendala;
                            $scope.kendala.fase = response.data.fase;
                            $scope.kendala.kendala = response.data.kendala;
                            $scope.kendala.status_prioritas = response.data.status_prioritas;
                            //$scope.kendala.isdeleted = response.kendala.isdeleted;
                            console.log($scope.kendala.id_kendala);
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
                href: alt.baseUrl + 'master/kendala/detail?action=view&id_kendala=' + item.id_kendala
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
                //console.log($scope.kendala); 
                    if(state == 'add'){
                        //$scope.unit.unitid = angular.element('#unitid').val();
                        var isvalid = $validate()
                            .rule($validate.required($scope.kendala.fase), 'Harap isi nama fase terlebih dahulu!')
                            .rule($validate.required($scope.kendala.kendala), 'Harap isi nama kendala terlebih dahulu!')
                            .rule($validate.required($scope.kendala.status_prioritas), 'Harap isi status terlebih dahulu!')
                            .check();
                        if(!isvalid) return;
                        Iconplus_Master_Kendala.insert({
                            fase: $scope.kendala.fase,
                            kendala: $scope.kendala.kendala,
                            status_prioritas: $scope.kendala.status_prioritas,
                            created_date: $scope.kendala.created_date,
                            created_by: $scope.kendala.created_by}).then(function (response) {
                            $scope.modal.close();
                            $alert.add('Data Kendala berhasil disimpan!', $alert.success);
                            $route.reload();

                            //console.log(response);    
                        });
                    }else if(state == 'edit'){
                        var isvalid = $validate()
                            .rule($validate.required($scope.kendala.fase), 'Harap isi nama fase terlebih dahulu!')
                            .rule($validate.required($scope.kendala.kendala), 'Harap isi nama kendala terlebih dahulu!')
                            .rule($validate.required($scope.kendala.status_prioritas), 'Harap isi status terlebih dahulu!')
                            .check();
                        if(!isvalid) return;
                        $scope.kendala.action = 'edit';
                        Iconplus_Master_Kendala.update({
                            fase: $scope.kendala.fase,
                            kendala: $scope.kendala.kendala,
                            status_prioritas: $scope.kendala.status_prioritas,
                            where:"id_kendala = "+$scope.kendala.id_kendala}).then(function (response) {
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
                        caption: "Anda yakin akan menghapus kendala : " + item.kendala + " ?",
                        buttons: [
                            $button('yes', {
                                onclick: function () {
                                    Iconplus_Master_Kendala.remove({id_kendala: item.id_kendala}).then(function (response) {
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
                    if ($scope.filter.key != 'id_kendala') {
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