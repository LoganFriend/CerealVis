import React, { Component } from "react";
import { Button } from "@material-ui/core";

function startstop(e) {
  e.preventDefault();

  var args = {};

  if (this.state.text === "Start") {
    args.cmd = "toggle_on";
    this.setState({
      text: "Stop",
      color: "secondary"
    });
  } else {
    args.cmd = "toggle_off";
    this.setState({
      text: "Start",
      color: "primary"
    });
  }

  window.ipcRenderer.send("serialport", args);
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
    );
  }
}

export default SerialButton;
