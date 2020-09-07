import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Button, DialogContent, DialogActions, Typography } from '@material-ui/core';
import { Formik, Form } from 'formik';
import * as yup from 'yup';

import FormTextField from 'components/Forms/FormTextField';

import styles from './AddUserForm.module.scss';
import FormDropdown from 'components/Forms/FormDropdown';

const fields = {
  email: 'email',
  domain: 'domain'
};

const initialValues = {
  [fields.email]: '',
  [fields.domain]: ''
};

const validationSchema = yup.object().shape({
  [fields.email]: yup
    .string()
    .required()
    .email(),
  [fields.domain]: yup.string()
});

const AddUserForm = ({ domains, onClose, onSubmit, isFetching, error }) => {
  const { t } = useTranslation();
  const hasDomains = domains?.length !== undefined ? true : false;

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
      <Form>
        <DialogContent>
          <FormTextField className={styles.field} name={fields.email} type="email" label={t('fields.email')} />

          {hasDomains &&
            (domains.length === 0 ? (
              <Typography>{t('users.specialistInfo')}</Typography>
            ) : (
              <FormDropdown
                className={styles.field}
                name={fields.domain}
                label={t('fields.specialization')}
                options={domains}
              />
            ))}

          {error && (
            <Typography align="center" color="error" variant="body2">
              {error}
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            {t('common.cancel')}
          </Button>
          <Button color="primary" type="submit" variant="contained" disabled={isFetching}>
            {t('users.addBtn')}
          </Button>
        </DialogActions>
      </Form>
    </Formik>
  );
};

AddUserForm.propTypes = {
  onSubmit: PropTypes.func,
  onClose: PropTypes.func,
  isFetching: PropTypes.bool,
  error: PropTypes.string,
  domains: PropTypes.array
};

export default AddUserForm;
