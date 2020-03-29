import React, { Component } from "react";
import Popup from "reactjs-popup";
import { Button } from "@material-ui/core";
import "../Popup/style.css";

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
      this.setState({ msg: "Please, try again" });
      console.log("connection error...!");
    }
  });
}

class PopUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true,
      msg: "Connect to your device to continue"
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);

    this.connect = connect.bind(this);
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
              onClick={this.connect}
            >
              Search devices
            </Button>
          </div>
        </div>
      </Popup>
    );
  }
}

export default PopUp;
