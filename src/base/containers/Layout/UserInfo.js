import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import LogoutIcon from '@material-ui/icons/ExitToApp';
import { Avatar, Typography, Button } from '@material-ui/core';

import { authActions } from 'storages/auth/actions';
import styles from './Layout.module.scss';

const getInitials = (name = '') =>
  name
    .trim()
    .split(' ')
    .map(w => w[0])
    .join('')
    .toUpperCase();

const UserInfo = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { name, role } = useSelector(({ user }) => ({
    name: user.details.data.name,
    role: t(`rolesNames.${user.details.data.role}`)
  }));

  const handleLogout = () => {
    dispatch(authActions.logout());
  };

  return (
    <div className={styles.UserInfo}>
      <div className={styles.UserInfoWrapper}>
        <Avatar className={styles.Avatar}>{getInitials(name)}</Avatar>
        <span>
          <Typography className={styles.UserName}>{name}</Typography>
          <Typography color="textSecondary" variant="body2">
            {role}
          </Typography>
        </span>
      </div>
      <Button size="small" startIcon={<LogoutIcon />} onClick={handleLogout}>
        {t('layout.logout')}
      </Button>
    </div>
  );
};

export default UserInfo;
