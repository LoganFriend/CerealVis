import React, { Component } from "react";
import { Button } from "@material-ui/core";

import Popup from "reactjs-popup";
import "../Serial/style.css";

function startstop(e) {
  // This functions sends commands through the serialport IPC channel
  // to start or start/stop reading data from the port
  // it relies on the state of the component
  if (e != null) e.preventDefault();

  var args = {};

  if (this.state.text === "Start") {
    args.cmd = "start";
    this.setState({
      text: "Stop",
      color: "secondary",
    });
    window.ipcRenderer.send("log", "info", "Opening Connection");
  } else {
    args.cmd = "stop";
    this.setState({
      text: "Start",
      color: "primary",
    });
    window.ipcRenderer.send("log", "info", "Closing Connection");
  }

  window.ipcRenderer.send("serialport", args);
  return args.cmd;
}

function disconnect() {
  // This functions sends a command through the serialport IPC channel
  // to close the port and bring back the pop-up
  var args = {};
  args.cmd = "disconnect";
  window.ipcRenderer.send("serialport", args);

  this.devices = "";
  this.setState({ open: true });
}

function getdevices() {
  // this functions sends a command through the serialport IPC channel
  // to get a list of available devices
  var args = {};
  args.cmd = "getportlist";
  window.ipcRenderer.send("serialport", args);

  window.ipcRenderer.once("serialport", (event, args) => {
    this.devices = args;
    // If there is only one device connected, go ahead and connect to that one
    if (Object.keys(this.devices).length === 1) {
      this.connect(this.devices.path);
    } else {
      this.forceUpdate();
    }
  });
}

function connect(path) {
  // this functions sends a command through the serialport IPC channel
  // to connect to a device
  var args = {};
  args.cmd = "connect";
  if (path == null) {
    args.port = "AUTO";
  } else {
    args.port = path;
  }
  window.ipcRenderer.send("serialport", args);

  // it also waits for a boolean to verify the connection
  // was made sucessfully and will close the pop up if it was
  window.ipcRenderer.once("serialport", (event, arg) => {
    if (arg) {
      window.ipcRenderer.send("log", "success", "Connection established!");
      this.closeModal();
    } else {
      window.ipcRenderer.send(
        "log",
        "error",
        "Unable to establish a connection"
      );
      this.setState({ msg: "Please, try again" });
    }
  });
}

class Serial extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: "Start",
      color: "primary",
      open: true,
      msg: "Connect to your device to continue",
    };

    this.startstop = startstop.bind(this);

    this.disconnect = disconnect.bind(this);
    this.connect = connect.bind(this);

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);

    this.getdevices = getdevices.bind(this);

    this.devices = "";

    // this create an issue when data is being graphed and the
    // disconnect button is clicked, it prevents the popup to re-appear
    window.ipcRenderer.on("datastream", (event, args) => {
      this.setState({ open: false });
    });
  }

  openModal() {
    this.setState({ open: true });
  }
  closeModal() {
    this.setState({ open: false });
  }

  render() {
    return (
      <div>
        <Popup
          open={this.state.open}
          closeOnDocumentClick={false}
          closeOnEscape={false}
          onClose={this.closeModal}
        >
          <div className="modal">
            <div className="header">{this.state.msg}</div>
            <div className="actions">
              <Button
                className="button"
                color="primary"
                variant="contained"
                onClick={this.getdevices}
              >
                Search devices
              </Button>
            </div>
            <div className="devices">
              {Object.keys(this.devices).map((keyName, i) => (
                <div key={i}>
                  <Button
                    className="button"
                    color="primary"
                    variant="contained"
                    // this creates some performance issues as a different function reference
                    // for connect is created for each device in the list
                    onClick={() => this.connect(this.devices[keyName].path)}
                  >
                    {this.devices[keyName].manufacturer} on{" "}
                    {this.devices[keyName].path}
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </Popup>
        <Button
          variant="contained"
          color={this.state.color}
          onClick={() => {
            var message = this.startstop(null);
          }}
          size="large"
          style={{
            marginBottom: 10,
            marginTop: 0,
          }}
        >
          {this.state.text}
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={this.disconnect}
          size="large"
          style={{
            marginBottom: 10,
            marginTop: 0,
            marginLeft: 5,
          }}
        >
          Disconnect
        </Button>
      </div>
    );
  }
}

export default Serial;
