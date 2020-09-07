import React from 'react';
import { Switch, Redirect, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Route from 'base/containers/Route';
import Layout from 'base/containers/Layout';
import Register from 'pages/Register';
import Login from 'pages/Login';
import PasswordResetRequest from 'pages/PasswordResetRequest';
import PasswordReset from 'pages/PasswordReset';
import NotFound from 'pages/NotFound';
import Guide from 'pages/Guide';
import Loader from 'components/Loader';

import { renderRoutes } from './renderRoutes';
import { appUrls } from 'urls';

const Routes = () => {
  const location = useLocation();
  const { isAuthenticated, role } = useSelector(({ auth }) => ({
    isAuthenticated: auth.info.isAuthenticated,
    role: auth.info.role
  }));

  if (isAuthenticated && !role) {
    return <Loader />;
  }

  return (
    <Switch>
      {renderRoutes(role)}
      <Route exact={true} path={appUrls.LOGIN}>
        <Login />
      </Route>
      <Route exact={true} path={appUrls.REGISTER}>
        <Register />
      </Route>
      <Route exact={true} path={appUrls.PASSWORD_RESET}>
        <PasswordReset />
      </Route>
      <Route exact={true} path={appUrls.PASSWORD_RESET_REQUEST}>
        <PasswordResetRequest />
      </Route>
      <Route exact={true} path={appUrls.NOT_FOUND}>
        <NotFound />
      </Route>
      <Route exact={true} path={appUrls.GUIDE} layout={Layout} authorized>
        <Guide />
      </Route>

      {/* TODO: hotifx, we needd to rethink authorization */}
      {!isAuthenticated && (
        <Redirect to={{ pathname: appUrls.LOGIN, state: { redirect: location.pathname } }} exact={true} />
      )}
      <Redirect from="*" to={appUrls.NOT_FOUND} />
    </Switch>
  );
};

export default Routes;
