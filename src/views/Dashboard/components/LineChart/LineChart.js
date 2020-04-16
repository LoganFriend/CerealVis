import React, { useEffect, useRef, useState } from 'react';
import Chartjs from 'chart.js';
import "chartjs-plugin-streaming";

let points = [];

const chartConfig = {
  type: 'line',
  data: {
    datasets: [{
      label: "Realtime Data Stream",
      borderColor: "#0277bd",
      backgroundColor: "#fbfcfd",
      data: points
    }]
  },
  options: {
    animation: false,
    spanGaps: true,
    elements: {
      line: {
        tension: 0,
        stepped: false,
        borderDash: []
      },
      point: {
        radius: 0
      }
    },
    scales: {
      yAxes: [{
        ticks: {
          suggestedMin: 0,
          suggestedMax: 100
        }
      }],
      xAxes: [{
        type: "time",
        time: {
          unit: "second"
        },
        realtime: {
          delay: 2000,
          ttl: 22000
        }
      }]
    },
    events: []
  }
};

const Chart = () => {
  const chartContainer = useRef(null);
  var chartInstance = useState(null);

  useEffect(() => {
    if (chartContainer && chartContainer.current) {
      chartInstance = new Chartjs(chartContainer.current, chartConfig);
    }

    window.ipcRenderer.on("datastream", (event, arg) => {  
      points.push({
        x: Date.now(),
        y: Math.floor(arg / 1024 * 100)
      });
    });
  }, [chartContainer]);

  const updateData = (arg) => {
    chartInstance.data.datasets[0].data = arg;
    chartInstance.update();
  }

  return (
    <div>
      <canvas ref={chartContainer} />
    </div>
  );
}

export default Chart;
