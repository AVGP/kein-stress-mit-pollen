angular.module('starter.controllers', [])

.controller('MapCtrl', function($scope) {
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
