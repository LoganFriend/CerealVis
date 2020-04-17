import React, { useEffect, useRef, useState } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

const SnackBar = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState("");
  const [severity, setSeverity] = useState("info");

  const SnackBarContainer = useRef(null);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const message = (event, severity, message) => {
    setMsg(message);
    setSeverity(severity);
    setOpen(true);
  };

  useEffect(() => {
    window.ipcRenderer.on("log", message);

    return () => {
      window.ipcRenderer.removeListener("log", message);
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
