import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import { Card, CardContent, Typography } from "@material-ui/core";

/*
The Stats Hook calculates and displays the statistical information of the data that
the connected devices provides.

useStyles => helps determine the styling of the stats blocks
stats => implementation of a listener calculates and updates the stats values
refresh => implementation of a listener resets the stats blocks values when a new connection is established
useEffect => automatically called when react renders this prop, creates 2 listeners
useEffect : return => automatically called when react no longer renders this prop, destroys 2 listeners
 */

// useStyles deals with the styles of the various stats blocks
const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    borderRadius: 12,
    padding: 5,
    margin: "auto",
    marginBottom: 20,
    marginTop: 20,
  },
  title: {
    fontWeight: 1000,
  },
  divider: {
    margin: 5,
    color: "#000000",
  },
}));

export default () => {
  // sets the initial states of the variables
  const classes = useStyles();
  var count = 0;
  var sum = 0;
  var [max, setMax] = useState(0);
  var [current, setCurrent] = useState(0);
  var [average, setAverage] = useState(0);

  // stats is the implementation of the "datastream" event listener
  // stats calculates and updates the data that will be displayed
  const stats = (event, data) => {
    current = Math.floor((data / 1024) * 100);
    setCurrent(current);

    if (current > max) { // checks for a new max value
      max = current;
      setMax(max);
    }

    if (!sum) { // makes sure sum is no an invalid number
      count = 0;
      sum = 0;
    }

    sum += current;

    average = Math.floor(sum / ++count);
    setAverage(average);
  };

  // refresh resets the stats values when a new connection is created
  // this is the implementation of the "serialport" listener
  const refresh = () => {
    max = 0;
    current = 0;
    average = 0;
    setMax(0);
    setCurrent(0);
    setAverage(0);
  };

  // useEffect automatically called when this hook is rendered by react it creates 2 listeners
  useEffect(() => {
    window.ipcRenderer.on("datastream", stats);
    window.ipcRenderer.on("serialport", refresh);

    // return inside of useEffect is automatically called when this hook is no longer being rendered by react
    return () => {
      window.ipcRenderer.removeListener("datastream", stats);
      window.ipcRenderer.removeListener("serialport", refresh);
    };
  }, []);

  return (
    <div>
      <Card className={classes.root}>
        <CardContent>
          <Typography
            color="textSecondary"
            variant="h6"
            align="center"
            paragraph
          >
            MAXIMUM
          </Typography>

          <Typography variant="h1" align="center">
            {max}
            {"%"}
          </Typography>

          <br />
        </CardContent>
      </Card>
      <Card className={classes.root}>
        <CardContent>
          <Typography
            color="textSecondary"
            variant="h6"
            align="center"
            paragraph
          >
            CURRENT
          </Typography>
          <Typography variant="h1" align="center">
            {current}
            {"%"}
          </Typography>

          <br />
        </CardContent>
      </Card>
      <Card className={classes.root}>
        <CardContent>
          <Typography
            color="textSecondary"
            variant="h6"
            align="center"
            paragraph
          >
            AVERAGE
          </Typography>
          <Typography variant="h1" align="center">
            {average}
            {"%"}
          </Typography>
          <br />
        </CardContent>
      </Card>
    </div>
  );
};
