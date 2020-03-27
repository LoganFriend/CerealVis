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
  this.closeModal(e);
}

class PopUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true
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
          <div className="header">Connect to your device to continue</div>
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
