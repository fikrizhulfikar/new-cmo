requirejs.s.contexts._.config.shim['asset/lib/jquery-te/jquery-te-1.4.0.min'] = {
    deps: ['asset/lib/jquery/jquery-2.0.min']
};


define([
    'asset/lib/moment/min/moment-with-locales.min',
    'asset/lib/jquery/jquery.min',
    'component/alt/button/service',
    'component/iconplus/master/vprojectstream',
    'component/iconplus/master/project',
    'component/iconplus/master/stream',
    'component/alt/button/service',
    'asset/lib/jquery-te/jquery-te-1.4.0.min'
], function(moment){
    return ['$scope', '$route', '$routeParams', '$log', '$button', '$auth', '$window', '$alert', '$validate', '$popup', 'Iconplus_Master_Vprojectstream', 'Iconplus_Master_Project', 'Iconplus_Master_Stream',
        function($scope, $route, $routeParams, $log,  $button, $auth, $window, $alert, $validate, $popup, Iconplus_Master_Vprojectstream, Iconplus_Master_Project, Iconplus_Master_Stream){
        //moment
        moment.locale('id');
        $scope.moment = moment;
        // toolbar
        $scope.toolbar = {
            title: 'Pengelolaan Stream',
            description: 'Pengelolaan Stream dari Aplikasi CMO'
        };
        $scope.refstream = {};
            Iconplus_Master_Vprojectstream.keyval().then(function(response){
            $scope.refstream = response.data;
        });

        $scope.id_project = $routeParams.id_project;
        $scope.action = $routeParams.action;
        $scope.$auth = $auth;

        Iconplus_Master_Project.list().then(function(response){
            $scope.listproject  = angular.copy(response.data)
        });

        Iconplus_Master_Stream.list().then(function(response){
            $scope.liststream = angular.copy(response.data)
        });

        $scope.detail = {
            action: $routeParams.action,
            id_project: $routeParams.id_project,
            id_stream: $routeParams.id_stream
        };

        $scope.project = {};
        
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
                Iconplus_Master_Stream.list({
                    select:"nama_project",
                    where:"id_project = "+$scope.project.id_project,
                }).then(function(response){
                    $scope.liststream = response.data;
                });
            };

            $scope.pilih_stream = function (item) {
                $scope.stream.id_stream = item.id_stream;
                $scope.stream.nama_stream = item.nama_stream;
            };

        // breadcrumb
        $scope.breadcrumb = {
            data: [{
                title: alt.title,
                url: alt.baseUrl
            }, {
                title: 'Pengelolaan Stream',
                url: alt.baseUrl + 'master/stream/list',
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
                $scope.table.isloading = Iconplus_Master_Vprojectstream.table(param);
                $scope.table.isloading.then(function (response) {
                    $scope.table.total = response.data.total;
                    $scope.table.data = response.data.list;
                });
            }
        };

        $scope.modal = {
                header: 'Master Stream',
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
                Iconplus_Master_Project.retrieve({id_project: $scope.detail.id_project}).then(function(response){
                $scope.project = angular.copy(response.data);
                // console.log($scope.id_tab);
                  state = 'add';
                    $scope.stream = {
                        id_stream:"",
                        nama_stream:"",
                        id_project: $scope.project.id_project,
                        nama_project: $scope.project.nama_project,
                        //created_date:moment().format('DD-MMM-YYYY HH:mm:ss'),
                        created_date:moment().format('DD-MMM-YYYY'),
                        created_by: $auth.userdata.name
                    }
                    $scope.modal.open();
                // console.log(response.data);
                console.log($scope.project);
                });
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

                        Iconplus_Master_Vprojectstream.retrieve({id_stream: item.id_stream}).then(function(response){
                            $scope.stream = angular.copy(response.data);
                            $scope.modal.data.table = angular.copy(response.data);
                            //console.log($scope.berita);
                            $scope.stream.id_stream = response.data.id_stream;
                            $scope.stream.nama_stream = response.data.nama_stream;
                            $scope.stream.nama_project = response.data.nama_project;
                            //$scope.unit.isdeleted = response.data.isdeleted;
                            console.log($scope.stream.id_stream);
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
                href: alt.baseUrl + 'master/stream/detail?action=view&id_stream=' + item.id_stream
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
                            .rule($validate.required($scope.stream.nama_stream), 'Harap isi nama stream terlebih dahulu!')
                            .check();
                        if(!isvalid) return;
                        Iconplus_Master_Stream.insert({
                            id_project: $scope.stream.id_project,
                            nama_stream: $scope.stream.nama_stream,
                            created_date: $scope.stream.created_date,
                            created_by: $scope.stream.created_by}).then(function (response) {
                            $scope.modal.close();
                            $alert.add('Data berhasil disimpan!', $alert.success);
                            $route.reload();
                            //console.log(response);    
                        });
                    }else if(state == 'edit'){
                        var isvalid = $validate()
                            .rule($validate.required($scope.stream.nama_stream), 'Harap isi nama stream terlebih dahulu!')
                            .check();
                        if(!isvalid) return;
                        $scope.stream.action = 'edit';
                        Iconplus_Master_Stream.update({
                            nama_stream: $scope.stream.nama_stream,
                            where:'id_project = '+$scope.stream.id_project+ ' and id_stream = '+$scope.stream.id_stream}).then(function (response) {
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
                        caption: "Anda yakin akan menghapus stream : " + item.nama_stream + " ?",
                        buttons: [
                            $button('yes', {
                                onclick: function () {
                                    Iconplus_Master_Stream.remove({id_stream: item.id_stream}).then(function (response) {
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
                    if ($scope.filter.key != 'id_stream') {
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