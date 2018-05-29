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
  function run() {
    console.log('juepuca');
  }

  angular.module('core')
    .controller('MainCtrl', function() {
      let vm = this;
      vm.code = '';
      vm.run = run;
      vm.aceLoaded = function(_editor) {
        let _session = _editor.getSession();
        _session.on('change', () => {
          vm.code = _session.getDocument().getValue();
        });
      };
    });
    
}());
