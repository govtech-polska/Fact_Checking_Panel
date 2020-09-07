import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import { Typography, Link, Button, Paper } from '@material-ui/core';

import { authActions } from 'storages/auth/actions';
import Alert from 'components/Alert';
import FormTextField from 'components/Forms/FormTextField';
import { appUrls } from 'urls';

import styles from './PasswordResetRequest.module.scss';

const fields = {
  email: 'email'
};

const initialValues = {
  [fields.email]: ''
};

const validationSchema = yup.object().shape({
  [fields.email]: yup
    .string()
    .required()
    .email()
});

const PasswordResetRequest = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { data, isFetching, error } = useSelector(({ auth: { passwordReset } }) => passwordReset.request);

  const handleSubmit = (values, { resetForm }) => {
    dispatch(authActions.passwordResetRequest(values, resetForm));
  };

  return (
    <>
      <div className={styles.wrapper}>
        <Paper className={styles.paper}>
          <Typography className={styles.title} variant="h4" component="h1" color="primary">
            {t('passwordResetRequest.title')}
          </Typography>
          <Typography className={styles.subtitle} variant="body2">
            {t('passwordResetRequest.subtitle')}
          </Typography>

          <Alert showOn={error} className={styles.alert}>
            {error}
          </Alert>
          <Alert showOn={data} type="success" className={styles.alert}>
            {t('passwordResetRequest.success')}
          </Alert>

          <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
            <Form className={styles.form}>
              <FormTextField className={styles.field} name={fields.email} type="email" label="E-mail" />
              <Button
                className={styles.button}
                type="submit"
                variant="contained"
                color="secondary"
                disabled={isFetching}
              >
                {t('passwordResetRequest.btn')}
              </Button>
            </Form>
          </Formik>
          <Link component={RouterLink} to={appUrls.LOGIN} className={styles.link}>
            {t('passwordResetRequest.backToLogin')}
          </Link>
        </Paper>
      </div>
    </>
  );
};

export default PasswordResetRequest;
