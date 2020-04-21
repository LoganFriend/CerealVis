import React, {useEffect} from "react";
import { makeStyles } from "@material-ui/styles";
import {
  Card,
  CardHeader,
  CardContent,
  Grid,
  Divider,
  Typography,
  Paper,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    fontFamily: "sans-serif",
    padding: theme.spacing(3),
  },
  content: {
    paddingBottom: theme.spacing(1),
    fontFamily: "sans-serif",
    fontWeight: theme.typography.fontWeightLight,
  },
}));

const Help = () => {
  const classes = useStyles();

  useEffect(() => {
    var args = {};
    args.cmd = "stop";
    window.ipcRenderer.send("serialport", args);
  }, []);

  return (
    <Paper elevation={0} className={classes.root}>
      <Grid container spacing={3}>
        <Grid item sm={4}>
          <Card className={classes.root}>
            <CardHeader title="About Cereal Vis"></CardHeader>
            <Divider />
            <CardContent>
              <Typography variant="body1" className={classes.content}>
                CerealVis is a portable desktop application made to read in and
                display EMG sensor data from an Arduino Uno. CerealVis can
                connect to a variety of devices and start reading and displaying
                data from it. Features like auto connect and different types of
                visualization is what makes CerealVis a great tool for anyone
                looking to visualize sensor data.
              </Typography>

              <Typography variant="h6" className={classes.content}>
                CerealVis was developed under the MIT license.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item sm={4}>
          <Card className={classes.root}>
            <CardHeader title="How to use" />
            <Divider />
            <CardContent>
              <Typography variant="h6">Step one:</Typography>
              <Typography variant="body1" className={classes.content}>
                Connect your device to any of your USB ports.
              </Typography>

              <Typography variant="h6">Step two:</Typography>
              <Typography variant="body1" className={classes.content}>
                Click the "Search" button in order to connect to your device.
              </Typography>

              <Typography variant="h6">Step three:</Typography>
              <Typography variant="body1" className={classes.content}>
                Click the "Start" button in order to read and display data.
              </Typography>

              <Typography variant="h6">Step four:</Typography>
              <Typography variant="body1" className={classes.content}>
                Switch between tabs to see different visualizations.
              </Typography>

              <Typography variant="h6">Step five:</Typography>
              <Typography variant="body1" className={classes.content}>
                Click the "Stop" button to stop displaying data.
              </Typography>

              <Typography variant="h6">Step six:</Typography>
              <Typography variant="body1" className={classes.content}>
                Click the "Disconnect" button to disconnect from the device.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item sm={4}>
          <Card className={classes.root}>
            <CardHeader title="Troubleshooting"></CardHeader>
            <Divider />
            <CardContent>
              <Typography variant="h5">I press start but no data is showing?</Typography>
              <br/>
              <Typography variant="body1" className={classes.content}>
                Assuming that the sensor has been set up and configured 
                to work with CerealVis, try disconnecting and reconnecting 
                the device to see if the problem persists.
              </Typography>
              <br/>
              <Typography variant="h5">My device is not showing up?</Typography>
              <br/>
              <Typography variant="body1" className={classes.content}>
                In most cases, your device should connect automatically upon pressing the "Search Device" button. If not, a list will appear of all of the devices connected through serial ports. If you do not see your device in the list, try disconnecting the device, reconnect it to your computer, and press the "Search Device" button again. 
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Help;
