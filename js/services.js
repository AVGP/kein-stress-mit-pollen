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
});