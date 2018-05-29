/*jshint esversion: 6*/
(function () {
  angular.module('core.navbar')
    .factory('navSrv', function(){
      msgs = {};
      msgs.tabs = [];

      msgs.add = function(tab) {
        msgs.tabs.push(tab);
        if (msgs.tabs.length === 1) {
          tab.active = true;
        }
      };


      return msgs;
    });
}());