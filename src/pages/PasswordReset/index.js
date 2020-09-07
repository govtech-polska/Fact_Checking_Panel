import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link as RouterLink, useParams } from 'react-router-dom';
import { useTranslation, Trans } from 'react-i18next';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import { Typography, Link, Button, Paper } from '@material-ui/core';

import { authActions } from 'storages/auth/actions';
import Alert from 'components/Alert';
import Suspense from 'components/Suspense';
import FormTextField from 'components/Forms/FormTextField';
import { yupCreatePassword } from 'utils/validation';
import { appUrls } from 'urls';

import styles from './PasswordReset.module.scss';

const fields = {
  password: 'password',
  repeatPassword: 'password2'
};

const initialValues = {
  [fields.password]: '',
  [fields.repeatPassword]: ''
};

const validationSchema = yup.object().shape({
  [fields.password]: yupCreatePassword,
  [fields.repeatPassword]: yup
    .string()
    .required()
    .oneOf([yup.ref(fields.password)], 'Hasła muszą być takie same.')
});

const PasswordReset = () => {
  const { t } = useTranslation();
  const { id, token } = useParams();
  const dispatch = useDispatch();
  const { validation, reset } = useSelector(({ auth: { passwordReset } }) => ({
    validation: passwordReset.validation,
    reset: passwordReset.reset
  }));

  useEffect(() => {
    dispatch(authActions.passwordResetValidateToken(id, token));
  }, [dispatch, id, token]);

  const handleSubmit = (values, { resetForm }) => {
    dispatch(authActions.passwordReset(id, token, values, resetForm));
  };

  return (
    <>
      <div className={styles.wrapper}>
        <Paper className={styles.paper}>
          <Typography className={styles.title} variant="h4" component="h1" color="primary">
            {t('passwordReset.title')}
          </Typography>
          <Typography className={styles.subtitle} variant="body2">
            {t('passwordReset.subtitle')}{' '}
          </Typography>

          <Alert showOn={reset.error} className={styles.alert}>
            {reset.error}
          </Alert>
          <Alert showOn={reset.data} type="success" className={styles.alert}>
            <Trans i18nKey="passwordReset.success">
              Your password has been changed. Go to{' '}
              <Link component={RouterLink} to={appUrls.LOGIN}>
                login
              </Link>
              .
            </Trans>
          </Alert>

          <Suspense waitFor={validation}>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
              <Form className={styles.form}>
                <FormTextField
                  className={styles.field}
                  name={fields.password}
                  type="password"
                  label={t('fields.password')}
                />
                <FormTextField
                  className={styles.field}
                  name={fields.repeatPassword}
                  type="password"
                  label={t('fields.repeatPassword')}
                />
                <Button
                  className={styles.button}
                  type="submit"
                  variant="contained"
                  color="secondary"
                  disabled={reset.isFetching}
                >
                  {t('passwordReset.btn')}
                </Button>
              </Form>
            </Formik>
          </Suspense>

          <Link component={RouterLink} to={appUrls.LOGIN} className={styles.link}>
            {t('passwordReset.backToLogin')}
          </Link>
        </Paper>
      </div>
    </>
  );
};

export default PasswordReset;
