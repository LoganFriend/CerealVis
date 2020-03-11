import React, { Component } from "react";
import { Button } from "@material-ui/core";


function startstop(e) {
  e.preventDefault();

  var args = {}

  if (this.state.text === "Start") {
    args.cmd = "toggle_on";
    this.setState({
      text: "Stop"
    });
  } else {
    args.cmd = "toggle_off";
    this.setState({
      text: "Start"
    });
  }

  window.ipcRenderer.send("serialport", args);
}

class SerialButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: "Start"
    };
    this.startstop = startstop.bind(this);
  }

  render() {
    return (
      <div>
        <Button
          variant="contained"
          color="primary"
          onClick={this.startstop}
          className="button"
        >
          {this.state.text}
        </Button>
      </div>
    );
  }
}

export default SerialButton;
