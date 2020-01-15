define([
    'asset/lib/moment/min/moment-with-locales.min',
    'component/alt/button/service',
    'asset/js/accounting.min'
], function(moment,accounting){
    return ['$scope', '$timeout', '$routeParams', '$button', '$log', '$auth',
        function($scope, $timeout, $routeParams, $button, $log, $auth){

        $scope.accounting = accounting;
        $scope.moment = moment;
        
        $scope.toolbar = {
            title: 'Dashboard'
        };

        $scope.filter = {};
        $scope.btnsearch = $button('search', {
            class: 'btn btn-primary',
            onclick: function(){
                /*for(var i = 1; i <= 8; i++){
                    if($scope['chart' + i].reload) $scope['chart' + i].reload();
                }*/
                $scope.reload();
            }
        });

        $scope.reload = function(){
            var filter = $scope.filter.tahun ? {tahunperjanjian: moment($scope.filter.tahun).format('YYYY')} : {}
            // Iconplus_Master_Act_Process.list(filter).then(function(response){
        };

        $scope.reload();
    }];
});