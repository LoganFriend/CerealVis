import React, { useState, useEffect } from 'react';
import { GameSketch } from './GameSketch';

export default () => {
  const [data, setData] = useState(0);

  const stream = (event, data) => {
    setData((Math.floor(data / 1024 * 100)) * 2.7);
  }

  useEffect(() => {
    window.ipcRenderer.on('datastream', stream);
    return () => {
      window.ipcRenderer.removeListener('datastream', stream);
    }
  }, []);

  return (
    <div>
      <GameSketch
          p5Props={{ data: data }}
      />
    </div>
  );
}