(function () {
  'use strict';
  angular.module('core.tape', [])
    .directive('tape', function (){
      return {
        restrict: 'E',
        scope: {
            actions: '='
        },
        templateUrl: './components/tape/tape.html',
        controller: tapeController,
        controllerAs: 'vm',
        bindToController: true
      };
    });

    function tapeController($scope) {
        var vm = this;
        let epsilon = 'ε';
        let symbols = [];
        let states = [];
        let currentState = null;
        vm.currentState = 'aaa';
        let steps = [];

        vm.$onInit = function() {
          vm.headPosition = 2;
          vm.actions.freqs = '';
          vm.currentState = 0;
          vm.tape = ['ε', 'ε', 'ε', 'ε', 'ε'];
          vm.actions.moveLeft = moveLeft;
          vm.actions.moveRight = moveRight;
          vm.actions.write = write;
          vm.actions.init = init;
          vm.actions.currentState = '0';
        };
        
        function moveLeft() {
            --vm.headPosition;
            if ( vm.headPosition < 0 ) {
                // Use Case
                vm.tape.unshift(epsilon);
                vm.headPosition = 0;
            }

        }

        function moveRight() {
            ++vm.headPosition;
            if ( vm.headPosition > vm.tape.length ) {
                vm.tape.push(epsilon);
            }    
        }

        function write(symbol) {
            // Write blank
            if (!symbol) {
                vm.tape[vm.headPosition] = epsilon;
            } else {
                vm.tape[vm.headPosition] = symbol;
            }
        }

        function init(description, pstates, psymbols, quadruples) {
            symbols = [];
            states = [];
            currentState = null;
            steps = [];
            parseSymbols(psymbols);
            parseDescription(description);
            parseStates(pstates);
            let prevTape = Object.assign({}, vm.tape);
            let prevHeader = vm.headPosition;
            parseQuadruples(quadruples);
            let counter = 0;
            vm.tape = prevTape;
            vm.headPosition = prevHeader;
            setIntervalX(() => {
                vm.tape = steps[counter].tape;
                vm.actions.currentState = steps[counter].currentState;
                vm.headPosition = steps[counter++].headPosition;
                $scope.$apply();
            }, 1000, steps.length);
            
        }

        function setIntervalX(callback, delay, repetitions) {
            var x = 0;
            var intervalID = global.setInterval(function () {

               callback();

               if (++x === repetitions) {
                   global.clearInterval(intervalID);
               }
            }, delay);
        }

        function parseSymbols(symbolsDefined) {
            if (!symbolsDefined){
                return;
            }
            symbols = symbolsDefined.split(/\n/);
        }

        function parseDescription(description) {
            if (!description) {
                return;
            }
            let input = description.split(/\s/); 
            for (let symbol of input) {
                if (!(symbol in symbols)) {
                    alert(`No symbol "${symbol}"  declared`);
                    return;
                }
            }
            vm.tape = description.split(/\s/);
            vm.headPosition = 0;
        }

        function parseStates(pStates) {
            if (!pStates) {
                return;
            }
            states = pStates.split(/\n/);
            for (let state of pStates) {
                if (state.includes(' ')){
                    alert('States can\'t contain spaces');
                    return;
                }
            }
            currentState = states[0];
            vm.currentState = currentState;
        }

        function parseQuadruples(quadruples) {
            if (!quadruples) {
                return;
            }
            let quads = quadruples.split(/\n/);
            let parsedQuadruples = [];
            for (let q of quads){
                let comp = getComponents(q);
                if (comp) {
                    parsedQuadruples.push(getComponents(q));
                }
            }
            let currQuad = getCurrentQuad(parsedQuadruples);
            while (currQuad) {
                execute(currQuad);
                currQuad = getCurrentQuad(parsedQuadruples);
            }
            let freqs = {}
            for (let symbol of vm.tape) {
                if (symbol in freqs) {
                    freqs[symbol]++; 
                }else {
                    freqs[symbol] = 1;
                }
            }
            vm.actions.freqs = '';
            for (let prop in freqs) {
                vm.actions.freqs += `${prop}: ${freqs[prop]}, `;
            }

        }

        function getCurrentQuad(parsedQuadruples) {
            for (let q of parsedQuadruples) {
                if (q.currentState === currentState 
                    && q.symbol === vm.tape[vm.headPosition]) {
                    return q;
                }
            }
            return null;
        }

        function execute(quad) {
            if (!(states.includes(quad.currentState))) {
                alert(`State ${quad.currentState} undeclared`);
                return;
            }

            if (!(symbols.includes(quad.symbol))) {
                alert(`Symbol ${quad.symbol} undeclared`);
                return;
            }

            let action = getAction(quad.action); 

            switch(action) {
                case 'WRITE': 
                    write(quad.action);
                    break;
                case 'MOVR':
                    moveRight();
                    break;
                case 'MOVL':
                    moveLeft();
                    break;
            }
            currentState = quad.nextState;
            steps.push({
                headPosition: vm.headPosition,
                tape: Object.assign({}, vm.tape),
                currentState: currentState
            });

        }


        function getAction(action) {
            if (symbols.includes(action)) {
                return 'WRITE';
            }

            if (action === 'R') {
                return 'MOVR';
            }

            if (action === 'L') {
                return 'MOVL';
            }

        }


        function getComponents(quad) {
            let components = quad.split(/\s/);
            if (components.length !== 4) {
                return null;
            }
            return {
                currentState: components[0],
                symbol: components[1],
                action: components[2],
                nextState: components[3]
            }
        }

    }


}
)();
