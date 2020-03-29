import React, { Component } from "react";
import Popup from "reactjs-popup";
import { Button } from "@material-ui/core";
import "../Popup/style.css";

function getdevices() {
  var args = {};
  args.cmd = "getportlist";
  window.ipcRenderer.send("serialport", args);
  console.log("sent");
}

function convertDevicesObjectToArray(devicesObject) {
  var devicesManufacturers = [devicesObject.length];
  var devicesPaths = [devicesObject.length];
  for (var i = 0; i < devicesObject.length; i++) {
    devicesManufacturers[i] = devicesObject[i].manufacturer;
    devicesPaths[i] = devicesObject[i].path;
  }
  return devicesManufacturers;
}

function connect(e) {
  e.preventDefault();
  var args = new Object();
  args.cmd = "connect";
  args.port = "AUTO";
  window.ipcRenderer.send("serialport", args);

  window.ipcRenderer.on("serialport", (event, arg) => {
    console.log(arg);
    console.log(typeof arg);

    if (arg) {
      this.closeModal();
    } else {
      console.log("connection error...!");
    }
  });
}

class PopUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true
    };

    this.devices = null;
    this.deivceItems = null;

    window.ipcRenderer.on("serialport", (event, args) => {
      this.devices = convertDevicesObjectToArray(args);
      this.deviceItems = this.devices.map((devices) =>
        <li>{this.devices}</li>
      );
      console.log("received");
      console.log(this.devices);
      this.forceUpdate();
    });

    window.ipcRenderer.on("datastream", (event, args) => {
      this.setState({ open: false });
    })

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);

    this.connect = connect.bind(this);
    this.getdevices = getdevices.bind(this);
    this.convertDevicesObjectToArray = convertDevicesObjectToArray.bind(this);
  }

  openModal() {
    this.setState({ open: true });
  }
  closeModal() {
    this.setState({ open: false });
  }

  render() {
    return (
      <Popup
        open={this.state.open}
        closeOnDocumentClick
        onClose={this.closeModal}
      >
        <div className="modal">
          <div className="header">Connect to your device to continue</div>
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
          <div>
            Devices
            <ul>
              {this.deviceItems}
            </ul>
          </div>
        </div>
      </Popup>
    );
  }
}

export default PopUp;
