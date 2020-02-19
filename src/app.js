import React, { Component } from "react";
import "./app.css";

import { Line } from "react-chartjs-2";
import "chartjs-plugin-streaming";
import { getDefaultNormalizer } from "@testing-library/react";

class LineChart extends React.Component {
  constructor(props) {
    super(props);

    this.linechart = (
      <Line
        data={{
          datasets: [
            {
              label: "Dataset 1",
              borderColor: "rgb(255, 99, 132)",
              backgroundColor: "rgba(255, 99, 132, 0.5)",
              lineTension: 0,
              borderDash: [8, 4]
            },
            {
              label: "Dataset 2",
              borderColor: "rgb(54, 162, 235)",
              backgroundColor: "rgba(54, 162, 235, 0.5)"
            }
          ]
        }}
        options={{
          scales: {
            xAxes: [
              {
                type: "realtime",
                realtime: {
                  delay: 2000
                }
              }
            ]
          }
        }}
      />
    );

    window.ipcRenderer.on("datastream", (event, arg) => {
      this.linechart.props.data.datasets.forEach(function(dataset) {
        dataset.data.push({
          x: Date.now(),
          y: arg
        });
      });
    });
    
  }
  render() {
    return this.linechart;
  }
}

class Ping extends React.Component {
  constructor(props) {
    super(props);
    // This binding is necessary to make `this` work in the callback
    this.sendPing = this.sendPing.bind(this);
  }
  sendPing(e) {
    e.preventDefault();
    window.ipcRenderer.send("log", "ping");
  }
  render() {
    return <button onClick={this.sendPing}>Ping</button>;
  }
}

function sendcommand(e) {
  e.preventDefault();

  //Build Command for serial connection:
  var cmd = new Object();
  cmd.Command = "SerialConnect";
  cmd.Port = "COM8";
  cmd.BaudRate = "9600";

  window.ipcRenderer.send("run", cmd);
}

class Button extends Component {
  constructor(props) {
    super(props);
    // This binding is necessary to make `this` work in the callback
    this.sendcommand = sendcommand.bind(this);
  }
  render() {
    return <button onClick={this.sendcommand}>Start Serial Connection</button>;
  }
}

class App extends Component {
  render() {
    return (
      <div>
        <Ping />
        <Button />
        <LineChart />
      </div>
    );
  }
}

//IPC Stuff

window.ipcRenderer.on("asynchronous-reply", (event, arg) => {
  console.log(arg); // prints "pong"
});

export default App;
