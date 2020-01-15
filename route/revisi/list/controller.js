define([
    'asset/lib/moment/min/moment-with-locales.min',
    'component/alt/button/service',
    'component/iconplus/master/vstatusactiviti',
    'component/iconplus/master/vstatusactbidang',
    'component/iconplus/master/vstatusactivitibidang'
], function(moment){
    return ['$scope', '$routeParams', '$auth', '$button', '$log', '$button', '$rootScope',
        'Iconplus_Master_Status_Activiti','Iconplus_Master_Status_Activiti_Bidang','Master_Status_Act_Bidang',
        function($scope, $routeParams, $auth, $button, $log, $button, $rootScope,
                 Iconplus_Master_Status_Activiti,Iconplus_Master_Status_Activiti_Bidang,Master_Status_Act_Bidang){

        moment.locale('id');
        $scope.moment = moment;
        $scope.unitid = $auth.userdata.unitid;

      //pengaturan user
        var test = 'usrPermohonan%';

            $scope.revisi = function() {
                $scope.permohonan.filter.def_key = 'usrPermohonan';
                $rootScope.$emit("TablePermohonanReload", {});
            };

            $scope.verifikasi = function() {
                $scope.permohonan.filter.def_key = 'usrVerifikasi';
                $rootScope.$emit("TablePermohonanReload", {});
            };

            $scope.monail = function() {
                $scope.permohonan.filter.def_key = 'usrAIL';
                $rootScope.$emit("TablePermohonanReload", {});
            };

        // table
        var filter = {
            def_key : test,
            unitup : $scope.unitid
        };


        if($auth.userdata.usergroupid != 1) filter.id_bidang = $scope.unitid;
       /* $scope.btnadd = $button('add', {
            href: alt.baseUrl + 'transaksi/detail' + '?action=add'
        });*/
        $scope.permohonan = {
            filter : filter,
            buttons: function(index, item){
                return[
                    $button('edit', {
                        title: '',
                        description: 'Data Revisi AIL',
                        href: alt.baseUrl + 'revisi/detail?action=edit&id=' + item.task_id_ + '&processInstanceId=' + item.proc_inst_id_
                    })
                ]
             }
        }

            Master_Status_Act_Bidang.list({unitup:$auth.userdata.unitid}).then(function(response){
                angular.forEach(response.data, function(val, key) {
                    $scope.tahap1 = {
                        color: 'blue',
                        icon: 'fa fa-comment',
                        data:{
                            nama: 'Data Induk Langganan',
                            jabatan: '',
                            jumlah: val.jml_dil, /*val.timproinput,*/
                            // url: alt.baseUrl + 'dil/list',
                        },
                    };
                    $scope.tahap2 = {
                        color: 'red',
                        icon: 'fa fa-bar-chart-o',
                        data:{
                            nama: 'Input Arsip Induk Langganan',
                            jabatan: '',
                            jumlah: val.revisi,
                            url: alt.baseUrl + 'revisi/list'
                        }
                    };
                    $scope.tahap3 = {
                        color: 'green',
                        icon: 'fa fa-shopping-cart',
                        data:{
                            nama: 'Verifikasi Arsip Induk Langganan',
                            jabatan: '',
                            jumlah: val.verifikasi,
                            url: alt.baseUrl + 'verifikasi/list'
                        }
                    };
                    $scope.tahap4 = {
                        color: 'yellow',
                        icon: 'fa fa-television',
                        data:{
                            nama: 'Monitoring Arsip Induk Langganan',
                            jabatan: '',
                            jumlah: val.ailcomplete,
                            url: alt.baseUrl + 'monitoring/ail/list'
                        }
                    };
                });

            });

    }];
});