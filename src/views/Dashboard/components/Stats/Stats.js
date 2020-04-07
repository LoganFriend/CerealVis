import React, {useEffect, useState} from "react";
import { makeStyles } from "@material-ui/styles";
import { Card, CardContent, Typography } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    height: "100%"
  },
  title: {
    fontWeight: 1000
  }
}));

export default () => {
  const classes = useStyles();

  var count = 0;
  var sum = 0;

  var [max, setMax] = useState(0);
  var [current, setCurrent] = useState(0);
  var [average, setAverage] = useState(0);

  const stats = (event, data) => {
    current = Math.floor(data / 1024 * 100);
    setCurrent(current);

    if (current > max) {
      max = current;
      setMax(max);
    }

    sum += current;

    average = Math.floor(sum / ++count);
    setAverage(average);
  }

  useEffect(() => {
    window.ipcRenderer.on("datastream", stats);

    return function cleanup() {
      window.ipcRenderer.removeListener("datastream", stats);
    }
  }, []);

  return (
    <div>
      <Card className={classes.root}>
        <CardContent>
          <div>
            <Typography color="textSecondary" variant="h6" align="center" gutterBottom>
              MAXIMUM
            </Typography>
            <Typography variant="h1" align="center">
              {max}{"%"}
            </Typography>
            <br />
          </div>
          <div>
            <Typography color="textSecondary" variant="h6" align="center" gutterBottom>
              CURRENT
            </Typography>
            <Typography variant="h1" align="center">
              {current}{"%"}
            </Typography>
            <br />
          </div>
          <div>
            <Typography color="textSecondary" variant="h6" align="center" gutterBottom>
              AVERAGE
            </Typography>
            <Typography variant="h1" align="center">
              {average}{"%"}
            </Typography>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
