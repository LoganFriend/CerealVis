import React, { Component } from "react";
import {Button} from '@material-ui/core';

function sendcommand(e) {
  e.preventDefault();
  console.log("IPC: run");
  window.ipcRenderer.send("run");
}

class SerialButton extends Component {
  constructor(props) {
    super(props);
    // This binding is necessary to make `this` work in the callback
    this.sendcommand = sendcommand.bind(this);
  }
  render() {
    return (
      <Button variant="contained" color="primary" onClick={this.sendcommand}>
      Start Serial Connection
    </Button>
    );
  }
}

export default SerialButton;
