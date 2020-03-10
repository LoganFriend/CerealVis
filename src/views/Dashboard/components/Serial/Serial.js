import React, { Component } from "react";
import { Button } from "@material-ui/core";

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

class SerialButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: "Start"
    };
    this.connect = connect.bind(this);
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
