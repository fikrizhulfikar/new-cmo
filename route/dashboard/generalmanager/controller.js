define([
    'component/activiti/task',
    'component/pusharlis/master/manufaktur'
], function(){
    return ['$scope', '$routeParams', '$log', '$auth', 'Activiti_Task', 'Pusharlis_Master_Manufaktur', function($scope, $routeParams, $log, $auth, Activiti_Task, Pusharlis_Master_Manufaktur){
        $scope.breadcrumb = {
            data: [{
                title: 'Dashboard'
            }, {
                title: 'Administrasi',
                url: alt.baseUrl + 'dashboard/administrasi',
                isactive: true
            }]
        };
        $scope.toolbar = {
            title: 'Dashboard',
            description: 'Selamat datang ' + ($auth.userdata.username || '') + ' di ' + alt.description
        };

        $scope.tahap1 = {
            color: 'blue',
            icon: 'fa fa-comment',
            data:{
                nama: 'Tahap Prapenugasan',
                jumlah: 0
            }
        };
        $scope.tahap2 = {
            color: 'red',
            icon: 'fa fa-bar-chart-o',
            data:{
                nama: 'Tahap Penugasan',
                jumlah: 5
            }
        };
        $scope.tahap3 = {
            color: 'green',
            icon: 'fa fa-shopping-cart',
            data:{
                nama: 'Tahap Pelaksanaan Kegiatan',
                jumlah: 11
            }
        };
        $scope.tahap4 = {
            color: 'yellow',
            icon: 'fa fa-globe',
            data:{
                nama: 'Tahap Penyelesaian & Laporan',
                jumlah: 6
            }
        };

        $scope.peta = {};
        $scope.counter = {
            data: {
                aktif: 11,
                batal: 3,
                selesai: 78
            }
        };

        $scope.peruwp = {
            data:[]
        };

        //get data
        Activiti_Task.count().then(function(response){
            if(!isNaN(response.data)) {
                $scope.tahap1.data.jumlah = response.data;
                $scope.tahap1.data.url = alt.baseUrl + 'prapenugasan/permohonan/list';
            }
        });

        Pusharlis_Master_Manufaktur.peruwp().then(function(response){
            angular.forEach(response.data, function(val, key){
                $scope.peruwp.data.push({
                    nama: val.nama_workshop,
                    jumlah: val.jumlah
                });
            });
        });
    }];
});