import React, { Component } from "react";
import Popup from "reactjs-popup";
import { Button } from "@material-ui/core";
import "../Popup/style.css";

function getdevices() {
  var args = {};
  args.cmd = "getportlist";
  window.ipcRenderer.send("serialport", args);
}

function connect(e, path) {
  e.preventDefault();
  var args = new Object();
  args.cmd = "connect";
  if (path != null) {
    args.port = "AUTO";
  } else {
    args.port = path;
  }
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

    this.devices = '';

    window.ipcRenderer.on("serialport", (event, args) => {
      this.devices = args;
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
              {Object.keys(this.devices).map((keyName, i) => (
                <li key={i}>
                  <Button
                  className="button"
                  color="primary"
                  variant="contained"
                  onClick={this.connect}
                  >
                    {this.devices[keyName].manufacturer}
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Popup>
    );
  }
}

export default PopUp;
