import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from '@material-ui/core';

import styles from './Lightbox.module.scss';

const Lightbox = ({ isOpen, onClose, url, alt }) => {
  return (
    <Modal open={isOpen} onClose={onClose} className={styles.container}>
      <img alt={alt} src={url} className={styles.image} />
    </Modal>
  );
};

Lightbox.defaultProps = {
  alt: ''
};

Lightbox.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func,
  url: PropTypes.string,
  alt: PropTypes.string
};

export default Lightbox;
