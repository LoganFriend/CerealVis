import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import { Card, CardContent, Typography } from "@material-ui/core";

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
  const classes = useStyles();

  var count = 0;
  var sum = 0;

  var [max, setMax] = useState(0);
  var [current, setCurrent] = useState(0);
  var [average, setAverage] = useState(0);

  const stats = (event, data) => {
    current = Math.floor((data / 1024) * 100);
    setCurrent(current);

    if (current > max) {
      max = current;
      setMax(max);
    }

    if (!sum) {
      count = 0;
      sum = 0;
    }

    sum += current;

    average = Math.floor(sum / ++count);
    setAverage(average);
  };

  const refresh = () => {
    max = 0;
    current = 0;
    average = 0;
    setMax(0);
    setCurrent(0);
    setAverage(0);
  };

  useEffect(() => {
    window.ipcRenderer.on("datastream", stats);
    window.ipcRenderer.on("serialport", refresh);

    return function cleanup() {
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
