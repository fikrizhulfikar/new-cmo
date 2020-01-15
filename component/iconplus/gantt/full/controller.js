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
        $scope.realisasi = [];
        $scope.perencanaan = {};
        $scope.config = {
            weekNo: 0,
            isUnitGantt: false,
            weeks: {}
        };
        $scope.isUnitGantt = false;
        $scope.startWeek = 1;

        $scope.pekerjaan_keyval = {};
        $scope.realisasi_keyval = {};

        $scope.tooltip = function(elm) {
            $(elm.target).tooltip('show');
        };

        $scope.$watchGroup(['perencanaan', 'pekerjaan', 'realisasi'], function(val){
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

                $scope.pekerjaan_keyval = {};
                angular.forEach($scope.pekerjaan, function (val, pkey) {
                    if (!$scope.pekerjaan[pkey]['week']) $scope.pekerjaan[pkey]['week'] = [];
                    var tglawalpekerjaan = moment($scope.pekerjaan[pkey]['tglawal'], 'YYYYMMDD');
                    var tglakhirpekerjaan = moment($scope.pekerjaan[pkey]['tglakhir'], 'YYYYMMDD');
                    angular.forEach($scope.config.weeks, function (week, key) {
                        var tglawalminggu = moment(week['start'], 'YYYYMMDD');
                        var tglakhirminggu = moment(week['end'], 'YYYYMMDD');
                        if(
                            (tglawalminggu.isSameOrAfter(tglawalpekerjaan) && tglawalminggu.isSameOrBefore(tglakhirpekerjaan)) ||
                            (tglawalpekerjaan.isSameOrAfter(tglawalminggu) && tglawalpekerjaan.isSameOrBefore(tglakhirminggu))
                        ){
                            $scope.pekerjaan[pkey]['week'].push(key);
                        }
                    });

                    $scope.pekerjaan_keyval[val.pekerjaan] = val;
                });

                $scope.realisasi_keyval = {};
                angular.forEach($scope.realisasi, function(realisasi){
                    var currentProgress = 0;
                    angular.forEach(realisasi.progress, function(progress){
                        if(progress.realisasiprogress > currentProgress){
                            progress.isProgress = true;
                            currentProgress = progress.realisasiprogress;
                        }else{
                            progress.isProgress = false;
                        }
                    });
                    $scope.realisasi_keyval[realisasi.pekerjaan] = realisasi;
                });

                if ($scope.isUnitGantt){
                    var startWeek = 99999;
                    angular.forEach($scope.pekerjaan, function (pk) {
                        if (pk.week.length > 0) startWeek = parseInt(pk.week[0]) < startWeek ? parseInt(pk.week[0]) : startWeek;
                    });

                    if (startWeek > 1 && startWeek < 99999){
                        for (var i = 1; i < startWeek; i++){
                            delete $scope.config.weeks[i.toString()];
                        }
                        $scope.startWeek = startWeek;
                    }else{
                        $scope.startWeek = 1;
                    }
                }
            }
        });
    }];
});