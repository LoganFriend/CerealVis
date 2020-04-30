import React, { useEffect, useRef, useState } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";

/*
The SnackBar Hook allows for important information to be displayed to user threw pop up messages.

Alert => deals the the snack bar message
useStyles => deals with the styling of the message
handleClose => closes the message and makes sure the message cannot be closed by a random click on the screen
message => the implementation of the "log" listener, sets the message and the severity of the message
useEffect => automatically called when react renders this prop, creates the "log" listener
useEffect : return => automatically called when react no longer renders this prop, destroys the "log" listener
 */

// this function deals with displaying messages
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

// useStyles deals with the styling of the snack bar message
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

// this hook allows for messages to be displayed in the front end for the user to see
const SnackBar = () => {
  // initial states are set
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState("");
  const [severity, setSeverity] = useState("info");

  const SnackBarContainer = useRef(null);

  // handleClose deals determines when to close the message
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      // ensures that the message wont close when the screen is clicked
      return;
    }
    setOpen(false);
  };

  // message sets the message and the severity of the message along with displaying the message
  // message is the callback function for the "log" listener
  const message = (event, severity, message) => {
    setMsg(message);
    setSeverity(severity);
    setOpen(true);
  };

  // useEffect automatically called when this hook is rendered by react
  useEffect(() => {
    window.ipcRenderer.on("log", message); // sets up a listener

    // return inside of useEffect is automatically called when this hook is no longer being rendered by react
    return () => {
      window.ipcRenderer.removeListener("log", message); // destroys the listener
    };
  }, [SnackBarContainer]);

  return (
    <div className={classes.root} ref={SnackBarContainer} id="notif">
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity}>
          {msg}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default SnackBar;
