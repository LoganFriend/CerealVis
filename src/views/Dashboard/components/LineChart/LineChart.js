import React, { Component } from "react";
import { Line } from "react-chartjs-2";
import "chartjs-plugin-streaming";

class LineChart extends Component {
  constructor(props) {
    super(props);

    this.linechart = (
      <Line
        data={{
          datasets: [
            {
              label: "Dataset 1",
              borderColor: "#0277bd",
              backgroundColor: "#fbfcfd",
              lineTension: 0
            }
          ]
        }}
        options={{
          scales: {
            xAxes: [
              {
                type: "time",
                time: {
                  unit: "second"
                },
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

    /*setInterval(function() {
      this.linechart.props.data.datasets.forEach(function(dataset) {
        dataset.data.push({
          x: Date.now(),
          y: Math.random(1005)
        });
      });
    }, 2500);*/

    /*window.ipcRenderer.on("datastream", (event, arg) => {
      this.linechart.props.data.datasets.forEach(function(dataset) {
        dataset.data.push({
          x: Date.now(),
          y: Math.random(1005)
        });
      });
    });*/

  }
  render() {
    return this.linechart;
  }
}

export default LineChart;
