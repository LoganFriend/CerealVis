//Use this file as a way to preload node instructions into a window

const { remote } = require('electron');

window.closeCurrentWindow = function(){
  window.close();
}


serialport = require("serialport");
const Readline = serialport.parsers.Readline;

//initialize serialport with 9600 baudrate.
var sp = new serialport("COM8", {
  baudRate: 9600
});

//parse incoming data line-by-line from serial port.
const parser = sp.pipe(new Readline({ delimiter: "\r\n" }));
parser.on("data", addText);

//append incoming data to the textarea.
function addText(event) {
  console.log(event);
}
