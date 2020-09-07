import PropTypes from 'prop-types';
import React from 'react';
import { Typography } from '@material-ui/core';

import styles from './Title.module.scss';

const Title = ({ children, variant, ...props }) => (
  <Typography className={styles.title} variant={variant} color="textPrimary" noWrap {...props}>
    {children}
  </Typography>
);

Title.defaultProps = {
  variant: 'h1'
};

Title.propTypes = {
  children: PropTypes.node,
  variant: PropTypes.oneOf([
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'subtitle1',
    'subtitle2',
    'body1',
    'body2',
    'caption',
    'button',
    'overline',
    'srOnly',
    'inherit'
  ])
};

export default Title;
