
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
    await SerialPort.list().then(
      ports => {
        ports.forEach(p => {
          if (p.manufacturer != undefined) {
            this.possible_ports.push({ manufacturer: p.manufacturer, path: p.path });
          }
        });
      }
    );
  }

  PrintPortList() {
    this.possible_ports.forEach(port => {
      console.log(port.manufacturer, port.path);
    });
  }

  AutoConnect(event) {
    this.possible_ports.forEach(port => {
      if (port.manufacturer.includes("Arduino")) {
        this.port = new SerialPort(port.path, { baudRate: this.baudRate });
        console.log("Connecting to port: " + port.path + "...");
      }
    });

    this.parser = this.port.pipe(new Readline({ delimiter: "\r\n" }));
    this.parser.on("data", (data) => {
      event.reply("datastream", data);
    });
  }

  ManualConnect(event, path) {
    this.port = new SerialPort(path, { baudRate: this.baudRate });
    this.parser = this.port.pipe(new Readline({ delimiter: "\r\n" }));
    this.parser.on("data", (data) => {
      event.reply("datastream", data);
    });
  }

  Close() {
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
