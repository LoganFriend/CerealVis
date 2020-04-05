import React, { Component } from "react";
import Popup from "reactjs-popup";
import { Button } from "@material-ui/core";
import "../Popup/style.css";

function getdevices() {
  var args = {};
  args.cmd = "getportlist";
  window.ipcRenderer.send("serialport", args);
}

function connect(path) {
  var args = {};
  args.cmd = "connect";
  if (path == null) {
    args.port = "AUTO";
  } else {
    console.log(path);
    args.port = path;
  }
  window.ipcRenderer.send("serialport", args);

  window.ipcRenderer.on("serialport", (event, arg) => {
    console.log(arg);

    if (arg) {
      this.closeModal();
    } else {
      this.setState({ msg: "Please, try again" });
      console.log("connection error...!");
    }
  });
}

class PopUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      msg: "Connect to your device to continue",
    };

    this.devices = "";

    window.ipcRenderer.on("serialport", (event, args) => {
      this.devices = args;
      console.log(this.devices);
      this.forceUpdate();
    });

    window.ipcRenderer.on("datastream", (event, args) => {
      this.setState({ open: false });
    });

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);

    this.connect = connect.bind(this);
    this.getdevices = getdevices.bind(this);
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
    );
  }
}

export default PopUp;
