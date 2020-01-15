requirejs.s.contexts._.config.shim['asset/lib/jquery-te/jquery-te-1.4.0.min'] = {
    deps: ['asset/lib/jquery/jquery-2.0.min']
};


define([
    'asset/lib/moment/min/moment-with-locales.min',
    'asset/lib/jquery/jquery.min',
    'component/alt/button/service',
    'component/iconplus/master/unit',
    'component/alt/button/service',
    'asset/lib/jquery-te/jquery-te-1.4.0.min'
], function(moment){
    return ['$scope', '$route', '$routeParams', '$log', '$button', '$auth', '$window', '$alert', '$validate', '$popup', 'Iconplus_Master_Unit',
        function($scope, $route, $routeParams, $log,  $button, $auth, $window, $alert, $validate, $popup, Iconplus_Master_Unit){
        //moment
        moment.locale('id');
        $scope.moment = moment;
        // toolbar
        $scope.toolbar = {
            title: 'Pengelolaan Unit',
            description: 'Pengelolaan Unit dari Aplikasi CMO'
        };
         $scope.refunit = {};
            Iconplus_Master_Unit.keyval().then(function(response){
            $scope.refunit = response.data;
        });
        // breadcrumb
        $scope.breadcrumb = {
            data: [{
                title: alt.title,
                url: alt.baseUrl
            }, {
                title: 'Pengelolaan Unit',
                url: alt.baseUrl + 'master/unit/list',
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
                $scope.table.isloading = Iconplus_Master_Unit.table(param);
                $scope.table.isloading.then(function (response) {
                    $scope.table.total = response.data.total;
                    $scope.table.data = response.data.list;
                });
            }
        };

        $scope.modal = {
                header: 'Master Unit',
                data  : {

                }
            }

        var state = ''; 
       $scope.btnadd = $button('add', {
                title: 'Tambah',
                icon: 'fas fa-plus-circle',
                class: 'btn btn-default',
                onclick: function(){
                    //console.log($scope.unit);
                    state = 'add';
                    $scope.unit = {
                        id_unit:"",
                        kode_unit:"",
                        nama_unit:"",
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
                        Iconplus_Master_Unit.retrieve({id_unit: item.id_unit}).then(function(response){
                            $scope.unit = angular.copy(response.data);
                            $scope.modal.data.table = angular.copy(response.data);
                            $scope.unit.id_unit = response.data.id_unit;
                            $scope.unit.kode_unit = response.data.kode_unit;
                            $scope.unit.nama_unit = response.data.nama_unit;
                            //$scope.unit.isdeleted = response.unit.isdeleted;
                            console.log($scope.unit.id_unit);
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
                href: alt.baseUrl + 'master/unit/detail?action=view&id_unit=' + item.id_unit
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
                //console.log($scope.unit); 
                    if(state == 'add'){
                        //$scope.unit.unitid = angular.element('#unitid').val();
                        var isvalid = $validate()
                            .rule($validate.required($scope.unit.kode_unit), 'Harap isi kode unit terlebih dahulu!')
                            .rule($validate.required($scope.unit.nama_unit), 'Harap isi nama unit terlebih dahulu!')
                            .check();
                        if(!isvalid) return;
                        Iconplus_Master_Unit.insert({
                            kode_unit: $scope.unit.kode_unit,
                            nama_unit: $scope.unit.nama_unit,
                            created_date: $scope.unit.created_date,
                            created_by: $scope.unit.created_by}).then(function (response) {
                            $scope.modal.close();
                            $alert.add('Data Unit berhasil disimpan!', $alert.success);
                            $route.reload();

                            //console.log(response);    
                        });
                    }else if(state == 'edit'){
                        var isvalid = $validate()
                            .rule($validate.required($scope.unit.kode_unit), 'Harap isi kode unit terlebih dahulu!')
                            .rule($validate.required($scope.unit.nama_unit), 'Harap isi nama unit terlebih dahulu!')
                            .check();
                        if(!isvalid) return;
                        $scope.unit.action = 'edit';
                        Iconplus_Master_Unit.update({
                            kode_unit: $scope.unit.kode_unit,
                            nama_unit: $scope.unit.nama_unit,
                            where:"id_unit = "+$scope.unit.id_unit}).then(function (response) {
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
                        caption: "Anda yakin akan menghapus unit : " + item.nama_unit + " ?",
                        buttons: [
                            $button('yes', {
                                onclick: function () {
                                    Iconplus_Master_Unit.remove({id_unit: item.id_unit}).then(function (response) {
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
                    if ($scope.filter.key != 'id_unit') {
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