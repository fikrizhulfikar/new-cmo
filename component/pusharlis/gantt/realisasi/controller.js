requirejs.s.contexts._.config.shim['asset/js/tableHeadFixer'] = {
    deps: ['asset/lib/jquery/jquery.min']
};

requirejs.s.contexts._.config.shim['asset/lib/bootstrap/dist/js/bootstrap.min'] = {
    deps: ['asset/lib/jquery/jquery.min']
};

define([
    'asset/lib/moment/min/moment-with-locales.min',
    'asset/lib/jquery/jquery.min',
    'asset/lib/bootstrap/dist/js/bootstrap.min',
    'asset/js/tableHeadFixer'
], function(moment){
    return ['$scope', '$routeParams', '$log', '$auth', function($scope, $routeParams, $log, $auth){
        $scope.moment = moment;
        $scope.pekerjaan = [];
        $scope.perencanaan = {};
        $scope.config = {
            weekNo: 0,
            weeks: {}
        };

        $scope.tooltip = function(elm) {
            $(elm.target).tooltip('show');
        };

        $scope.$watchGroup(['perencanaan', 'pekerjaan'], function(val){
            if ($scope.perencanaan !== {} && $scope.pekerjaan !== []) {
                var startDate = moment($scope.perencanaan.tglawal, 'YYYYMMDD');
                var endDate = moment($scope.perencanaan.tglakhir, 'YYYYMMDD');
                var currentDate = angular.copy(startDate);

                while (currentDate.isSameOrBefore(endDate)) {
                    $scope.config.weeks[++$scope.config.weekNo] = {
                        weekno: $scope.config.weekNo,
                        start: currentDate.format('YYYYMMDD'),
                        end: currentDate.add(1, 'weeks').subtract(1, 'days').format('YYYYMMDD')
                    };
                    currentDate.add(1, 'days');
                }

                angular.forEach($scope.pekerjaan, function(pekerjaan){
                    var currentProgress = 0;
                    angular.forEach(pekerjaan.progress, function(progress){
                        if(progress.realisasiprogress > currentProgress){
                            progress.isProgress = true;
                            currentProgress = progress.realisasiprogress;
                        }else{
                            progress.isProgress = false;
                        }
                    });
                });
            }
        });
    }];
});