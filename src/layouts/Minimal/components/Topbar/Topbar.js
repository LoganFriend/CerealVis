import React from "react";
import { Link as RouterLink } from "react-router-dom";
import clsx from "clsx";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import { AppBar, Toolbar, Button, colors } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    boxShadow: "none"
  },
  flexGrow: {
    flexGrow: 1
  },
  Button: {
    color: colors.grey[50],
    textTransform: "none",
    fontWeight: theme.typography.fontWeightLight,
    fontSize: 20
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
          <img alt="Logo" src="/images/logos/logo.svg" />
        </RouterLink>
        <div className={classes.flexGrow} />

        <RouterLink to="/">
          <Button className={classes.Button} activeClassName={classes.active}>
            Home
          </Button>
        </RouterLink>

        <RouterLink to="/users">
          <Button className={classes.Button} activeClassName={classes.active}>
            Users
          </Button>
        </RouterLink>

        <RouterLink to="/settings">
          <Button className={classes.Button} activeClassName={classes.active}>
            Settings
          </Button>
        </RouterLink>
      </Toolbar>
    </AppBar>
  );
};

Topbar.propTypes = {
  className: PropTypes.string
};

export default Topbar;
