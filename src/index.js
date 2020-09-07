import 'base/i18n';
import 'base/yup';

import React from 'react';
import ReactDOM from 'react-dom';
import * as Sentry from '@sentry/browser';
import { ThemeProvider, createMuiTheme, StylesProvider } from '@material-ui/core';

import history from 'base/history';
import configureStore from 'base/redux/configureStore';
import Root from 'base/containers/Root';
import ErrorBoundary from 'base/ErrorBoundary';

if (process.env.REACT_APP_SENTRY_ENV) {
  Sentry.init({
    dsn: 'https://7a776593c14745c1810177ac42fef9f2@o409704.ingest.sentry.io/5282775',
    environment: process.env.REACT_APP_SENTRY_ENV
  });
}

const store = configureStore();

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#0075e2',
      dark: '#0052a5'
    },
    secondary: {
      main: '#FF4081'
    },
    error: {
      main: '#d5233f',
      dark: '#a7162d'
    },
    success: {
      main: '#4caf50'
    }
  }
});

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <StylesProvider injectFirst>
      <ErrorBoundary>
        <Root store={store} history={history} />
      </ErrorBoundary>
    </StylesProvider>
  </ThemeProvider>,
  document.getElementById('root')
);
