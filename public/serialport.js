
const SerialPort = require("serialport");
const Readline = require("@serialport/parser-readline");

class SerialPortClass {
  constructor() {
    this.baudRate = 9600;
    this.port;
    this.parser;
    this.possible_ports = [];
    this.CreatePortList();
  }

  async CreatePortList() {
    // this function creates an array of available ports
    // before anything is added to the array, the array is cleared
    this.possible_ports = [];
    var ports = await SerialPort.list();
    for (var i = 0; i < ports.length; i++) {
      if (ports[i].manufacturer != undefined) {
        this.possible_ports.push({ manufacturer: ports[i].manufacturer, path: ports[i].path });
      }
    }
  }

  GetPortList() {
    // this function returns the array of available ports
    return this.possible_ports;
  }

  Connect(event, path = "AUTO") {
    // this function attempts to create a connection with a specified port
    // if no port is specified the function attempts to create a connection with an arduino module
    // returns true when a was connection made, false when a connection was not made
    var valid_port = false;

    for (var i = 0; i < this.possible_ports.length; i++) {
      if (path == "AUTO") {
        if (this.possible_ports[i].manufacturer.includes("Arduino")) {
          path = this.possible_ports[i].path;
          valid_port = true;
          break;
        }
      } else {
        if (this.possible_ports[i].path == path) {
          valid_port = true;
          break;
        }
      }
    }

    if (valid_port) {
      this.port = new SerialPort(path, { baudRate: this.baudRate });
      this.parser = this.port.pipe(new Readline({ delimiter: "\r\n" }));
      this.parser.on("data", event);
      return true;
    }

    return false;
  }

  Disconnect() {
    this.port.write("q");
    this.port.close(err => {
        console.log('port closed', err);
    });
    this.parser = null;
  }

  DataGate() {
    this.port.write("g");
    console.log("Allow / Stop Data Flow");
  }

  SetFrequency(frequency) {
    this.port.write("f " + frequency);
    console.log("Frequency: " + frequency);
  }

  SetMultiplier(multiplier) {
    this.port.write("m " + multiplier);
    console.log("Multiplier: " + multiplier);
  }

  SetMaxReading(max_reading) {
    this.port.write("x " + max_reading);
    console.log("Max Reading: " + max_reading);
  }
}

module.exports.SerialPortClass = SerialPortClass;
