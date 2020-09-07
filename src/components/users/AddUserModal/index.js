import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, Typography } from '@material-ui/core';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';

import AddUserForm from '../AddUserForm';

import styles from './AddUserModal.module.scss';

const AddUserModal = ({ title, isOpen, onClose, onSubmit, data, error, isFetching, domains }) => {
  const { t } = useTranslation();
  const [showForm, setShowForm] = useState(true);

  const handleSubmit = values => {
    if (showForm) {
      setShowForm(false);
    }
    onSubmit(values);
  };

  const handleClose = () => {
    setShowForm(true);
    onClose();
  };

  const success = data && !showForm;

  return (
    <Dialog open={isOpen} onClose={handleClose} fullWidth={true} maxWidth="xs">
      <DialogTitle>{title}</DialogTitle>
      {success ? (
        <>
          <DialogContent>
            <Typography className={styles.success}>
              <CheckCircleOutlineIcon />
              <span>{t('users.added')}</span>
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button color="primary" onClick={() => setShowForm(true)} autoFocus>
              {t('users.addNextBtn')}
            </Button>
          </DialogActions>
        </>
      ) : (
        <AddUserForm
          domains={domains}
          onSubmit={handleSubmit}
          onClose={handleClose}
          isFetching={isFetching}
          error={error}
        />
      )}
    </Dialog>
  );
};

AddUserModal.propTypes = {
  title: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  data: PropTypes.object,
  error: PropTypes.string,
  isFetching: PropTypes.bool,
  domains: PropTypes.array
};

export default AddUserModal;
