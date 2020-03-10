import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Grid, Paper, Tabs, Tab } from "@material-ui/core";

import { LineChart, Serial, Stats } from "./components";


const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}));


const Dashboard = () => {
  const classes = useStyles();

  return (
    <Paper elevation={0} className={classes.root}>

      <Serial />

      <Grid container spacing={4}>
        <Grid item xs={2}>
          <Stats />
        </Grid>
        <Grid item xs={10}>
          <LineChart />
        </Grid>
      </Grid>
    </Paper>
  );
  
};


export default Dashboard