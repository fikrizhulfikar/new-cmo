define([
    'asset/lib/moment/min/moment-with-locales.min',
    'component/alt/button/service',
    'component/iconplus/master/vprojecttahapan',
    'component/iconplus/master/project',
    'component/iconplus/master/tahapan'
], function(moment){
    return ['$scope', '$route', '$routeParams', '$log', '$button', '$auth', '$window', '$alert', '$validate', '$popup', 'Iconplus_Master_Tahapan', 'Iconplus_Master_Project', 'Iconplus_Master_Vprojecttahapan',
        function($scope, $route, $routeParams, $log, $button, $auth, $window, $validate, $popup, $popup, Iconplus_Master_Tahapan, Iconplus_Master_Project, Iconplus_Master_Vprojecttahapan){
        //moment
        moment.locale('id');
        $scope.moment = moment;
        // toolbar
        $scope.toolbar = {
            title: 'Pengelolaan Tahapan',
            description: 'Pengelolaan Tahapan dari Aplikasi CMO'
        }; 

        $scope.reftahapan = {};
            Iconplus_Master_Vprojecttahapan.keyval().then(function(response){
            $scope.reftahapan = response.data;
        });

        $scope.id_project = $routeParams.id_project;
        $scope.action = $routeParams.action;
        $scope.$auth = $auth;

        Iconplus_Master_Project.list().then(function(response){
            $scope.listproject  = angular.copy(response.data)
        });

        Iconplus_Master_Tahapan.list().then(function(response){
            $scope.listtahapan = angular.copy(response.data)
        });

        if ($routeParams.action == 'add') {
                //$scope.project = {};
            if ($scope.detail.id_project != '') 
                Iconplus_Master_Project.retrieve({id_project: $scope.detail.id_project}).then(function(response){
                $scope.project = angular.copy(response.data);
                // console.log($scope.id_tab);
                // console.log(response.data);
                console.log($scope.project);
            });
        }

        if($routeParams.action == 'view'){
            if ($scope.detail.id_project != '') 
                Iconplus_Master_Project.retrieve({id_project: $scope.detail.id_project}).then(function(response){
                $scope.project = angular.copy(response.data);
                // console.log($scope.id_tab);
                // console.log(response.data);
                console.log($scope.project);
            });
        }

        if($routeParams.action == 'edit'){
            if ($scope.detail.id_project != '') 
                Iconplus_Master_Project.retrieve({id_project: $scope.detail.id_project}).then(function(response){
                $scope.project = angular.copy(response.data);
                // console.log($scope.id_tab);
                // console.log(response.data);
                console.log($scope.project);
            });
        }

        Iconplus_Master_Project.list({
                select:"nama_project",
                //order:"item_id"
            }).then(function(response){
            $scope.listproject = response.data;
        });

        $scope.pilih_project = function (item) {
            $scope.project.nama_project = item.nama_project; 
                Iconplus_Master_Tahapan.list({
                    select:"nama_project",
                    where:"id_project = "+$scope.project.id_project,
                }).then(function(response){
                    $scope.listtahapan = response.data;
                });
            };

        $scope.pilih_tahapan = function (item) {
            $scope.tahapan.id_tahapan = item.id_tahapan;
            $scope.tahapan.nama_tahapan = item.nama_tahapan;
        };

        $scope.breadcrumb = {
            data: [{
                title: alt.title,
                url: alt.baseUrl
            }, {
                title: 'Pengelolaan Tahapan',
                url: alt.baseUrl + 'master/tahapan/list',
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
                param.where = "id_project = '" +$routeParams.id_project+ "'";

                // cek apakah sedang mengambil data, batalkan jika ada
                if ($scope.table.isloading != null && $scope.table.isloading.abort)
                    $scope.table.isloading.abort();

                // kirim data ke server
                $scope.table.isloading = Iconplus_Master_Vprojecttahapan.table(param);
                $scope.table.isloading.then(function (response) {
                    $scope.table.total = response.data.total;
                    $scope.table.data = response.data.list;
                });
            }
        };

        $scope.modal = {
                header: 'Master Tahapan',
                data  : {

                }
            }

        var state = '';    

       $scope.btnadd = $button('add', {
                title: 'Tambah',
                icon: 'fa fa-plus',
                class: 'btn btn-default',
                onclick: function(){
                    //console.log($scope.tahapan);
                Iconplus_Master_Project.retrieve({id_project: $scope.detail.id_project}).then(function(response){
                $scope.project = angular.copy(response.data);
                    state = 'add';
                    $scope.tahapan = {
                        id_tahapan:"",
                        nama_tahapan:"",
                        id_project: $scope.project.id_project,
                        nama_project: $scope.project.nama_project,
                        //created_date:moment().format('DD-MMM-YYYY HH:mm:ss'),
                        created_date:moment().format('DD-MMM-YYYY'),
                        created_by: $auth.userdata.name
                    }
                    $scope.modal.open();
                }
            });

        $scope.$auth = $auth;


        $scope.btnedit = function (index, item) {
                return $button('edit', {
                    title: '',
                    class: 'btn btn-sm btn-warning',
                    onclick: function(){
                        //$('.jqte_editor').jqteVal('');
                        state = 'edit';
                        //$scope.modal.data.item_id = item.item_id;
                        // console.log(item.id_berita);
                        Iconplus_Master_Vprojecttahapan.retrieve({id_tahapan: item.id_tahapan}).then(function(response){
                            $scope.tahapan = angular.copy(response.data);
                            $scope.modal.data.table = angular.copy(response.data);
                            //console.log($scope.berita);
                            $scope.tahapan.id_tahapan = response.data.id_tahapan;
                            $scope.tahapan.nama_tahapan = response.data.nama_tahapan;
                            $scope.tahapan.nama_project = response.data.nama_project;
                            //$scope.tahapan.isdeleted = response.tahapan.isdeleted;
                            console.log($scope.tahapan.id_tahapan);
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
                href: alt.baseUrl + 'master/tahapan/detail?action=view&id_tahapan=' + item.id_tahapan
            });
        };

        $scope.btnclose =  $button('close', {
                    title: 'Batal',
                    icon:'fa fa-times',
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
                            .rule($validate.required($scope.tahapan.nama_tahapan), 'Harap isi nama tahapan terlebih dahulu!')
                            .check();
                        if(!isvalid) return;
                        Iconplus_Master_Tahapan.insert({
                            id_project: $scope.tahapan.id_project,
                            nama_tahapan: $scope.tahapan.nama_tahapan,
                            created_date: $scope.tahapan.created_date,
                            created_by: $scope.tahapan.created_by}).then(function (response) {
                            $scope.modal.close();
                            $alert.add('Data Tahapan berhasil disimpan!', $alert.success);
                            $route.reload();

                            //console.log(response);    
                        });
                    }else if(state == 'edit'){
                        var isvalid = $validate()
                            .rule($validate.required($scope.tahapan.nama_tahapan), 'Harap isi nama tahapan terlebih dahulu!')
                            .check();
                        if(!isvalid) return;
                        $scope.tahapan.action = 'edit';
                        Iconplus_Master_Tahapan.update({
                            nama_tahapan: $scope.tahapan.nama_tahapan,
                            where:'id_project = '+$scope.tahapan.id_project+ ' and id_tahapan = '+$scope.tahapan.id_tahapan}).then(function (response) {
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
                        caption: "Anda yakin akan menghapus tahapan : " + item.nama_tahapan + " ?",
                        buttons: [
                            $button('yes', {
                                onclick: function () {
                                    Iconplus_Master_Tahapan.remove({id_tahapan: item.id_tahapan}).then(function (response) {
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
                    if ($scope.filter.key != 'id_tahapan') {
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