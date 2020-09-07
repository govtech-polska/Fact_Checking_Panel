import React from 'react';
import PropTypes from 'prop-types';
import { Route as ReactRoute, Redirect } from 'react-router-dom';
import { getToken } from 'utils/token';
import { appUrls } from 'urls';

const Route = ({ children, layout: Layout, authorized, ...rest }) => {
  if (authorized && !getToken()) {
    return <Redirect to={appUrls.LOGIN} />;
  }

  return <ReactRoute {...rest}>{Layout ? <Layout>{children}</Layout> : children}</ReactRoute>;
};

Route.propTypes = {
  children: PropTypes.node,
  authorized: PropTypes.bool,
  layout: PropTypes.elementType
};

export default Route;
