/*jshint esversion: 6*/
(function () {
  'use strict';
  angular.module('core.navbar')
    .directive('navbar', function(navSrv) {
      return {
        restrict: 'E',
        transclude: true,
        replace: true,
        templateUrl: './components/navbar/navbar.html',
        link: function(scope, element, attrs) {
          scope.tabs = navSrv.tabs;
          scope.show = false;

          scope.select = function(selTab) {
            angular.forEach(scope.tabs, function(tab) {
              if (tab.active && tab != selTab) {
                tab.active = false;
              }
            });
            selTab.active = true;
          };
          scope.toggleNav = function() {
            scope.show = !scope.show;
          };

        }
      };
    });
}());