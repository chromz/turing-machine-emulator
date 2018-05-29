/*jshint esversion: 6*/
(function () {
  'use strict';
  angular.module('core.navbar')
    .directive('tab', function (navSrv){
      return {
        restrict: 'E',
        transclude: true,
        replace: true,
        scope: {
          header: '@',
          icon: '@'
        },
        templateUrl: './components/tab/tab.html',
        link: function(scope, elem, attrs) {
          scope.active = false;
          navSrv.add(scope);
        }
      };
    });
}());