import React, { Component } from "react";
import { Line } from "react-chartjs-2";
import "chartjs-plugin-streaming";
import "moment";
import moment from "moment";

class LineChart extends Component {
  constructor(props) {
    super(props);

    this.linechart = (
      <Line
        data={{
          datasets: [
            {
              label: "Dataset 1",
              borderColor: "rgb(139,0,139)",
              backgroundColor: "rgba(123,104,238, 0.5)",
              lineTension: 0,
              borderDash: [8, 4]
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
