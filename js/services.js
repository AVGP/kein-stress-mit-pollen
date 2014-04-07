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
      settings = JSON.parse(window.localStorage.getItem("pollenkarte")) || {
        allergies: {
          Betula:   true,
          Alnus:    true,
          Corylus:  true,
          Fraxinus: true
        }
      };
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
    Betula:   { name: "Birke", marker: 'img/markers/birke.gif' },
    Alnus:    { name: "Erle",  marker: 'img/markers/erle.gif'  },
    Corylus:  { name: "Hasel", marker: 'img/markers/hasel.gif' },
    Fraxinus: { name: "Esche", marker: 'img/markers/esche.gif' }
  };

  var treeNames = [];

  self.load = function(callback) {
    allergies = Settings.load().allergies;
    
    treeNames = [];
    for(var treeName in TREE_SPECS) {
      if(!TREE_SPECS.hasOwnProperty(treeName)) continue;

      if(allergies[treeName]) {
        treeNames.push(treeName);
      }
    }
    
    xhr.onload = function() {
      trees = JSON.parse(this.responseText).result;
      window.localStorage.setItem("pollenkarte.trees", JSON.stringify(trees));
      console.log('loaded', targetMap, callback);
      if(targetMap) self.display();
      if(callback) callback();
    };
    xhr.open('post', 'https://data.mingle.io/');
    xhr.send(JSON.stringify({expr: '[ tree | tree <- ch_zh_baumkataster, allergenic <- ' + JSON.stringify(treeNames) + ', tree.Baumgattung == allergenic ]'}));
  };
  
  self.load();
  
  self.setMap = function(map) {
    targetMap = map;
    
    if(trees) self.display();
  }
  
  self.display = function() {
    var clusters = {};
    for(var i=0;i<trees.length;i++) {
      var tree = trees[i];
      if(!allergies[tree.Baumgattung]) continue;
      
      var marker = new google.maps.Marker({
        position: new google.maps.LatLng(tree.lat, tree.lon),
        icon: TREE_SPECS[tree.Baumgattung].marker,
        title: TREE_SPECS[tree.Baumgattung].name
      });
      
      clusters[tree.Baumgattung] = clusters[tree.Baumgattung] || [];
      clusters[tree.Baumgattung].push(marker);
    }
    
    for(var type in clusters) {
      if(!clusters.hasOwnProperty(type)) continue;
      
      var clusterStyles = [
        {
          textColor: (type == 'Alnus' ? 'black' : 'white'),
          url: 'img/markers/' + TREE_SPECS[type].name.toLowerCase() + '-cluster.gif',
          height: 32,
          width: 32,
          anchorText: [-5, 0]
        },
        {
          textColor: (type == 'Alnus' ? 'black' : 'white'),
          url: 'img/markers/' + TREE_SPECS[type].name.toLowerCase() + '-cluster.gif',
          height: 32,
          width: 32,
          anchorText: [-5, 0]
        },
        {
          textColor: (type == 'Alnus' ? 'black' : 'white'),
          url: 'img/markers/' + TREE_SPECS[type].name.toLowerCase() + '-cluster.gif',
          height: 32,
          width: 32,
          anchorText: [-5, 0]
        }
      ];
      
      new MarkerClusterer(targetMap, clusters[type], {styles: clusterStyles});
    }
  };
  
  return self;
});