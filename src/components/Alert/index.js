import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import { Alert as MuiAlert } from '@material-ui/lab';
import { Collapse, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

import styles from './Alert.module.scss';

const CloseBtn = ({ onClick }) => (
  <IconButton aria-label="close" color="inherit" size="small" onClick={onClick}>
    <CloseIcon fontSize="inherit" />
  </IconButton>
);

CloseBtn.propTypes = {
  onClick: PropTypes.func
};

const Alert = ({ showOn, type, className, children, withClose, withMargin, hideAfter, ...alertProps }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(!!showOn);
  }, [showOn]);

  useEffect(() => {
    if (!showOn || !hideAfter) return;

    const delay = setTimeout(() => {
      setIsOpen(false);
    }, hideAfter);

    return () => {
      clearTimeout(delay);
    };
  }, [showOn, hideAfter]);

  return (
    <Collapse in={isOpen}>
      <MuiAlert
        className={cx(withMargin && styles.margin, className)}
        severity={type}
        action={withClose && <CloseBtn onClick={() => setIsOpen(false)} />}
        {...alertProps}
      >
        {children}
      </MuiAlert>
    </Collapse>
  );
};

Alert.defaultProps = {
  type: 'error'
};

Alert.propTypes = {
  showOn: PropTypes.any,
  className: PropTypes.string,
  children: PropTypes.node,
  type: PropTypes.oneOf(['error', 'warning', 'info', 'success']),
  withClose: PropTypes.bool,
  withMargin: PropTypes.bool,
  hideAfter: PropTypes.number
};

export default Alert;
