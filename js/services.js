angular.module('starter.services', [])

.factory('Settings', function() {
  var self     = {},
      settings = null;
  
  self.save = function() {
    if(settings == null) {
      self.load();
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