define([
    'asset/lib/moment/min/moment-with-locales.min',
    'component/alt/button/service'
], function(moment){
    return ['$scope', '$routeParams', '$auth', '$log', '$button', function($scope, $routeParams, $auth, $log, $button){

        moment.locale('id');
        $scope.moment = moment;
        $scope.unitid = $auth.userdata.unitid;

        // toolbar
        $scope.toolbar = {
            title: 'Persetujuan Permohonan',
            description: 'Persetujuan Permohonan'
        };

        // breadcrumb
        $scope.breadcrumb = {
            data: [{
                title: 'Persetujuan Permohonan'
            }, {
                title: 'Persetujuan Permohonan',
                isactive: true
            }]
        };



//pengaturan user
        if($auth.userdata.usergroupid == 1) {
            var test = 'usrVerifikasi%';
        }
        // else if($auth.userdata.usergroupid == 9 || $auth.userdata.usergroupid == 4)
        else if($auth.userdata.usergroupid == 3)
        {
            var test = 'usrVerifikasiSTI';
        }
        else if($auth.userdata.usergroupid == 4)
        {
            var test = 'usrVerifikasiKPK';
        }
        //        // table
        $scope.permohonan = {
            filter : {
                def_key : test
                // ,
                //untuk unit ataupun bidang nya di isi disini mas
                // id_bidang : $scope.unitid //2
                //
            },
            buttons: function(index, item){
                var path = '',
                //di url nya jangan lupa di tambhakan
                //     url = $scope.url[item.definitionKey,item.id_bidang],
                //     url = $scope.url[item.definitionKey],
                    redir = '';
                //
                if(item.def_key == 'usrPermohonanSurvey'){
                    path = 'aktivasicubicle';
                    redir = '&redir=aktivasi';
                }
                else {
                    path = 'detail';
                }

                return [
                    // $button('view', {
                    //     title: '',
                    //     // href: alt.baseUrl + 'praproyek/permohonan/integrasi?action=view&id=' + item.id + redir + '&processInstanceId=' + item.processInstanceId,
                    //     href: alt.baseUrl + 'spb/timpro/permohonan?action=view&id=' + item.id,
                    //     class: 'btn btn-sm btn-info'
                    // }),
                    $button('', {
                        title: '',
                        description: path == 'detail' ? 'Tim Proyek' : 'Tim Proyek',
                        href: alt.baseUrl + 'odp/verifikasi/' + path + '?action=edit&id=' + item.id + '&proc_inst_id_=' + item.proc_inst_id_,
                        icon: 'fa fa-edit',
                        style: '',
                        class: path == 'detail_info' ? 'btn btn-sm btn-info' : 'btn btn-sm btn-warning'
                    })
                ];
            }
        };
    }];
});

