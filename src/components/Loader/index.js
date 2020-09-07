import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { CircularProgress } from '@material-ui/core';

import styles from './Loader.module.scss';

const Loader = ({ className, innerClassName, size, ...props }) => {
  const classes = cx(styles.container, className);

  return (
    <div className={classes}>
      <CircularProgress className={innerClassName} size={size || 50} {...props} />
    </div>
  );
};

Loader.propTypes = {
  className: PropTypes.string,
  innerClassName: PropTypes.string,
  size: PropTypes.number
};

export default Loader;
