//Use this file as a way to preload node instructions into a window

const { remote } = require('electron');
const { chartjs } = require('chart.js');
const { moment } = require('moment');
const { chartjsstreaming } = require('chartjs-plugin-streaming');


//TEST TO SHOW CONNECTION BETWEEN PRELOAD AND RENDERER
window.closeCurrentWindow = function(){
  window.close();
}

//EXTRA
randomScalingFactor = function() {
	return (Math.random() > 0.5 ? 1.0 : -1.0) * Math.round(Math.random() * 100);
}


//SERIALPORT
//-------------------------------------------------------------------------------------------------
const serialport = require("serialport");
const Readline = serialport.parsers.Readline;


//append incoming data to the textarea.
addText = function(event) {
  console.log(event);
}

addToChart = function() {

}

//initialize serialport with 9600 baudrate.
connectSerial = function(port){
  var sp = new serialport(port, {
    baudRate: 9600
  });

  //Port is in flowing mode
  const parser = sp.pipe(new Readline({ delimiter: "\r\n" }));
  //parser.on("data", addText);
  return parser
}


//CHARTJS
