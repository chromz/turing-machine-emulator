(function () {
  'use strict';
  angular.module('core.tape', [])
    .directive('tape', function (navSrv){
      return {
        restrict: 'E',
        scope: {
            moveLeft: '=',
            moveRight: '=',
            write: '='
        },
        templateUrl: './components/tape/tape.html',
        controller: tapeController,
        controllerAs: 'ctrl',
        bindToController: true
      };
    });

    function tapeController() {
        let vm = this;
        let epsilon = 'ε';
        vm.headPosition = 2;
        vm.tape = ['ε', 'ε', 'ε', 'ε', 'ε'];
        vm.moveLeft = moveLeft;
        vm.moveRight = moveRight;
        vm.write = write;
    }

    function moveLeft() {
        --vm.headPosition;
        if ( vm.headPosition < 0 ) {
            // Use Case
        }

    }

    function moveRight() {
    
    }

    function write(symbol) {
        // Write blank
        if (!symbol) {
            
        }
    }

}
)();
