import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { DropzoneArea } from 'material-ui-dropzone';

import { Dialog, DialogActions, Button, DialogContent } from '@material-ui/core';
import Alert from 'components/Alert';

import styles from './Uploader.module.scss';

const Uploader = ({ isOpen, onClose, onSave, error, isSubmitting, filesLimit, acceptedFiles }) => {
  const { t } = useTranslation();
  const [files, setFiles] = useState([]);

  const handleChange = nextFiles => {
    setFiles(nextFiles);
  };

  const handleSave = () => {
    onSave(files);
  };

  const disableSendButton = files.length === 0 || isSubmitting;

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="sm" fullWidth={true}>
      <DialogContent className={styles.content}>
        <Alert showOn={error} withMargin>
          {error}
        </Alert>
        <DropzoneArea
          onChange={handleChange}
          filesLimit={filesLimit}
          acceptedFiles={acceptedFiles}
          dropzoneText={t('adminDetails.dropzoneInfo')}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          {t('common.cancel')}
        </Button>
        <Button onClick={handleSave} color="primary" disabled={disableSendButton}>
          {t('common.send')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

Uploader.defaultProps = {
  filesLimit: 1,
  acceptedFiles: ['image/jpeg', 'image/png', 'image/bmp']
};

Uploader.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  onSave: PropTypes.func,
  error: PropTypes.string,
  isSubmitting: PropTypes.bool,
  filesLimit: PropTypes.number,
  acceptedFiles: PropTypes.array
};

export default Uploader;
