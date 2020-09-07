import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import MenuIcon from '@material-ui/icons/Menu';
import { AppBar, Toolbar, IconButton, Typography } from '@material-ui/core';

const Topbar = ({ onMenuClick }) => {
  const { t } = useTranslation();

  return (
    <AppBar position="sticky">
      <Toolbar>
        <IconButton color="inherit" aria-label="open menu" edge="start" onClick={onMenuClick}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="p" noWrap>
          {t('layout.topbarTitle')}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

Topbar.propTypes = {
  onMenuClick: PropTypes.func
};

export default Topbar;
