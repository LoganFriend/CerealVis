//Core Imports + Routing Support
import React, { Component } from "react";
import { Switch, Redirect, MemoryRouter } from "react-router-dom";
import Routes from "./Routes";

//Theme Imports
import { ThemeProvider } from "@material-ui/styles";
import theme from "./theme";
import "react-perfect-scrollbar/dist/css/styles.css";
import "./assets/scss/index.scss";

import { Minimal as MinimalLayout } from "./layouts";

import {
  Dashboard as DashboardView,
  UserList as UserListView,
  Settings as SettingsView,
  Help as HelpView,
} from "./views";

export default class App extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <MemoryRouter>
          <Switch>
            <Redirect exact from="/" to="/dashboard" />
            <Routes
              component={DashboardView}
              exact
              layout={MinimalLayout}
              path="/dashboard"
            />
            <Routes
              component={UserListView}
              exact
              layout={MinimalLayout}
              path="/users"
            />
            <Routes
              component={SettingsView}
              exact
              layout={MinimalLayout}
              path="/settings"
            />
            <Routes
              component={HelpView}
              exact
              layout={MinimalLayout}
              path="/help"
            />
          </Switch>
        </MemoryRouter>
      </ThemeProvider>
    );
  }
}
