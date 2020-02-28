import React, { Component } from "react";

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
      <button className="btn-primary m-2" onClick={this.sendcommand}>
        Start Serial Connection
      </button>
    );
  }
}

export default SerialButton;
