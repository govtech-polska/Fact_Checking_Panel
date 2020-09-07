import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import { Typography, Link, Button, Paper } from '@material-ui/core';

import { authActions } from 'storages/auth/actions';
import Alert from 'components/Alert';
import FormCheckbox from 'components/Forms/FormCheckbox';
import FormTextField from 'components/Forms/FormTextField';
import { outerUrls, appUrls } from 'urls';

import styles from './Login.module.scss';

const fields = {
  email: 'email',
  password: 'password',
  rememberMe: 'rememberMe'
};

const initialValues = {
  [fields.email]: '',
  [fields.password]: '',
  [fields.rememberMe]: false
};

const validationSchema = yup.object().shape({
  [fields.email]: yup
    .string()
    .required()
    .email(),
  [fields.password]: yup.string().required()
});

const LoginForm = () => {
  const { t } = useTranslation();
  const { state: { redirect } = {} } = useLocation();
  const dispatch = useDispatch();
  const { isFetching, error } = useSelector(({ auth, user }) => ({
    isFetching: auth.login.isFetching,
    error: auth.login.error || user.details.error
  }));

  const handleSubmit = ({ rememberMe, ...values }) => {
    dispatch(authActions.login(values, rememberMe, redirect));
  };

  return (
    <>
      <div className={styles.wrapper}>
        <Paper className={styles.paper}>
          <Typography className={styles.title} variant="h4" component="h1" color="primary">
            {t('login.title')}
          </Typography>
          <Typography className={styles.subtitle} variant="body2">
            {t('login.subtitle')}
          </Typography>
          <Alert showOn={error} className={styles.alert}>
            {error}
          </Alert>
          <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
            <Form className={styles.form}>
              <FormTextField className={styles.field} name={fields.email} type="email" label={t('fields.email')} />
              <FormTextField
                className={styles.field}
                name={fields.password}
                type="password"
                label={t('fields.password')}
              />
              <FormCheckbox
                className={styles.field}
                name={fields.rememberMe}
                label={t('login.rememberMe')}
                labelClassName={styles.checkbox}
              />
              <Button
                className={styles.button}
                type="submit"
                variant="contained"
                color="secondary"
                disabled={isFetching}
              >
                {t('login.btn')}
              </Button>
              <Link component={RouterLink} to={appUrls.PASSWORD_RESET_REQUEST}>
                {t('login.forgotPassword')}
              </Link>
            </Form>
          </Formik>
          <Link href={outerUrls.CHECKER_FORM} className={styles.link} target="_blank" rel="noopener noreferrer">
            {t('login.cta')}
          </Link>
        </Paper>
      </div>
    </>
  );
};

export default LoginForm;
