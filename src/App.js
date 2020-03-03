//Core Imports + Routing Support
import React, { Component } from 'react';
import { createBrowserHistory } from 'history';
import { Switch, Redirect, HashRouter } from 'react-router-dom';
import Routes from './Routes';

//Theme Imports
import { ThemeProvider } from '@material-ui/styles';
import theme from './theme';
import 'react-perfect-scrollbar/dist/css/styles.css';
import './assets/scss/index.scss';

import { Main as MainLayout, Minimal as MinimalLayout } from './layouts';

import {
  Dashboard as DashboardView,
  UserList as UserListView,
  Icons as IconsView,
  Settings as SettingsView,
} from './views';

const browserHistory = createBrowserHistory();

export default class App extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <HashRouter history={browserHistory}>
          <Switch>
            <Redirect
              exact
              from="/"
              to="/dashboard"
            />
            <Routes
              component={DashboardView}
              exact
              layout={MainLayout}
              path="/dashboard"
            />
            <Routes
              component={UserListView}
              exact
              layout={MainLayout}
              path="/users"
            />
            <Routes
              component={IconsView}
              exact
              layout={MainLayout}
              path="/icons"
            />
            <Routes
              component={SettingsView}
              exact
              layout={MainLayout}
              path="/settings"
            />
          </Switch>
        </HashRouter>
      </ThemeProvider>
    );
  }
}
