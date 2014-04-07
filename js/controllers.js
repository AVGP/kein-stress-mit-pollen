angular.module('starter.controllers', [])

.controller('MapCtrl', function($scope, Trees) {
  var mapOptions = {
    center: new google.maps.LatLng(47.367347000000000000, 8.550002500000005000),
    zoom: 12,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  var map = new google.maps.Map(document.getElementById("map"), mapOptions);
  Trees.setMap(map);
})

.controller('PrognosisCtrl', function($scope) {
  var xhr = new XMLHttpRequest();
  xhr.open('get', 'http://cors.io/www.pollenundallergie.ch/infos-zu-pollen-und-allergien/MeteoSchweiz/pollenprognose/?oid=1828&lang=de', true);
  xhr.responseType = 'document';
  xhr.onload = function() {
    var prognosis = this.response.querySelector('.prognosetext').textContent;
    $scope.$apply(function() {
      $scope.prognosis = prognosis;
    });
  }
  xhr.onerror = function() {
    console.log('err', this.error);
  }
  xhr.send();
})

.controller('SettingsCtrl', function($scope, Settings, Trees) {
  var settings = Settings.load();
  $scope.allergies = settings.allergies || {};
  $scope.loading = false;
  
  $scope.save = function() {
    $scope.loading = true;
    Settings.save('allergies', $scope.allergies);
    Trees.load(function() {
      $scope.$apply(function() { $scope.loading = false; });
    })
  };
});
