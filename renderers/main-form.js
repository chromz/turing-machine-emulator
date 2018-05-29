/*jshint esversion: 6*/
/**
*
* @author Rodrigo Custodio
* 
* Description: Main renderer.
*/
(function() {

  


  let BrowserWindow = require('electron').remote.BrowserWindow;

  let closeButton = document.getElementById('close-btn');
  let maximizeButton = document.getElementById('maximize-btn');
  let minimizeButton  = document.getElementById('minimize-btn');
  let compileButton = document.getElementById('compile-btn');

  closeButton.addEventListener('click', () => {
      let win = BrowserWindow.getFocusedWindow();
      win.close();
  });

  maximizeButton.addEventListener('click', () => {
      let win = BrowserWindow.getFocusedWindow();
      if(!win.isMaximized())
          win.maximize();
      else win.unmaximize();
  });

  minimizeButton.addEventListener('click', () => {
     let win = BrowserWindow.getFocusedWindow();
      win.minimize();
  });

}());