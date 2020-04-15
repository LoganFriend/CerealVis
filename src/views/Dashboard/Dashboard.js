import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
<<<<<<< HEAD
import { LineChart, Serial, Stats, P5Circle, SnackBar, CheckBox, P5FillUpBar, P5Game } from "./components";
=======
import { LineChart, Serial, Stats, P5Circle, SnackBar, P5FillUpBar } from "./components";
>>>>>>> sprint
import {
  Grid,
  Paper,
  Tabs,
  Tab,
  AppBar,
  Typography,
  Box,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
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
      <Grid container spacing={2}>
        <Grid item>
          <Serial />
        </Grid>
      </Grid>

      <SnackBar />

      <div className={classes.root}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={2}>
            <Stats />
          </Grid>
          <Grid item xs={10} sm={10}>
            <AppBar position="static" className={classes.nav}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="Tabs"
              >
                <Tab label="Line Chart" {...a11yProps(0)} />
                <Tab label="Circle" {...a11yProps(1)} />
                <Tab label="Fill Up Bar" {...a11yProps(2)} />
                <Tab label="Game" {...a11yProps(4)} />
              </Tabs>
            </AppBar>

            <TabPanel value={value} index={0}>   
              <Grid item xs={12}>
                <LineChart />
              </Grid>
            </TabPanel>
            <TabPanel value={value} index={1}>
              <Grid item xs={12}>
                <P5Circle />
              </Grid>
            </TabPanel>
            <TabPanel value={value} index={2}>
              <Grid item xs={12}>
                <P5FillUpBar />
              </Grid>
            </TabPanel>
            <TabPanel value={value} index={3}>
              <Grid item xs={12}>
                <P5Game />
              </Grid>
            </TabPanel>
          </Grid>
        </Grid>
      </div>
    </Paper>
  );
};

export default Dashboard;
