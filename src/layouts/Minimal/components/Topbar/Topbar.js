import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { AppBar, Toolbar } from '@material-ui/core';
import SettingsIcon from '@material-ui/icons/Settings';

const useStyles = makeStyles(() => ({
  root: {
    boxShadow: 'none'
  },
  flexGrow: {
    flexGrow: 1
  }
}));

const Topbar = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  return (
    <AppBar
      {...rest}
      className={clsx(classes.root, className)}
      color="primary"
      position="fixed"
    >
      <Toolbar>
        <RouterLink to="/">
          <img
            alt="Logo"
            src="/images/logos/logo.svg"
          />
        </RouterLink>

        <div className={classes.flexGrow} />
        
        <RouterLink to="/settings">
          <SettingsIcon />
        </RouterLink>

      </Toolbar>
    </AppBar>
  );
};

Topbar.propTypes = {
  className: PropTypes.string
};

export default Topbar;
