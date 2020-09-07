import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import Title from 'components/Title';

import PasswordReset from './PasswordReset';
import Sensitive from './Sensitive';
import Domains from './Domains';
import Hashtags from './Hashtags';
import Notifications from './Notifications';

import { rolesTypes } from 'consts';

const Settings = ({ role }) => {
  const { t } = useTranslation();
  const isAdmin = [rolesTypes.ADMIN, rolesTypes.MODERATOR].includes(role);

  return (
    <>
      <Title>{t('settings.title')}</Title>
      {isAdmin && <Sensitive />}
      {isAdmin && <Domains />}
      {isAdmin && <Hashtags />}
      {!isAdmin && <Notifications />}
      <PasswordReset />
    </>
  );
};

Settings.propTypes = {
  role: PropTypes.oneOf(Object.values(rolesTypes))
};

export default Settings;
