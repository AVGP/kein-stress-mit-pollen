var pollen = angular.module('pollen', []);

function AppCtrl($scope, $http) {
    $scope.TREE_SPECS = {
        Betula:   { name: "Birke", color: '#f03', baseRadius: 30 },
        Alnus:    { name: "Erle",  color: '#30f', baseRadius: 15 },
        Corylus:  { name: "Hasel", color: '#3f0', baseRadius: 15 },
        Fraxinus: { name: "Esche", color: '#83c', baseRadius: 15 },
        Fagus:    { name: "Buche", color: '#3cf', baseRadius:  7 },
        Quercus:  { name: "Eiche", color: '#c3f', baseRadius:  7 },
        Salix:    { name: "Weide", color: '#aa6', baseRadius:  1 }
      };

}