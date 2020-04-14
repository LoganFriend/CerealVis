import React, { useState } from "react";
import { makeStyles } from "@material-ui/styles";
import PropTypes from "prop-types";
import clsx from "clsx";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Grid,
  Divider,
  FormControlLabel,
  Checkbox,
  Typography,
  Button,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
    margin: 25,
  },
}));

const Help = () => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <form>
        <CardHeader subheader="User Manual" title="Help" />
        <Divider />
        <CardContent>
          <Grid container spacing={6} wrap="wrap">
            <Grid className={classes.item} item md={4} sm={6} xs={12}></Grid>
          </Grid>
        </CardContent>
      </form>
    </Card>
  );
};

export default Help;
