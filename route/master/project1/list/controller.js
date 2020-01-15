requirejs.s.contexts._.config.shim['asset/lib/jquery-te/jquery-te-1.4.0.min'] = {
    deps: ['asset/lib/jquery/jquery-2.0.min']
};


define([
    'asset/lib/moment/min/moment-with-locales.min',
    'asset/lib/jquery/jquery.min',
    'component/alt/button/service',
    'component/iconplus/master/project',
    'component/alt/button/service',
    'asset/lib/jquery-te/jquery-te-1.4.0.min'
], function(moment){
    return ['$scope', '$route', '$routeParams', '$log', '$button', '$auth', '$window', '$alert', '$validate', '$popup', 'Iconplus_Master_Project',
        function($scope, $route, $routeParams, $log,  $button, $auth, $window, $alert, $validate, $popup, Iconplus_Master_Project){
        //moment
        moment.locale('id');
        $scope.moment = moment;
        // toolbar
        $scope.toolbar = {
            title: 'Pengelolaan Project',
            description: 'Pengelolaan Project dari Aplikasi CMO'
        };
        //  $scope.refproject = {};
        //     Iconplus_Master_Project.keyval().then(function(response){
        //     $scope.refproject = response.data;
        // });
        // breadcrumb
        $scope.breadcrumb = {
            data: [{
                title: alt.title,
                url: alt.baseUrl
            }, {
                title: 'Pengelolaan Project',
                url: alt.baseUrl + 'master/project/list',
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
                $scope.table.isloading = Iconplus_Master_Project.table(param);
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
                icon: 'fas fa-plus-circle',
                class: 'btn btn-default',
                onclick: function(){
                    //console.log($scope.project);
                    state = 'add';
                    $scope.project = {
                        id_project:"",
                        nama_project:"",
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
                        // console.log(item.id_berita);
                        Iconplus_Master_Project.retrieve({id_project: item.id_project}).then(function(response){
                            $scope.project = angular.copy(response.data);
                            $scope.modal.data.table = angular.copy(response.data);
                            //console.log($scope.berita);
                            $scope.project.id_project = response.data.id_project;
                            $scope.project.nama_project = response.data.nama_project;
                            //$scope.project.isdeleted = response.project.isdeleted;
                            console.log($scope.project.id_project);
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
                href: alt.baseUrl + 'master/project/detail?action=view&id_project=' + item.id_project
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
                //console.log($scope.project); 
                    if(state == 'add'){
                        //$scope.unit.unitid = angular.element('#unitid').val();
                        var isvalid = $validate()
                            .rule($validate.required($scope.project.nama_project), 'Harap isi nama project terlebih dahulu!')
                            .check();
                        if(!isvalid) return;
                        Iconplus_Master_Project.insert({
                            nama_project: $scope.project.nama_project,
                            created_date: $scope.project.created_date,
                            created_by: $scope.project.created_by}).then(function (response) {
                            $scope.modal.close();
                            $alert.add('Data Project berhasil disimpan!', $alert.success);
                            $route.reload();

                            //console.log(response);    
                        });
                    }else if(state == 'edit'){
                        var isvalid = $validate()
                            .rule($validate.required($scope.project.nama_project), 'Harap isi nama project terlebih dahulu!')
                            .check();
                        if(!isvalid) return;
                        $scope.project.action = 'edit';
                        Iconplus_Master_Project.update({
                            nama_project: $scope.project.nama_project,
                            where:"id_project = "+$scope.project.id_project}).then(function (response) {
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
                        caption: "Anda yakin akan menghapus project : " + item.nama_project + " ?",
                        buttons: [
                            $button('yes', {
                                onclick: function () {
                                    Iconplus_Master_Project.remove({id_project: item.id_project}).then(function (response) {
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
                    if ($scope.filter.key != 'id_project') {
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