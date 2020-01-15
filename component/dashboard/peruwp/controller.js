define([
], function(){
    return ['$scope', '$routeParams', '$log', '$auth', function($scope, $routeParams, $log, $auth){
        $scope.data = {};
        $scope.showdetail = function(index){
            $scope.modal.header = $scope.data[index].nama;
            $scope.modal.data = $scope.data[index].detail;
            $scope.modal.open();
        };
        $scope.modal = {
            header: 'Detail',
            data  : {}
        }
    }];
});