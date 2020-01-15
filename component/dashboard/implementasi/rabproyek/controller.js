define([
    'asset/js/accounting.min',
    'component/alt/button/service',
    'component/pusharlis/master/acttask',
    'component/proyek/inputrab',
], function(accounting){
    return ['$scope', '$routeParams', '$log', '$button', '$auth', '$popup', 'Pusharlis_Master_Act_Task','Proyek_Input_Rab',
        function($scope, $routeParams, $log, $button, $auth, $popup, Pusharlis_Master_Act_Task,Proyek_Input_Rab){
            $scope.$auth = $auth;
            $scope.unitid = $auth.userdata.unitid;
            $scope.accounting = accounting;

            $scope.buttons = function(index, item){
                return [];
            };

            $scope.converttobidang = function (val) {
                if(val == '1'){
                    return 'KIT';
                }

                if(val == '2'){
                    return 'TND';
                }

                if(val == '3'){
                    return 'KONS';
                }
            };


            $scope.jmlahchargecode = function (val) {
                if(val == '1'){
                    return '164';
                }

                if(val == '2'){
                    return '330';
                }

                if(val == '3'){
                    return '42';
                }
            };

            $scope.table = {
                isshowpagination: true,
                isshowviewdata: false,
                filter: {
                    // order: 'ID DESC',
                    // id_bidang: $scope.unitid
                },
                total_data: [],
                isloading: null,
                reload: function () {
                    // set parameter untuk dikirim
                    var param = angular.copy($scope.table.filter);
                    param.limit = $scope.table.limit;
                    param.offset = $scope.table.offset;
                    param.select = "CHARGECODE,PEKERJAAN, SUM(SUBTOTAL_HARGA_SATUAN) NILAI_RAB";
                    param.group = "CHARGECODE,PEKERJAAN";

                    // cek apakah sedang mengambil data, batalkan jika ada
                    if ($scope.table.isloading != null && $scope.table.isloading.abort)
                        $scope.table.isloading.abort();

                    // kirim data ke server
                    $scope.table.isloading = Proyek_Input_Rab.table(param);
                    $scope.table.isloading.then(function (response) {
                        $scope.table.total = response.data.total;
                        $scope.table.data = response.data.list;
                    });
                }
            };
        }];
});