import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { FormControlLabel, Switch, Typography, Paper } from '@material-ui/core';

import { userActions } from 'storages/user/actions';
import Alert from 'components/Alert';

import styles from './Settings.module.scss';

const Notifications = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { allowed, updated } = useSelector(({ user }) => ({
    allowed: user.details.data?.allow_subscriptions,
    updated: user.emailSubscription
  }));

  const handleChange = (_, checked) => {
    dispatch(userActions.changeEmailSubscription(checked));
  };

  return (
    <Paper className={styles.passwordWrapper}>
      <Typography variant="h6" component="h2">
        {t('settings.notifications.title')}
      </Typography>
      <Typography variant="body2" paragraph>
        {t('settings.notifications.info')}
      </Typography>

      <Alert showOn={updated.error} withMargin withClose>
        {updated.error}
      </Alert>

      <Alert showOn={updated.data} type="success" hideAfter={1000} withMargin>
        {t('common.saved')}
      </Alert>

      <FormControlLabel
        control={<Switch defaultChecked={allowed} onChange={handleChange} name="notifications" />}
        label={t('settings.notifications.inputLabel')}
      />
    </Paper>
  );
};

export default Notifications;
