import React, { useEffect, useState } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { SnackbarContent } from '@material-ui/core';

export default () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const handleClick = (event, msg) => {
    setMessage(msg);
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  useEffect(() => {
    window.ipcRenderer.on("msg", handleClick);

    return () => {
      window.ipcRenderer.removeListener("datastream", handleClick);
    }
  }, []);

  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <SnackbarContent
          style={{
            backgroundColor: "#03a9f4"
          }}
          message={message}
          action={
          <React.Fragment>
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
          }
        />
      </Snackbar> 
    </div>
  );
}