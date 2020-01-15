define([
    'asset/lib/moment/min/moment-with-locales.min',
    'asset/js/accounting.min',
    'component/alt/button/service',
    'component/pusharlis/master/acttask',
    'component/pusharlis/master/kontrak',
], function(moment,accounting){
    return ['$scope', '$routeParams', '$log', '$button', '$auth', '$popup', 'Pusharlis_Master_Act_Task','Pusharlis_Master_Kontrak',
        function($scope, $routeParams, $log, $button, $auth, $popup, Pusharlis_Master_Act_Task,Pusharlis_Master_Kontrak){
            $scope.$auth = $auth;
            $scope.unitid = $auth.userdata.unitid;

            $scope.moment = moment;
            $scope.accounting = accounting;

            $scope.filter = {};
            var tableFilter = {};
            $scope.table = {
                total_data: [],
                filter: tableFilter,
                reload: function(){
                    // set parameter untuk dikirim
                    var param = angular.copy($scope.table.filter);
                    param.limit = $scope.table.limit;
                    param.offset = $scope.table.offset;
                    param.order = "id desc";

                    // cek apakah sedang mengambil data, batalkan jika ada
                    if($scope.table.isloading != null && $scope.table.isloading.abort)
                        $scope.table.isloading.abort();

                    // kirim data ke server
                    $scope.table.isloading = Pusharlis_Master_Kontrak.table(param);
                    $scope.table.isloading.then(function(response){
                        $scope.table.total = response.data.total;
                        $scope.table.data = response.data.list;
                    });
                },
                buttons: function (index, item) {
                    var buttons = [
                        $button('view', {
                            title: '',
                            class: 'btn btn-sm btn-info',
                            href: alt.baseUrl + 'praproyek/' + ($routeParams.isinputkontrak ? 'kontrak/kontrak' : 'penugasan/inputpenugasan') + '?action=view&id=' + item.id
                        })
                    ];

                    return buttons;
                }
            };

            $scope.rowCreated = function(){
                $("#fixTable").tableHeadFixer({"head" : false, "left" : 2});
                $('table thead tr th').css('background-color', '#eee');
            };

            $scope.rowCreated();


            $scope.$watch('filter',function(val){
                if($scope.filter.value && $scope.filter.key){
                    delete $scope.table.filter.blank;
                    $scope.table.filter = angular.extend($scope.table.filter,{
                        [$scope.filter.key] : $scope.filter.value
                    });
                }else{
                    $scope.table.filter = angular.copy(angular.extend(tableFilter, {
                        "blank" : "1"
                    }));
                }
            },true);

        }];
});