import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Grid, Container } from "@material-ui/core";

import {
  Maximum,
  TotalUsers,
  Average,
  TotalProfit,
  LineChart,
  Serial
} from "./components";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}));

const Dashboard = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={4}>
        <Grid item lg={3} sm={6} xl={3} xs={12}>
          <Maximum />
        </Grid>
        <Grid item lg={3} sm={6} xl={3} xs={12}>
          <TotalUsers />
        </Grid>
        <Grid item lg={3} sm={6} xl={3} xs={12}>
          <Average />
        </Grid>
        <Grid item lg={3} sm={6} xl={3} xs={12}>
          <TotalProfit />
        </Grid>
        <Grid item lg={11} md={12} xl={9} xs={12}>
          <Serial />
          <Container maxWidth="lg">
            <LineChart />
          </Container>
        </Grid>
        <Grid item lg={4} md={6} xl={3} xs={12}></Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
