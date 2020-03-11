const SerialPort = require("serialport");
const Readline = require("@serialport/parser-readline");

class SerialPortClass {
  constructor() {
    this.baudRate = 9600;
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

  Connect(event, path = "AUTO", config = [10, 1.0]) {
    // this function attempts to create a connection with a specified port
    // if no port is specified the function attempts to create a connection with an arduino module
    // returns true when a was connection made, false when a connection was not made
    var valid_port = false;

    for (var i = 0; i < this.possible_ports.length; i++) {
      if (path == "AUTO") {
        if (this.possible_ports[i].manufacturer.includes("Arduino") ||
          this.possible_ports[i].manufacturer.includes("Silicon Labs")) {
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
      this.SetConfig(config);
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

  Start() {
    this.port.write("g");
    console.log("Start Data Flow");
  }

  Stop() {
    this.port.write("p");
    console.log("Stop Data Flow");
  }

  SetConfig(config) {
    this.port.write(config[0] + "," + config[1]);
    console.log("Frequency : Multiplier => " + config[0] + " : " + config[1]);
  }
}

module.exports.SerialPortClass = SerialPortClass;
