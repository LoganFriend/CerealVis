import React, { useState, useEffect } from "react";
import { Button } from "@material-ui/core";
import Popup from "reactjs-popup";

import "../Serial/style.css";

/*
The Serial Hook allows the user to create and destroy connections with ports and
it also allows allows the the starting and stopping of data flow

serialport => the implementation of the listener that listener that asks for the device list
useEffect => automatically called when react renders this prop, creates 2 listeners
useEffect : return => automatically called when react no longer renders this prop, destroys 2 listeners
startstop => starts and stops the connected devices flow of data
connect => creates a connection with the specified connected device
disconnect => destroys the connection with the device when conditions are met
getdevices => helps determine the device that the connection will be made with
closeModal => closes the pop up message
 */

export default () => {
  // sets the initial variable states
  const [text, setText] = useState("Start");
  const [color, setColor] = useState("primary");
  const [isOpen, setIsOpen] = useState(true);
  const [message, setMessage] = useState("Connect your device to continue");
  const [devices, setDevices] = useState([]);

  // serial port is the implementation of the "seriaport" listener it sets the list of ports available
  const serialport = (event, args) => {
    setDevices(args);
  };

  // useEffect is automatically called when this component is rendered by react its creates 2 listeners
  useEffect(() => {
    window.ipcRenderer.on("serialport", serialport);
    window.ipcRenderer.on("datastream", closeModal);

    // return within useEffect is automatically called when this component is no longer being rendered by react
    // it destroys the 2 previously created listeners
    return () => {
      window.ipcRenderer.removeListener("serialport", serialport);
      window.ipcRenderer.removeListener("datastream", closeModal);
    };
  }, []);

  // startstop tells the connected device if it should send data or not
  const startstop = () => {
    var args = {};

    if (text === "Start") { // true when the button says "Start"
      args.cmd = "start"; // sets the command to start
      setText("Stop"); // changes the text value of the button to "Stop"
      setColor("primary");
      // sends a snack bar message telling the user the connection is being opened
      window.ipcRenderer.send("log", "info", "Opening Connection");
    } else {
      args.cmd = "stop"; // sets the command to stop
      setText("Start"); // changes the text value of the button to "Start"
      setColor("primary");
      // sends a snack bar message telling the user the connection is being closed
      window.ipcRenderer.send("log", "info", "Closing Connection");
    }

    // tells the connected device to either start or stop data flow depending on the commands value
    window.ipcRenderer.send("serialport", args);
  };

  // connect establishes the connection with the specified port
  const connect = (path) => {
    var args = {};
    args.cmd = "connect";

    if (path == null) { // determines if the default port value should be used or not
      args.port = "AUTO";
    } else {
      args.port = path;
    }

    // sends the information over to the electron.js file so the connection can be made
    window.ipcRenderer.send("serialport", args);

    // determines if the connection was sucessfully made or not
    window.ipcRenderer.once("serialport", (_, arg) => {
      if (arg) {
        window.ipcRenderer.send("log", "success", "Connection established!"); // sends snack bar message
        closeModal(); // closes the connection pop up
      } else {
        window.ipcRenderer.send(
          "log",
          "error",
          "Unable to establish a connection"
        ); // sends snack bar message
        setMessage("Please, try again");
      }
    });
  };

  // disconnect destroys the port connection when conditions are properly met
  const disconnect = async () => {
    if ({text}.text === "Stop") { // true when the data is still flowing
      // sends an error message that tells the user to stop the data flow before disconnecting
      window.ipcRenderer.send("log", "error", "Please stop the data stream before closing the connection.");
      return;
    }
    var args = {};
    args.cmd = "disconnect";
    window.ipcRenderer.send("serialport", args); // sends a message to electron.js to destroy the connection
    window.ipcRenderer.send("log", "success", "Connection terminated!"); // sends a snack bar message
    setIsOpen(true); // re-opens the pop up
  };

  // getdevices sends a command through the serialport IPC channel to get a list of available devices
  const getdevices = () => {
    var args = {};
    args.cmd = "getportlist";
    window.ipcRenderer.send("serialport", args); // sends the command to the serial.js file

    // listens for the response to the message that was just send
    window.ipcRenderer.once("serialport", (event, args) => {
      //Check if one of the ports has the arduino manufacturer
      for (var i = 0; i < args.length; i++) {
        if (
          args[i].manufacturer.includes("Arduino") ||
          args[i].manufacturer.includes("Silicon Labs")
        )
          connect(args[i].path);
      }
    });
  };

  // closeModal closes the connection pop up message
  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <Popup
        open={isOpen}
        closeOnDocumentClick={false}
        closeOnEscape={false}
        onClose={closeModal}
        contentStyle={{
          width: "400px",
          borderRadius: 12,
          background: "#f7f7f7",
          border: 500,
        }}
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
                  {devices[keyName].manufacturer} on {devices[keyName].path}
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
};
