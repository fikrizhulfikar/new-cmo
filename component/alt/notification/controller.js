define([
    'asset/lib/jquery/jquery.min',
    'component/pusharlis/master/notifikasi'
], function(){
    return ['$scope', '$rootScope', '$log', '$auth', '$notification', 'Pusharlis_Master_Notifikasi', "$routeParams",
        function($scope, $rootScope, $log, $auth, $notification, Pusharlis_Master_Notifikasi, $routeParams){
            $scope.$notification = $notification;
            $scope.$notification.isfinished = false;
            
            $scope.closeMenu = function(){
                $rootScope.closeMenu();
            };

            $scope.setting = {
                aktivasi:{
                    usrVerifikasiSTI:{
                        usergroups: [1,3],
                        label: "Approval Permohonan (STI)",
                        url: alt.baseUrl + 'odp/verifikasi/list'
                    },
                    usrVerifikasiKPK:{
                        usergroups: [1,4],
                        label: "Verifikasi Permohonan & Input CRM (KPK)",
                        url: alt.baseUrl + 'odp/verifikasi/list'
                    },
                    usrProsesCRM:{
                        usergroups: [1,5],
                        label: "Update Status Pelaksanaan CRM (SBU)",
                        url: alt.baseUrl + 'odp/pelaksanaan/list'
                    },
                    usrProsesBA:{
                        usergroups: [1,6],
                        label: "Upload BA Aktivasi (Tim ICON+)",
                        url: alt.baseUrl + 'odp/pelaksanaan/list'
                    },
                    usrProsesUnit:{
                        usergroups: [1,2],
                        label: "Verifikasi BA Aktivasi (Unit)",
                        url: alt.baseUrl + 'odp/pelaksanaanunit/list'
                    },
                    usrPermohonan:{
                        usergroups: [1,2],
                        label: "Revisi Permohonan",
                        url: alt.baseUrl + 'odp/revisi/list'
                    }
                }
            };

            $notification.get = function () {
                $notification.isgetnotif = true;
                $notification.count = 0;
                $notification.notif = {};

                var data = {};
                // if ($auth.userdata.usergroupid == 7 || $auth.userdata.usergroupid == 10 )
                // {
                //     var unitid = $auth.userdata.unitid;
                //     var ptlid = $auth.userdata.userid;
                //     data.unitid = unitid;
                //     data.ptlid = ptlid;
                // }else if($auth.userdata.usergroupid == 6){
                //      data.subjenis = '%%QC%%';
                // }else {
                //     var unitid = $auth.userdata.unitid ;
                //     var ptlid = '';
                //     data.unitid = unitid;
                //     data.ptlid = '';
                // }
                Pusharlis_Master_Notifikasi.list(data).then(function (response) {
                    $notification.isgetnotif = false;
                    angular.forEach(response.data, function (jenis, kj) {
                        if ($scope.setting.hasOwnProperty(kj)) {
                            if (!$notification.notif[kj]) $notification.notif[kj] = {};
                            angular.forEach(jenis, function (subjenis, ksj) {
                                var key = ksj;
                                if (kj == 'permohonan' && ksj == 'ULG') key = 'NEW';

                                if ($scope.setting[kj].hasOwnProperty(key)) {
                                    if ($scope.setting[kj][key]['usergroups'].indexOf(parseInt($auth.userdata.usergroupid)) > -1) {
                                        $notification.notif[kj][key] = subjenis;
                                        $notification.count += parseInt(subjenis);
                                    }
                                }
                            });
                        }
                    });
                    $scope.$notification.isfinished = true;
                });
                // }
            };

            if($routeParams.altcontroller !== "auth")
                $notification.get();
        }
    ];
});