const SerialPort = require("serialport");
const Readline = require("@serialport/parser-readline");

/*
The SerialPort Class is a class that handles the connection and data flow
between the connected module and the app as a whole.

constructor() => sets the default values of the class
CreatePortLIst() => creates a list of possible ports to connect to
GetPortList() => returns the array that holds the possible ports data
Connect() => establishes a connection with the specified port if possible
EnsurePause() => forces the data to stop flowing, this is important when closing a connection
Disconnect() => this function disconnects from the port and cleans up to allow new connections
Start() => this function starts the data flow when a device is connected
Stop() => this function stops the data flow when a device is connected
 */

class SerialPortClass {
  constructor() {
    this.baudRate = 9600;
    this.currentPath = null;
    this.possible_ports = [];
    this.CreatePortList();
    this.connected = () => {
      if (this.port == null) {
        console.log("SerialPort: No port established");
        return false;
      }
      return true;
    };
  }

  async CreatePortList() {
    // this function creates an array of available ports
    // before anything is added to the array, the array is cleared
    this.possible_ports = [];
    var ports = await SerialPort.list();
    for (var i = 0; i < ports.length; i++) {
      if (ports[i].manufacturer != undefined) {
        this.possible_ports.push({
          manufacturer: ports[i].manufacturer,
          path: ports[i].path,
        });
      }
    }
  }

  GetPortList() {
    // this function returns the array of available ports
    return this.possible_ports;
  }

  Connect(event, path = "AUTO") {
    // this function attempts to create a connection with a specified port
    // if no port is specified the function attempts to create a connection with an arduino or silicon labs module
    // returns true when a was connection made, false when a connection was not made
    var valid_port = false;

    for (var i = 0; i < this.possible_ports.length; i++) {
      if (path == "AUTO") {
        if (
          this.possible_ports[i].manufacturer.includes("Arduino") ||
          this.possible_ports[i].manufacturer.includes("Silicon Labs")
        ) {
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

    if (this.currentPath == path) { // true when a connection is already established with the specified port
      return true;
    }

    if (valid_port) { // true when a connection can be made
      this.port = new SerialPort(path, { baudRate: this.baudRate }, function (
        err
      ) {
        if (err) {
          console.log("Error: " + err.message);
        }
      });
      this.parser = this.port.pipe(new Readline({ delimiter: "\r\n" }));
      this.parser.on("data", event);
      this.currentPath = path;
      return true;
    }

    return false;
  }

  // this function ensures that the data flow is paused
  async EnsurePause() {
    this.port.write("p").then(() => {
      return;
    });
  }

  // this function handles the serial port disconnect
  async Disconnect() {
    if (!this.connected()) return; // checks to make sure a connection is established
    await this.EnsurePause(); // calls the ensure pause function to pause data flow before disconnecting
    this.port.close();
    this.port = null;
    this.parser = null;
    this.currentPath = null;
    console.log("SerialPort: Port closed");
  }

  // this function tells the connected module to start sending data
  Start() {
    if (!this.connected()) return; // checks to make sure a connection is established
    this.port.write("g");
    console.log("SerialPort: Starting Data Flow");
  }

  // this function tells the connected module to stop sending data
  Stop() {
    if (!this.connected()) return; // checks to make sure a connection is established
    this.port.write("p");
    console.log("SerialPort: Stopping Data Flow");
  }
}

module.exports.SerialPortClass = SerialPortClass;
