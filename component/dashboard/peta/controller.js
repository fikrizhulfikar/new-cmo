define([
], function(){
    return ['$scope', '$routeParams', '$log', '$auth', function($scope, $routeParams, $log, $auth){
        $scope.data = [];
     
        $scope.map = {
            show: true,
            elementid: 'map_canvas' + $scope.$id,
            isloaded: false,
            isretrieve: true,
            data: [],
            marker: [],
            zoom: 4,
            line: [],
            js: function () {
                require([
                    'async!http://maps.googleapis.com/maps/api/js?key=AIzaSyADaW74iRQiEqmnvYqnTSmYQpLQ40w40fI&sensor=false&language=id'
                ], function () {
                    if (window && window.google && window.google.maps) {
                        $scope.map.isloaded = true;
                        $scope.map.load();
                        $scope.$apply();
                    }
                });
            },
            load: function () {
                $scope.map.element = document.getElementById($scope.map.elementid);

                if ($scope.map.isloaded) {
                    if ($scope.map.element && typeof $scope.map.object === 'undefined') {
                        $scope.map.center = new window.google.maps.LatLng(-1.617522, 118.6362061);
                        $scope.map.options = {
                            center: $scope.map.center,
                            zoom: $scope.map.zoom,
                            mapTypeId: window.google.maps.MapTypeId.ROADMAP
                        };

                        $scope.map.object = new window.google.maps.Map($scope.map.element, $scope.map.options);
                        $scope.map.bounds = new google.maps.LatLngBounds();
                        $scope.map.info = new google.maps.InfoWindow;

                        google.maps.event.addDomListener(window, "resize", function () {
                            var center = $scope.map.object.getCenter();
                            google.maps.event.trigger($scope.map.object, "resize");
                            $scope.map.object.setCenter(center);
                        });

                        /*google.maps.event.addListener($scope.map.object, "click", function (event) {
                            $scope.data.latitude = event.latLng.lat();
                            $scope.data.longitude = event.latLng.lng();
                            $scope.map.location();
                        });

                        $scope.map.on_marker_click = function (marker) {
                            angular.forEach(tmpmodaldata, function (value, key) {
                                if (value.latitude == marker.position.lat() && value.longitude == marker.position.lng()) {
                                    $scope.detail.modal.data = value;
                                }
                            });
                            if ($scope.detail.modal.data)
                                $scope.detail.modal.open();
                            $scope.$apply();
                        };*/
                    }

                    $scope.map.location();
                }
            },
            location: function () {
                // reset map marker
                for (var i = 0; i < $scope.map.marker.length; i++) {
                    $scope.map.marker[i].setMap(null);
                }
                $scope.map.marker = [];
                $scope.map.bounds = new google.maps.LatLngBounds();

                if($scope.data.length > 0) angular.forEach($scope.data, function (data) {
                    var latitude = data.latitude,
                        longitude = data.longitude;

                    if (
                        typeof latitude !== 'undefined' && latitude != '' && latitude != null &&
                        typeof longitude !== 'undefined' && longitude != '' && longitude != null
                    ) {
                        // create new marker
                        var position = new google.maps.LatLng(latitude, longitude);

                        $scope.map.marker.push(new google.maps.Marker({
                            position: position,
                            map: $scope.map.object,
                            animation: google.maps.Animation.DROP,
                            icon: 'asset/img/marker/arrow.png'
                        }));

                        google.maps.event.addListener($scope.map.marker[$scope.map.marker.length - 1], 'click', function (e) {
                            var marker = null;
                            angular.forEach($scope.map.marker, function (m) {
                                if (e.latLng == m.position) marker = m;
                            });
                            if (marker != null) $scope.map.on_marker_click(marker);
                        });

                        $scope.map.bounds.extend(position);
                    }
                });

                // ------------- bound map with marker
                if ($scope.map.marker.length > 0) {
                    $scope.map.object.fitBounds($scope.map.bounds);
                }
                google.maps.event.trigger($scope.map.object, "resize");
            }
        };
        $scope.map.js();
    }];
});