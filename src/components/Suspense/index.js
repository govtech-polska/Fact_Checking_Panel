import React from 'react';
import PropTypes from 'prop-types';

import Alert from 'components/Alert';
import Loader from 'components/Loader';

import styles from './Suspense.module.scss';

const Suspense = ({ waitFor, children, fallback, polling }) => {
  const showLoader = polling ? waitFor.isFetching && !waitFor.data : waitFor.isFetching;
  const success = !waitFor.error && waitFor.data;
  const isError = !waitFor.isFetching && waitFor.error;

  if (showLoader) {
    return fallback || <Loader />;
  }

  if (isError) {
    return (
      <Alert showOn={true} variant="filled" className={styles.error}>
        {waitFor.error || 'Wystąpił błąd'}
      </Alert>
    );
  }

  if (success) {
    return children;
  }

  return null;
};

Suspense.propTypes = {
  waitFor: PropTypes.shape({
    isFetching: PropTypes.bool,
    data: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    error: PropTypes.oneOfType([PropTypes.object, PropTypes.string])
  }).isRequired,
  children: PropTypes.node,
  fallback: PropTypes.node,
  polling: PropTypes.bool
};

export default Suspense;
