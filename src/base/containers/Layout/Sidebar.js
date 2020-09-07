import React from 'react';
import PropTypes from 'prop-types';
import { useRouteMatch, Link } from 'react-router-dom';
import { Drawer, Typography, List, ListItem, ListItemIcon, ListItemText, TextField, MenuItem } from '@material-ui/core';
import QueryString from 'qs';

import Logo from 'components/Logo';
import UserInfo from './UserInfo.js';

import styles from './Layout.module.scss';
import { useTranslation } from 'react-i18next';

const isSelected = (path, url) => {
  const regex = new RegExp('/([^/]*)', 'g');
  return path.match(regex)[0] === url;
};

const getPath = (url, query) => {
  if (query) {
    const qs = QueryString.stringify(query);
    return `${url}?${qs}`;
  }
  return url;
};

const LANGUAGES = [
  { i18nkey: 'languages.en', value: 'en' },
  { i18nkey: 'languages.pl', value: 'pl' }
];

const Sidebar = ({ menuItems, isOpen, onClose, variant }) => {
  const { t, i18n } = useTranslation();
  const { path } = useRouteMatch();

  const actualLang = i18n.language?.split('-')[0] ?? '';

  const handleLanguageChange = event => {
    i18n.changeLanguage(event.target.value);
  };

  return (
    <Drawer
      variant={variant}
      open={isOpen}
      onClose={onClose}
      classes={{
        root: styles.Drawer,
        paper: styles.Drawer
      }}
    >
      <div className={styles.LogoWrapper}>
        <Logo className={styles.Logo} />
        <Typography variant="body2">Panel administracyjny</Typography>
      </div>
      <List className={styles.List}>
        {menuItems.map(({ i18nkey, url, icon, disabled, query }) => (
          <ListItem
            button
            key={i18nkey}
            component={Link}
            to={getPath(url, query)}
            disabled={disabled}
            selected={isSelected(path, url)}
          >
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText primary={t(i18nkey)} />
          </ListItem>
        ))}
      </List>
      <TextField
        className={styles.LangSelect}
        select
        id="language"
        label={t('fields.language')}
        value={actualLang}
        onChange={handleLanguageChange}
      >
        {LANGUAGES.map(option => (
          <MenuItem key={option.value} value={option.value}>
            {t(option.i18nkey)}
          </MenuItem>
        ))}
      </TextField>
      <UserInfo />
    </Drawer>
  );
};

Sidebar.propTypes = {
  onClose: PropTypes.func,
  isOpen: PropTypes.bool,
  menuItems: PropTypes.arrayOf(
    PropTypes.shape({
      i18nkey: PropTypes.string,
      url: PropTypes.string,
      icon: PropTypes.element,
      disabled: PropTypes.bool
    })
  ),
  variant: PropTypes.string
};

export default Sidebar;
