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
}

function startstop(e) {
  e.preventDefault();

  var args = new Object();
  args.cmd = "toggle";

  if (this.state.text === "Start") {
    this.setState({
      text: "Stop"
    });
  } else {
    this.setState({
      text: "Start"
    });
  }

  window.ipcRenderer.send("serialport", args);
}

class PopUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true,
      text: "Start"
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.connect = connect.bind(this);
    this.startstop = startstop.bind(this);
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
        <Button className="button" onClick={this.openModal}>
          Popup
        </Button>
        <Popup
          open={this.state.open}
          closeOnDocumentClick
          onClose={this.closeModal}
        >
          <div className="modal">
            <Button className="button" color="primary" onClick={this.connect}>
              Search
            </Button>
            <a className="close" onClick={this.closeModal}>
              &times;
            </a>
          </div>
        </Popup>
      </div>
    );
  }
}

export default PopUp;
