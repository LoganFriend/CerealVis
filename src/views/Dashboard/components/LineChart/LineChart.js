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
            yAxes: [{
              ticks: {
                Min: 0,
                Max: 100
              }
            }],
            xAxes: [
              {
                type: "time",
                time: {
                  unit: "second"
                },
                realtime: {
                  delay: 1000
                }
              }
            ]
          },
          events: []
        }}
      />
    );

    window.ipcRenderer.on("datastream", (event, arg) => {
      this.linechart.props.data.datasets.forEach(function(dataset) {
        dataset.data.push({
          x: Date.now(),
          y: Math.floor(arg / 1024 * 100)
        });
      });
    });

  }
  render() {
    return this.linechart;
  }
}

export default LineChart;
