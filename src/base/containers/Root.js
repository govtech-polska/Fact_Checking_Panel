import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { CssBaseline } from '@material-ui/core';

import Routes from 'Routes/index';
import ScrollToTop from './ScrollToTop';

import 'styles/index.scss';

const Root = ({ store, history }) => (
  <Provider store={store}>
    <Router history={history}>
      <ScrollToTop>
        <CssBaseline />
        <Routes />
      </ScrollToTop>
    </Router>
  </Provider>
);

Root.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export default Root;
