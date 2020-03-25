import React, {useState, useEffect} from "react";
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

  var newVal = 0;

  const [Max, setMax] = useState(0);
  const [Min, setMin] = useState(0);
  const [Avg, setAvg] = useState(0);
  const [count, setCount] = useState(0);
  const [sum, setSum] = useState(0);

  useEffect(() => {
    window.ipcRenderer.on("datastream", (event, arg) => {
      newVal = Math.floor(arg / 1024 * 100)
      setCount(count + 1)
      setSum(sum + newVal)
  
      //Decide if there should be new min or max
      if(newVal > Max){
          setMax(newVal)
      }
      else if(newVal < Min){
          setMin(newVal)
      }
      //Calc Avg
      setAvg(Math.floor(sum / count))    
  
    });
  }, [])

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
            {Max}{"%"}
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
              MINIMUM
            </Typography>
            <Typography variant="h1" align="center">
            {Min}{"%"}
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
            {Avg}{"%"}
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
