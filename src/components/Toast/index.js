import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { Alert } from '@material-ui/lab';
import { Snackbar } from '@material-ui/core';

const Toast = ({ showOn, type, children, hideAfter, ...alertProps }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(!!showOn);
  }, [showOn]);

  return (
    <Snackbar
      open={isOpen}
      autoHideDuration={hideAfter}
      onClose={() => setIsOpen(false)}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
    >
      <Alert severity={type} elevation={6} variant="filled" {...alertProps}>
        {children}
      </Alert>
    </Snackbar>
  );
};

Toast.defaultProps = {
  type: 'success',
  hideAfter: 1650
};

Toast.propTypes = {
  showOn: PropTypes.any,
  className: PropTypes.string,
  children: PropTypes.node,
  type: PropTypes.oneOf(['error', 'warning', 'info', 'success']),
  hideAfter: PropTypes.number
};

export default Toast;
