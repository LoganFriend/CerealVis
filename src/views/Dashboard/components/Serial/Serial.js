import React, { useState, useEffect } from 'react';
import { Button } from '@material-ui/core';
import Popup from 'reactjs-popup';

import "../Serial/style.css";

export default () => {
  const [ text, setText ] = useState('Start');
  const [ color, setColor ] = useState('primary');
  const [ isOpen, setIsOpen ] = useState(true);
  const [ message, setMessage ] = useState('Connect to your device to continue');
  const [ devices, setDevices ] = useState([]);

  const serialport = (event, args) => {
    setDevices(args);
  }

  useEffect(() => {
    window.ipcRenderer.on('serialport', serialport);
    window.ipcRenderer.on('datastream', closeModal);

    return () => {
      window.ipcRenderer.removeListener('serialport', serialport);
      window.ipcRenderer.removeListener('datastream', closeModal);
    }
  }, []);

  const startstop = () => {
    var args = {};

    if (text === 'Start') {
      args.cmd = 'start';
      setText('Stop');
      setColor('secondary');
      window.ipcRenderer.send("log", "info", "Opening Connection");
    } else {
      args.cmd = 'stop';
      setText('Start');
      setColor('primary');
      window.ipcRenderer.send("log", "info", "Closing Connection");
    }
  
    window.ipcRenderer.send("serialport", args);
  }

  const connect = (path) => {
    var args = {};
    args.cmd = "connect";

    if (path == null) {
      args.port = "AUTO";
    } else {
      args.port = path;
    }

    window.ipcRenderer.send("serialport", args);

    window.ipcRenderer.once("serialport", (_, arg) => {
      if (arg) {
        window.ipcRenderer.send("log", "success", "Connection established!");
        closeModal();
      } else {
        window.ipcRenderer.send("log", "error", "Unable to establish a connection");
        setMessage("Please, try again");
      }
    });
  }

  const disconnect = () => {
    var args = {};
    args.cmd = "disconnect";
    window.ipcRenderer.send("serialport", args);
    setIsOpen(true);
  }

  const getdevices = () => {
    // this functions sends a command through the serialport IPC channel
    // to get a list of available devices
    var args = {};
    args.cmd = "getportlist";
    window.ipcRenderer.send("serialport", args);
  
    window.ipcRenderer.once("serialport", (event, args) => {
      //Check if one of the ports has the arduino manufacturer
      for (var i = 0; i < args.length; i++){
        if(
          args[i].manufacturer.includes("Arduino") ||
          args[i].manufacturer.includes("Silicon Labs")
        ) connect(args[i].path)
      }
  
    });
  }

  const closeModal = () => {
    setIsOpen(false);
  }

  return (
    <div>
      <Popup
        open={isOpen}
        closeOnDocumentClick={false}
        closeOnEscape={false}
        onClose={closeModal}
      >
        <div className="modal">
          <div className="header">{message}</div>
          <div className="actions">
            <Button
              className="button"
              color="primary"
              variant="contained"
              onClick={getdevices}
            >
              Search devices
            </Button>
          </div>
          <div className="devices">
            {Object.keys(devices).map((keyName, i) => (
              <div key={i}>
                <Button
                  className="button"
                  color="primary"
                  variant="contained"
                  onClick={() => connect(devices[keyName].path)}
                >
                  {devices[keyName].manufacturer} on{" "}
                  {devices[keyName].path}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </Popup>
      <Button
        variant="contained"
        color={color}
        onClick={startstop}
        size="large"
        style={{
          marginBottom: 10,
          marginTop: 0,
        }}
      >
        {text}
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={disconnect}
        size="large"
        style={{
          marginBottom: 10,
          marginTop: 0,
          marginLeft: 5,
        }}
      >
        Disconnect
      </Button>
    </div>  
  );
}
