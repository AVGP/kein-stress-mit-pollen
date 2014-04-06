angular.module('starter.services', [])

.factory('Settings', function() {
  var self     = {},
      settings = null;
  
  self.save = function(key, value) {
    if(settings == null) {
      self.load();
    }
    
    if(key) {
      settings[key] = value;
    } else {
      settings = value;
    }
    
    window.localStorage.setItem("pollenkarte", JSON.stringify(settings));
  }
  
  self.load = function() {
    try {
      settings = JSON.parse(window.localStorage.getItem("pollenkarte")) || {};
    } catch(e) {
      settings = {};
    }
    
    return settings;
  };
  
  return self; 
})

.factory('Trees', function(Settings) {
  var self      = {},
      trees     = [],
      allergies = Settings.load().allergies;
      xhr       = new XMLHttpRequest()
      targetMap = null;

  var TREE_SPECS = {
    Betula:   { name: "Birke", color: '#f03', baseRadius: 30 },
    Alnus:    { name: "Erle",  color: '#30f', baseRadius: 15 },
    Corylus:  { name: "Hasel", color: '#3f0', baseRadius: 15 },
    Fraxinus: { name: "Esche", color: '#83c', baseRadius: 15 },
    Fagus:    { name: "Buche", color: '#3cf', baseRadius:  7 },
    Quercus:  { name: "Eiche", color: '#c3f', baseRadius:  7 },
    Salix:    { name: "Weide", color: '#aa6', baseRadius:  1 }
  };

  var treeNames = [];
  for(var treeName in TREE_SPECS) {
    if(!TREE_SPECS.hasOwnProperty(treeName)) continue;

    if(allergies[treeName]) {
      treeNames.push(treeName);
    }
  }

  xhr.onload = function() {
    trees = JSON.parse(this.responseText).result;
    console.log(trees);
    self.display();
  };
  xhr.open('post', 'https://data.mingle.io/');
  xhr.send(JSON.stringify({expr: '[ tree | tree <- ch_zh_baumkataster, allergenic <- ' + JSON.stringify(treeNames) + ', tree.Baumgattung == allergenic ]'}));
  
  self.setMap = function(map) {
    targetMap = map;
  }
  
  self.display = function() {
    window.markers = [];
    for(var i=0;i<trees.length;i++) {
      var tree = trees[i];
      var options = {
        strokeColor: TREE_SPECS[tree.Baumgattung].color,
        strokeOpacity: 0.8,
        strokeWeight: 1,
        fillColor: TREE_SPECS[tree.Baumgattung].color,
        fillOpacity: 0.5,
        map: targetMap,
        center: new google.maps.LatLng(tree.lat, tree.lon),
        radius: TREE_SPECS[tree.Baumgattung].baseRadius
      };
      console.log(options);
      window.markers.push(new google.maps.Circle(options));
    }
  };
  
  return self;
});