import React, { useEffect, useRef, useState } from 'react';
import Chartjs from 'chart.js';
import "chartjs-plugin-streaming";


const chartConfig = {
  type: 'line',
  data: {
    datasets: [{
      label: "Realtime Data Stream",
      borderColor: "#0277bd",
      backgroundColor: "#fbfcfd",
      data: []
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
          delay: 1000,
          ttl: 15000
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

    window.ipcRenderer.on('datastream', onReceive);

    return () => {
      window.ipcRenderer.removeListener('datastream', onReceive);
    }

  }, [chartContainer]);

  function onReceive(event, args) {

    // append the new data to the existing chart data
    chartInstance.data.datasets[0].data.push({
      x: Date.now(),
      y: Math.floor(args / 1024 * 100)
    });

    // update chart datasets keeping the current animation
    chartInstance.update({
        preservation: true
    });
  }

  return (
    <div>
      <canvas ref={chartContainer} />
    </div>
  );
}

export default Chart;
