import React, { Component } from "react";
import { Button } from "@material-ui/core";
import SnackBarMessage from "../SnackBar"

function startstop(e) {
  if (e != null)
    e.preventDefault();

  var args = {};

  if (this.state.text === "Start") {
    args.cmd = "start";
    this.setState({
      text: "Stop",
      color: "secondary"
    });
  } else {
    args.cmd = "stop";
    this.setState({
      text: "Start",
      color: "primary"
    });
  }

  window.ipcRenderer.send("serialport", args);
  return args.cmd;
}

class SerialButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: "Start",
      color: "primary"
    };
    this.startstop = startstop.bind(this);
    this.test = SnackBarMessage;
  }

  render() {
    return (
      <div>
        <div id="snackbar"></div>
        <Button
          variant="contained"
          color={this.state.color}
          onClick={() => {
            var message = this.startstop(null);
            if (message == "start") {
              this.test("Starting data flow.");
            } else {
              this.test("Stopping data flow.")
            }
          }}
          size="large"
          style={{
            marginBottom: 10,
            marginTop: 0
          }}
        >
          {this.state.text}
        </Button>
      </div>
    );
  }
}

export default SerialButton;
