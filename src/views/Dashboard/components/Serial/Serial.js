import React, { Component } from "react";
import { Button } from "@material-ui/core";

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

  if (args.cmd == "start") {
    args.msg = "Starting data flow.";
  } else {
    args.msg = "Stopping data flow.";
  }

  window.ipcRenderer.send("serialport", args);
  window.ipcRenderer.send("snackbar", args);
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
  }

  render() {
    return (
      <div>
        <Button
          variant="contained"
          color={this.state.color}
          onClick={this.startstop}
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
