//Use this file as a way to preload node instructions into a window

const { remote } = require('electron');

window.closeCurrentWindow = function(){
  window.close();
}