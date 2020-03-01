const SerialPort = require("serialport");
const Readline = require("@serialport/parser-readline");


class SerialPortClass {
  constructor() {
    this.port;
    this.parser;
  }

  async Connect(event) {
    await SerialPort.list().then(
      ports => {
        ports.forEach(p => {
          if (p.manufacturer != undefined) {
            if (p.manufacturer.includes("Silicon Labs") || p.manufacturer.includes("Arduino")) {
              this.port = new SerialPort(p.path, { baudRate: 9600 });
              console.log("Attemptng to connect to port " + p.path + "...");
            }
          }
        });
      },
      err => {
        console.error("Error listing ports", err);
      }
    );

    this.parser = this.port.pipe(new Readline({ delimiter: "\r\n" }));
    this.parser.on("data", event);

  }

  Open() {

  }

  Close() {
    this.port.close(function (err) {
        console.log('port closed', err);
    });
    this.parser = null;
  }
}

module.exports.SerialPortClass = SerialPortClass;
