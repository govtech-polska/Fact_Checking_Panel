import React, { useState } from 'react';
import PropTypes from 'prop-types';
import CommunityIcon from '@material-ui/icons/PeopleOutline';
import SpecialistIcon from '@material-ui/icons/PeopleOutlineOutlined';
import ModeratorsIcon from '@material-ui/icons/SupervisedUserCircleOutlined';
import ExpertIcon from '@material-ui/icons/People';
import SettingsIcon from '@material-ui/icons/SettingsOutlined';
import ListIcon from '@material-ui/icons/ListAltOutlined';
import EmailIcon from '@material-ui/icons/EmailOutlined';
import HistoryIcon from '@material-ui/icons/History';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import { Hidden } from '@material-ui/core';

import { appUrls } from 'urls';
import Topbar from './Topbar.js';
import Sidebar from './Sidebar.js';

import styles from './Layout.module.scss';
import { rolesTypes } from 'consts.js';
import { useSelector } from 'react-redux';

// TODO: can be somehow merged with routes in the future
const commonCheckersMenuItems = [
  {
    i18nkey: 'menuItems.history',
    url: appUrls.HISTORY.LIST,
    query: {
      is_published: true
    },
    icon: <HistoryIcon />
  },
  {
    i18nkey: 'menuItems.settings',
    url: appUrls.SETTINGS,
    icon: <SettingsIcon />
  },
  {
    i18nkey: 'menuItems.guide',
    url: appUrls.GUIDE,
    icon: <MenuBookIcon />
  }
];

const menuItems = {
  [rolesTypes.CHECKER]: [
    {
      i18nkey: 'menuItems.submissions',
      url: appUrls.DASHBOARD,
      icon: <ListIcon />,
      query: {
        is_opined: false
      }
    },
    ...commonCheckersMenuItems
  ],
  [rolesTypes.SPECIALIST]: [
    {
      i18nkey: 'menuItems.submissions',
      url: appUrls.DASHBOARD,
      icon: <ListIcon />
    },
    ...commonCheckersMenuItems
  ],
  [rolesTypes.EXPERT]: [
    {
      i18nkey: 'menuItems.submissions',
      url: appUrls.DASHBOARD,
      icon: <ListIcon />
    },
    ...commonCheckersMenuItems
  ],
  [rolesTypes.MODERATOR]: [
    {
      i18nkey: 'menuItems.submissions',
      url: appUrls.DASHBOARD,
      icon: <ListIcon />
    },
    {
      i18nkey: 'menuItems.settings',
      url: appUrls.SETTINGS,
      icon: <SettingsIcon />
    },
    {
      i18nkey: 'menuItems.guide',
      url: appUrls.GUIDE,
      icon: <MenuBookIcon />
    }
  ],
  [rolesTypes.ADMIN]: [
    {
      i18nkey: 'menuItems.community',
      url: appUrls.DASHBOARD,
      icon: <CommunityIcon />
    },
    {
      i18nkey: 'menuItems.specialists',
      url: appUrls.ADMIN.SPECIALISTS,
      icon: <SpecialistIcon />
    },
    {
      i18nkey: 'menuItems.experts',
      url: appUrls.ADMIN.EXPERTS,
      icon: <ExpertIcon />
    },
    {
      i18nkey: 'menuItems.moderators',
      url: appUrls.ADMIN.MODERATORS,
      icon: <ModeratorsIcon />
    },
    {
      i18nkey: 'menuItems.invitations',
      url: appUrls.ADMIN.INVITATIONS,
      icon: <EmailIcon />,
      query: {
        is_expired: false
      }
    },
    {
      i18nkey: 'menuItems.submissions',
      url: appUrls.SUBMISSIONS.LIST,
      icon: <ListIcon />
    },
    {
      i18nkey: 'menuItems.settings',
      url: appUrls.SETTINGS,
      icon: <SettingsIcon />
    },
    {
      i18nkey: 'menuItems.guide',
      url: appUrls.GUIDE,
      icon: <MenuBookIcon />
    }
  ]
};

const Layout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const role = useSelector(({ auth }) => auth.info.role);

  return (
    <>
      <Hidden mdUp implementation="css">
        <Topbar onMenuClick={() => setIsOpen(true)} />
        <Sidebar menuItems={menuItems[role]} isOpen={isOpen} onClose={() => setIsOpen(false)} />
      </Hidden>
      <div className={styles.Layout}>
        <Hidden smDown implementation="css">
          <Sidebar menuItems={menuItems[role]} variant="permanent" />
        </Hidden>
        <main className={styles.Main}>{children}</main>
      </div>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node
};

export default Layout;
