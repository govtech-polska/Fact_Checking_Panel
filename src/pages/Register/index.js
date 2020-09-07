import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink, useParams } from 'react-router-dom';
import { Trans, useTranslation } from 'react-i18next';
import { Typography, Paper, Link } from '@material-ui/core';

import { appUrls } from 'urls';
import { authActions } from 'storages/auth/actions';
import Suspense from 'components/Suspense';
import Alert from 'components/Alert';
import RegisterForm from './RegisterForm';

import styles from './Register.module.scss';

const Register = () => {
  const { t } = useTranslation();
  const { token } = useParams();
  const dispatch = useDispatch();
  const { emailValidation, register } = useSelector(({ auth }) => ({
    emailValidation: auth.email,
    register: auth.register
  }));

  useEffect(() => {
    dispatch(authActions.email(token));
  }, [token, dispatch]);

  const handleRegister = values => {
    dispatch(authActions.signUp(token, values));
  };

  return (
    <div className={styles.wrapper}>
      <Paper className={styles.paper}>
        <Typography className={styles.title} variant="h4" component="h1" color="primary">
          {t('register.title')}
        </Typography>
        <Typography className={styles.subtitle} variant="body2">
          {t('register.subtitle')}
        </Typography>

        <Alert showOn={register.error}>{register.error}</Alert>

        <Suspense waitFor={emailValidation}>
          {register.data ? (
            <Alert type="success" showOn={register.data} className={styles.successAlert}>
              <Trans i18nKey="register.success">
                Rejestracja przebiegła pomyślnie!{' '}
                <Link component={RouterLink} to={appUrls.LOGIN}>
                  Przejdź do logowania
                </Link>
                .
              </Trans>
            </Alert>
          ) : (
            <RegisterForm
              email={emailValidation.data?.email}
              onSubmit={handleRegister}
              isSubmitting={register.isFetching}
            />
          )}
        </Suspense>

        <Link component={RouterLink} to={appUrls.LOGIN} className={styles.link}>
          {t('register.alreadyHaveAccount')}
        </Link>
      </Paper>
    </div>
  );
};

export default Register;
