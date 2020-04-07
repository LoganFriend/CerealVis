import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import { LineChart, Serial, Stats, Popup, P5, SnackBar } from "./components";
import {
  Grid,
  Paper,
  Tabs,
  Tab,
  AppBar,
  Typography,
  Box,
} from "@material-ui/core";

import "./components/SnackBar/style.css";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4),
  },
  nav: {},
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const Dashboard = () => {
  const classes = useStyles();

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Paper elevation={0} className={classes.root}>
      <Serial />
      <div className={classes.root}>
        <AppBar position="static" className={classes.nav}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="simple tabs example"
          >
            <Tab label="Line Chart" {...a11yProps(0)} />
            <Tab label="P5" {...a11yProps(1)} />
          </Tabs>
        </AppBar>

        <TabPanel value={value} index={0}>
          <Grid container spacing={4}>
            <Grid item xs={2}>
              <Stats />
            </Grid>

            <Grid item xs={10}>
              <LineChart />
            </Grid>
          </Grid>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Grid container spacing={4}>
            <Grid item xs={2}>
              <Stats />
            </Grid>

            <Grid item xs={10}>
              <P5 />
            </Grid>
          </Grid>
        </TabPanel>
      </div>
    </Paper>
  );
};

export default Dashboard;
