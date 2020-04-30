import React, { useEffect, useRef, useState } from "react";
import Chartjs from "chart.js";
import "chartjs-plugin-streaming";

/*
The LineChart Hook creates a chart that reads in and displays the data coming
in from the connected device live.

charConfig => determines how the chart will look
useEffect => automatically called when react renders this prop, creates a listener
useEffect : return => automatically called when react no longer renders this prop, destroys a listener
onReceive => calculates data points and adds them to the chart
 */

// charConfig determines how the chart will look
const chartConfig = {
  type: "line",
  data: {
    datasets: [
      {
        label: "Realtime Data Stream",
        borderColor: "#03a9f4",
        backgroundColor: "#fbfcfd",
        borderWidth: 1,
        fill: "origin",
        data: [],
      },
    ],
  },
  options: {
    animation: false,
    spanGaps: true,
    elements: {
      line: {
        tension: 0,
        stepped: false,
        borderDash: [],
      },
      point: {
        radius: 0,
      },
    },
    scales: {
      yAxes: [
        {
          ticks: {
            suggestedMin: 0,
            suggestedMax: 100,
          },
        },
      ],
      xAxes: [
        {
          type: "time",
          time: {
            unit: "second",
          },
          realtime: {
            delay: 1000,
            ttl: 15000,
          },
        },
      ],
    },
    events: [],
  },
};

export default () => {
  // sets the initial variable states
  const chartContainer = useRef(null);
  var chartInstance = useState(null);

  // useEffect automatically called when this hook is rendered by react
  useEffect(() => {
    // true when both elements in the if block exist
    if (chartContainer && chartContainer.current) {
      chartInstance = new Chartjs(chartContainer.current, chartConfig);
    }
    window.ipcRenderer.on("datastream", onReceive); // creates a listener

    // return inside of useEffect is automatically called when this hook is no longer being rendered by react
    return () => {
      window.ipcRenderer.removeListener("datastream", onReceive); // destroys a listener
    };
  }, [chartContainer]);

  // onRecieve is the implementation of the "datastream" listener
  // it calculates and adds new data points to the chart
  const onReceive = (event, args) => {
    // append the new data to the existing chart data
    chartInstance.data.datasets[0].data.push({
      x: Date.now(),
      y: Math.floor((args / 1024) * 100),
    });

    // update chart datasets keeping the current animation
    chartInstance.update({
      preservation: true,
    });
  };

  return (
    <div>
      <canvas ref={chartContainer} />
    </div>
  );
};
