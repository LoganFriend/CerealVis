import React, { Component } from "react";
import Chart from "./chart";
import "./app.css";

class Ping extends React.Component {
  constructor(props) {
    super(props);
    // This binding is necessary to make `this` work in the callback
    this.sendPing = this.sendPing.bind(this);
  }
  sendPing(e) {
    e.preventDefault();
    window.ipcRenderer.send("ping");
  }
  render() {
    return <button onClick={this.sendPing}>Ping</button>;
  }
}

class SerialButtons extends Component {
  constructor(props) {
    super(props);

    this.connect = this.connect.bind(this);
    this.close = this.close.bind(this);
  }

  connect(e) {
    e.preventDefault();
    window.ipcRenderer.send("run");
  }

  close(e) {
    e.preventDefault();
    window.ipcRenderer.send("close");
  }

  render() {
    return (
      <div>
        <button onClick={this.connect}>Start Serial Connection</button>
        <button onClick={this.close}>Close Serial Connection</button>
      </div>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    lineChartData: {
      labels: [],
      datasets: [
        {
          type: "line",
          label: "Sensor Readings",
          borderColor: "rgb(54, 162, 235)",
          backgroundColor: "rgba(54, 162, 235, 0.5)",
          borderWidth: "2",
          fill: true,
          cubicInterpolationMode: "monotone",
          data: []
        }
      ]
    },
    lineChartOptions: {
      responsive: true,
      maintainAspectRatio: false,
      tooltips: {
        enabled: true
      },
      scales: {
        xAxes: [
          {
            type: "realtime",
            realtime: {
              frameRate: 25,
              duration: 10000,
              delay: 2000
            },
            //duplicate type: , however this is to remove a deprecation warning given
            // by chartjs, since time.format is deprecated and the realtime type uses
            // that format
            type: "time",
            time: {
              parser: "DD/MM/YYYY"
            }
          }
        ]
      }
    }
  };

  //Setup IPC Listener Once the Chart has loaded in
  componentDidMount() {
    window.ipcRenderer.on("datastream", (event, arg) => {
      const OldDataset = this.state.lineChartData.datasets[0];
      let NewDataset = { ...OldDataset };

      NewDataset.data.push({
        x: Date.now(),
        y: arg
      });

      const newChartData = {
        ...this.state.lineChartData,
        datasets: [NewDataset],
        labels: this.state.lineChartData.labels.concat(
          new Date().toLocaleTimeString()
        )
      };

      this.setState({ lineChartData: newChartData });
    });
  }

  render() {
    return (
      <div>
        <SerialButtons />
        <Ping />
        <Chart
          data={this.state.lineChartData}
          options={this.state.lineChartOptions}
        />
      </div>
    );
  }
}

//Other IPC Stuff

window.ipcRenderer.on("pong", (event, arg) => {
  console.log("pong"); // prints "pong"
});

export default App;
