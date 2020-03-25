import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Grid, Paper, Tabs, Tab } from "@material-ui/core";

import { LineChart, Serial, Stats, Popup, P5 } from "./components";


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
      <Popup />
      

      <Grid container spacing={4}>
        <Grid item xs={8}>
          <LineChart />
        </Grid>
        <Grid item xs={4}>
          <P5 />
        </Grid>
      </Grid>
    </Paper>
  );
  
};


// window.ipcRenderer.on("datastream", (event, arg) => {
//   console.log(arg);
// });


export default Dashboard