import React from "react";
import { Link as RouterLink } from "react-router-dom";
import clsx from "clsx";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import { AppBar, Toolbar, colors } from "@material-ui/core";
import SettingsIcon from "@material-ui/icons/Settings";
import GroupIcon from "@material-ui/icons/Group";
import HomeIcon from "@material-ui/icons/Home";

const useStyles = makeStyles(theme => ({
  root: {
    
  },
  flexGrow: {
    flexGrow: 1
  },
  Button: {
    color: colors.grey[50],
    textTransform: "none",
    fontWeight: theme.typography.fontWeightLight,
    fontSize: 20,
    margin: 10
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
      <Toolbar variant="dense">
        <RouterLink to="/">
          <img alt="Logo" src="/images/logos/logo.svg" />
        </RouterLink>
        <div className={classes.flexGrow} />
        <RouterLink to="/">
          <HomeIcon className={classes.Button}></HomeIcon>
        </RouterLink>
        <RouterLink to="/users">
          <GroupIcon className={classes.Button}></GroupIcon>
        </RouterLink>
        <RouterLink to="/settings">
          <SettingsIcon className={classes.Button}></SettingsIcon>
        </RouterLink>
      </Toolbar>
    </AppBar>
  );
};

Topbar.propTypes = {
  className: PropTypes.string
};

export default Topbar;
