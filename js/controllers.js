angular.module('starter.controllers', [])

.controller('MapCtrl', function($scope) {
  var mapOptions = {
    center: new google.maps.LatLng(47.367347000000000000, 8.550002500000005000),
    zoom: 12,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  var map = new google.maps.Map(document.getElementById("map"), mapOptions);  
})

.controller('PrognosisCtrl', function($scope) {
})

.controller('SettingsCtrl', function($scope, Settings) {
  var settings = Settings.load();
    $scope.allergies = settings.allergies || {};
    
    $scope.save = function() {
      console.log($scope.allergies);
      Settings.save('allergies', $scope.allergies);
    };
});
