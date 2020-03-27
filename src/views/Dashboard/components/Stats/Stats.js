import React, {useEffect, useState} from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import { Card, CardContent, Grid, Typography } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    height: "100%"
  },
  title: {
    fontWeight: 1000
  }
}));

const Stats = props => {

  

  const { className, ...rest } = props;
  const classes = useStyles();

  // var newVal = 0;

  // var [Max, setMax] = useState(0);
  // var  = useState(0);
  // var [Avg, setAvg] = useState(0);
  // var  = useState(0);
  // var [sum, setSum] = useState(0);

  var [max, setMax] = useState(0);
  var [current, setCurrent] = useState(0);
  var [avg, setAvg] = useState(0);
  // var [min, setMin] = useState(0);
  var sum = 0;
  var count = 0;

  useEffect(() => {
    window.ipcRenderer.on("datastream", (event, arg) => {
      count++;

      current = Math.floor(arg / 1024 * 100);
      setCurrent(current);
    
      sum += current;

      if (current > max) {
        max = current;
        setMax(max);
      }
      // else if (current < min) {
      //   min = current;
      //   setMin(min);
      // }

      avg = Math.floor(sum / count);
      setAvg(avg);


      // values.current = Math.floor(arg / 1024 * 100);
      // values.count++;
      // values.sum += values.current;

      // if (values.min === -1) values.min = values.current;

      // //Decide if there should be new min or max
      // if (values.current > values.max) {
      //     values.max = values.current;
      // } else if(values.current < values.min) {
      //     values.min = values.current;
      // }
      // //Calc Avg
      // values.avg = (Math.floor(values.sum / values.count));
      // console.log(values.current, values.avg, values.max)
    });
}, []);

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardContent>
        <Grid container direction="column" spacing={4}>
          <Grid item xs>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
              variant="h6"
              align="center"
            >
              MAXIMUM
            </Typography>
            <Typography variant="h1" align="center">
            {max}{"%"}
            </Typography>
          </Grid>
          <Grid item xs>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
              variant="h6"
              align="center"
            >
              CURRENT
            </Typography>
            <Typography variant="h1" align="center">
            {current}{"%"}
            </Typography>
          </Grid>
          <Grid item xs>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
              variant="h6"
              align="center"
            >
              AVERAGE
            </Typography>
            <Typography variant="h1" align="center">
            {avg}{"%"}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

Stats.propTypes = {
  className: PropTypes.string
};

export default Stats;
