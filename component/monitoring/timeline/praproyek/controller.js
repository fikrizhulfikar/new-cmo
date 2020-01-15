define(
[    'asset/lib/moment/min/moment-with-locales.min',
    'component/alt/button/service',
    'component/alt/tabset/controller',
    'component/pusharlis/master/unit',
    'component/system/user/usergroup'
], function (moment) {
    return [
        '$scope', '$routeParams', '$log', '$button', '$popup', '$validate', '$alert', '$window', 'Pusharlis_Master_Unit', 'System_User_Usergroup',
        function ($scope, $routeParams, $log, $button, $popup, $validate, $alert, $window, Pusharlis_Master_Unit, System_User_Usergroup) {
            moment.locale('id');
            $scope.moment = moment;
            $scope.action = $routeParams.action;

            $scope.sla = {};
            $scope.user = {};
            $scope.usergroup = {};

            System_User_Usergroup.list().then(function(response){
                angular.forEach(response.data, function(val, key){
                    $scope.usergroup[val.usergroupid] = val;
                });
            });
            $scope.$watch('sla',function(val,key){
                $scope.detail.data[0].sla = val.permohonan;
                $scope.detail.data[1].sla = val.approvalsti;
                $scope.detail.data[2].sla = val.verifikasikpk;
                $scope.detail.data[3].sla = val.pelaksanaan;
            });

            $scope.data = {};
            $scope.history = [];

            $scope.$watchGroup(['data','history'],function(val){
                if(Object.keys(val[0]).length > 0 && Object.keys(val[1])){
                    $scope.writeData(val[0],val[1])
                }
            });




            $scope.writeData = function(data, history){
                for(var i = 0; i <= 3; i++) $scope.detail.data[i].tables = [];
                $scope.detail.data[0].icon = (data.processVariable['usrPermohonan_tglproses']) ? 'green':'red';
                $scope.detail.data[1].icon = (data.processVariable['usrVerifikasiSTI_userid']) ? 'green':'red';
                $scope.detail.data[2].icon = (data.processVariable['usrVerifikasiKPK_userid']) ? 'green':'red';
                $scope.detail.data[3].icon = (data.processVariable['usrProsesUnit_userid']) ? 'green':'red';
                // $scope.detail.data[4].icon = (data.processVariable['usrBiayaKesepakatan_tglproses']) ? 'green':'red';


                var dokumenhasilsurvey = [];
                var dokumentor = [];
                var usrKoordinasi_dokumen = [];
                var usrPermohonan_kuitansi_dokumen = [];
                angular.forEach(data,function(val,key){
                    if(key.indexOf('usrHasilSurvey_') == 0)
                        dokumenhasilsurvey.push(val[0]);
                    if(key.indexOf('usrReview_') == 0)
                        dokumentor.push(val[0]);
                    if(key.indexOf('usrKoordinasi_') == 0)
                        usrKoordinasi_dokumen.push(val[0]);
                    if(key.indexOf('usrPermohonan_') == 0)
                        usrPermohonan_kuitansi_dokumen.push(val[0]);
                });

                $scope.detail.data[0].tables.push({
                    flow: 'Permohonan - Network Request',
                    nosurat : data.processVariable['usrPermohonan_nomorsurat'],
                    tgldok: data.processVariable['usrPermohonan_tglproses'] ? data.processVariable['usrPermohonan_tglproses'] : '',
                    tglproses: data.processVariable['usrPermohonan_tglproses'] ? data.processVariable['usrPermohonan_tglproses'] : '',
                    keterangan: data.processVariable['usrPermohonan_pekerjaan'] ? data.processVariable['usrPermohonan_pekerjaan'] : '',
                    dokumen: data['usrPermohonan_dokumen'] ? [data['usrPermohonan_dokumen'][0]] : [],
                    expected_usergroupid : [2],
                    userid : data.processVariable['usrPermohonan_userid'] ? data.processVariable['usrPermohonan_userid'] : ''
                });

                $scope.detail.data[1].tables.push(
                    {
                        flow:'Approval Permohonan (STI)',
                        nosurat:data.processVariable[''],
                        tgldok: data.processVariable['usrVerifikasiSTI_tglproses'] ? data.processVariable['usrVerifikasiSTI_tglproses'] : '',
                        tglproses: data.processVariable['usrVerifikasiSTI_tglproses'] ? data.processVariable['usrVerifikasiSTI_tglproses'] : '',
                        dokumen: data.processVariable[''],
                        keterangan: data.processVariable['usrVerifikasiSTI_perihal'] ? data.processVariable['usrVerifikasiSTI_perihal'] : '',
                        expected_usergroupid : [10],
                        userid : data.processVariable['usrVerifikasiSTI_userid'] ? data.processVariable['usrVerifikasiSTI_userid'] : ''

                    }
                );

                $scope.detail.data[2].tables.push(
                    {
                        flow:'Verifikasi Permohonan & Input CRM (KPK)',
                        nosurat:data.processVariable[''],
                        tgldok: data.processVariable['usrVerifikasiKPK_tglproses'] ? data.processVariable['usrVerifikasiKPK_tglproses'] : '',
                        tglproses: data.processVariable['usrVerifikasiKPK_tglproses'] ? data.processVariable['usrVerifikasiKPK_tglproses'] : '',
                        keterangan: data.processVariable['usrVerifikasiKPK_perihal'] ? data.processVariable['usrVerifikasiKPK_perihal'] : '',
                        dokumen: data.processVariable[''],
                        expected_usergroupid : [10],
                        userid : data.processVariable['usrVerifikasiKPK_userid'] ? data.processVariable['usrVerifikasiKPK_userid'] : ''
                    }
                );

                $scope.detail.data[3].tables.push(
                    {
                        flow:'Update Status Pelaksanaan - CRM (SBU)',
                        nosurat:data.processVariable[''],
                        tgldok: data.processVariable['usrProsesCRM_tglproses'] ? data.processVariable['usrProsesCRM_tglproses'] : '',
                        tglproses: data.processVariable['usrProsesCRM_tglproses'] ? data.processVariable['usrProsesCRM_tglproses'] : '',
                        keterangan: data.processVariable['usrProsesCRM_perihal'] ? data.processVariable['usrProsesCRM_perihal'] : '',
                        dokumen: data.processVariable[''],
                        expected_usergroupid : [10],
                        userid : data.processVariable['usrProsesCRM_userid'] ? data.processVariable['usrProsesCRM_userid'] : ''

                    },
                    {
                        flow:'Upload BA Aktivasi (Tim ICON+)',
                        nosurat:data.processVariable[''],
                        tgldok: data.processVariable['usrProsesBA_tglproses'] ? data.processVariable['usrProsesBA_tglproses'] : '',
                        tglproses: data.processVariable['usrProsesBA_tglproses'] ? data.processVariable['usrProsesBA_tglproses'] : '',
                        keterangan: data.processVariable['usrProsesBA_perihal'] ? data.processVariable['usrProsesBA_perihal'] : '',
                        dokumen: data['usrProsesBA_dokumen'] ? [data['usrProsesBA_dokumen'][0]] : [],
                        expected_usergroupid : [10],
                        userid : data.processVariable['usrProsesBA_userid'] ? data.processVariable['usrProsesBA_userid'] : ''

                    },
                    {
                        flow:'Verifikasi BA Aktivasi (Unit)',
                        nosurat:data.processVariable[''],
                        tgldok: data.processVariable['usrProsesUnit_tglproses'] ? data.processVariable['usrProsesUnit_tglproses'] : '',
                        tglproses: data.processVariable['usrProsesUnit_tglproses'] ? data.processVariable['usrProsesUnit_tglproses'] : '',
                        keterangan: data.processVariable['usrProsesUnit_perihal'] ? data.processVariable['usrProsesUnit_perihal'] : '',
                        dokumen: data.processVariable[''],
                        expected_usergroupid : [10],
                        userid : data.processVariable['usrProsesUnit_userid'] ? data.processVariable['usrProsesUnit_userid'] : ''

                    }
                );

                angular.forEach($scope.detail.data,function(data,key){
                    var tanggalproses = '';
                    for(var i = 1; i <= data.tables.length; i++){
                         if(data.tables[data.tables.length-i].tglproses != ''){
                             tanggalproses = data.tables[data.tables.length-i].tglproses;
                             break;
                         }
                    }
                    if(tanggalproses == '') data.realisasi = 0;
                    else {
                        var realisasi = (moment(tanggalproses, 'YYYYMMDD').diff(moment(data.tables[0].tgldok, 'YYYYMMDD'), 'days'));
                        data.realisasi = realisasi + 1;
                    }
                });
            };

            $scope.print = $button('print',{
                title:'Cetak Excel',
                class:'btn btn-success',
                icon: 'fa fa-file-excel-o',
                onclick : function(){
                    $export.excel(document.getElementById('laporan').innerHTML,'laporan');
                }
            });


            // data
            $scope.detail = {
                isretrieve : true,
                title:'Timeline Proyek',
                data:[
                    {
                        judul:'Permohonan',
                        icon : '',
                        sla : 0,
                        realisasi : 0,
                        tables:[]
                    },
                    {
                        judul:'Approval Div STI',
                        icon : '',
                        sla : 0,
                        realisasi : 0,
                        tables:[]
                    },
                    {
                        judul:'Verifikasi',
                        icon : '',
                        sla : 0,
                        realisasi : 0,
                        tables:[]
                    },
                    {
                        judul:'Pelaksanaan & Monitoring',
                        icon : '',
                        sla : 0,
                        realisasi : 0,
                        tables:[]
                    }

                ]
            };
        }
    ];
})
;