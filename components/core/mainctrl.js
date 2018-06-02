/*jshint esversion: 6*/
/**
*
*
* @author Jose Rodrigo Custodio
*
* Descripcion: Main section controller
*
*
*/
(function () {
  const {dialog} = require('electron').remote;

  const path = require('path');
  const fs = require('fs');

  var filen = '';
 
 angular.module('core')
  .controller('MainCtrl', mainCtrl);

  function mainCtrl() {
    let vm = this;
    vm.code = '';
    vm.run = run;
    vm.init = init;
    vm.actions = {};
    vm.aceLoaded = function(_editor) {
    let _session = _editor.getSession();
    _session.on('change', () => {
        vm.code = _session.getDocument().getValue();
      });
    };

    function run() {

      vm.actions.moveLeft();
      vm.actions.write('juepuca');
    }

    function init() {
      vm.actions.init(vm.description, vm.states, vm.symbols, vm.code);
    }

  }
    
}());
