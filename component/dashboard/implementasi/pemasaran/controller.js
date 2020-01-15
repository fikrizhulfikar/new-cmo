define([
    'component/alt/button/service',
    'component/pusharlis/master/acttask',
    'component/pusharlis/master/vimplementasipemasaran',
], function(){
    return ['$scope', '$routeParams', '$log', '$button', '$auth', '$popup', 'Pusharlis_Master_Act_Task','Vimplementasi_pemasaran',
        function($scope, $routeParams, $log, $button, $auth, $popup, Pusharlis_Master_Act_Task,Vimplementasi_pemasaran){
            $scope.$auth = $auth;
            $scope.unitid = $auth.userdata.unitid;

            $scope.buttons = function(index, item){
                return [];
            };


            $scope.datapemasaran = {};
            Vimplementasi_pemasaran.list().then(function (response) {
                for(var i =0; i< response.data.length ;i++){
                    $scope.datapemasaran[response.data[i].jenis] = response.data[i].jml;
                }
            });
        }];
});