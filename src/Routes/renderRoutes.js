import React from 'react';

import Route from 'base/containers/Route';
import Layout from 'base/containers/Layout';

import Experts from 'pages/admin/Experts';
import Specialists from 'pages/admin/Specialists';
import Checkers from 'pages/admin/Checkers';
import Moderators from 'pages/admin/Moderators';
import Invitations from 'pages/admin/Invitations';
import AdminDetails from 'pages/admin/AdminDetails';
import Submissions from 'pages/Submissions';
import History from 'pages/History';
import SubmissionDetails from 'pages/SubmissionDetails';
import HistoryDetails from 'pages/HistoryDetails';
import Settings from 'pages/Settings';

import { appUrls } from 'urls';
import { rolesTypes } from 'consts';

const adminComponents = [
  { path: appUrls.DASHBOARD, component: Checkers, exact: true },
  { path: appUrls.ADMIN.SPECIALISTS, component: Specialists, exact: true },
  { path: appUrls.ADMIN.EXPERTS, component: Experts, exact: true },
  { path: appUrls.ADMIN.MODERATORS, component: Moderators, exact: true },
  { path: appUrls.ADMIN.INVITATIONS, component: Invitations, exact: true },
  { path: appUrls.SUBMISSIONS.LIST, component: Submissions, exact: true },
  { path: appUrls.SUBMISSIONS.DETAILS, component: AdminDetails, exact: true },
  { path: appUrls.SETTINGS, component: Settings, exact: true }
];

const moderatorComponents = [
  { path: appUrls.DASHBOARD, component: Submissions, exact: true },
  { path: appUrls.SUBMISSIONS.LIST, component: Submissions, exact: true },
  { path: appUrls.SUBMISSIONS.DETAILS, component: AdminDetails, exact: true },
  { path: appUrls.SETTINGS, component: Settings, exact: true }
];

const expertComponents = [
  { path: appUrls.DASHBOARD, component: Submissions, exact: true },
  { path: appUrls.SUBMISSIONS.DETAILS, component: SubmissionDetails, exact: true },
  { path: appUrls.HISTORY.LIST, component: History, exact: true },
  { path: appUrls.HISTORY.DETAILS, component: HistoryDetails, exact: true },
  { path: appUrls.SETTINGS, component: Settings, exact: true }
];

const checkerComponents = [
  { path: appUrls.DASHBOARD, component: Submissions, exact: true },
  { path: appUrls.SUBMISSIONS.DETAILS, component: SubmissionDetails, exact: true },
  { path: appUrls.HISTORY.LIST, component: History, exact: true },
  { path: appUrls.HISTORY.DETAILS, component: HistoryDetails, exact: true },
  { path: appUrls.SETTINGS, component: Settings, exact: true }
];

const allComponents = new Map([
  [rolesTypes.ADMIN, adminComponents],
  [rolesTypes.MODERATOR, moderatorComponents],
  [rolesTypes.EXPERT, expertComponents],
  [rolesTypes.SPECIALIST, expertComponents],
  [rolesTypes.CHECKER, checkerComponents]
]);

export const renderRoutes = userRole =>
  (allComponents.get(userRole || '') || []).map(({ component: Component, ...props }) => (
    <Route key={props.path} layout={Layout} authorized {...props}>
      <Component role={userRole} />
    </Route>
  ));
