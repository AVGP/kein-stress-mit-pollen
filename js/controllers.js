angular.module('starter.controllers', [])

.controller('MapCtrl', function($scope) {
})

.controller('PrognosisCtrl', function($scope) {
})

.controller('SettingsCtrl', function($scope) {
    $scope.allergies = {
        birke: true,
        erle:  false,
        esche: false,
        hasel: false
    };
    
    $scope.save = function() {
      console.log($scope.allergies);
    };
});
