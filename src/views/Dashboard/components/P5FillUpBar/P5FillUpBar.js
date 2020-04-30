import React, { useState, useEffect } from "react";
import { FillUpBarSketch } from "./FillUpBarSketch";

/*
The P5FillUpBar hook passes data to the /FillUpBarSketch/index.js file
this allows the p5 canvas to receive live data. This hook also displays the sketch.

stream => sets the data state to the data read in from the connected device
useEffect => automatically called when react renders this prop, creates the "datastream" listener
useEffect : return => automatically called when react no longer renders this prop, destroys the "datastream" listener
 */

export default () => {
  // sets the initial state
  const [data, setData] = useState(0);

  // the implementation of the "datastream" listener
  const stream = (event, data) => {
    setData(Math.floor((data / 1024) * 100) * 2);
  };

  // useEffect automatically called when this hook is rendered by react
  useEffect(() => {
    window.ipcRenderer.on("datastream", stream); // creates listener

    // return inside of useEffect is automatically called when this hook is no longer being rendered by react
    return () => {
      window.ipcRenderer.removeListener("datastream", stream); // destroys listener
    };
  }, []);

  return (
    <div>
      <FillUpBarSketch p5Props={{ data: data }} />
    </div>
  );
};
