import { all } from 'redux-saga/effects';

import { apiSaga } from 'base/api/redux';
import {
  EXPERTS_LIST,
  CHECKERS_LIST,
  USER_ADD,
  USER_UPDATE,
  INVITATIONS_LIST,
  EDIT_CHECKER_OPINION,
  EDIT_EXPERT_OPINION,
  EDIT_IMAGE,
  EDIT_NEWS,
  DOMAINS_REMOVE,
  DOMAINS_ADD,
  DOMAINS_LIST,
  SENSITIVE_REMOVE,
  SENSITIVE_ADD,
  SENSITIVE_LIST,
  HASHTAGS_REMOVE,
  HASHTAGS_ADD,
  HASHTAGS_LIST,
  SPECIALISTS_LIST,
  ASSIGN_EXPERT,
  DISMISS_ASSIGNMENT,
  MODERATORS_LIST,
  PUBLISH
} from './actions';

export function* adminSagas() {
  yield all([
    apiSaga(CHECKERS_LIST)(),
    apiSaga(EXPERTS_LIST)(),
    apiSaga(SPECIALISTS_LIST)(),
    apiSaga(MODERATORS_LIST)(),
    apiSaga(PUBLISH)(),
    apiSaga(ASSIGN_EXPERT)(),
    apiSaga(DISMISS_ASSIGNMENT)(),
    apiSaga(USER_ADD)(),
    apiSaga(USER_UPDATE)(),
    apiSaga(INVITATIONS_LIST)(),
    apiSaga(EDIT_CHECKER_OPINION)(),
    apiSaga(EDIT_EXPERT_OPINION)(),
    apiSaga(EDIT_IMAGE)(),
    apiSaga(EDIT_NEWS)(),
    apiSaga(SENSITIVE_REMOVE)(),
    apiSaga(SENSITIVE_ADD)(),
    apiSaga(SENSITIVE_LIST)(),
    apiSaga(DOMAINS_REMOVE)(),
    apiSaga(DOMAINS_ADD)(),
    apiSaga(DOMAINS_LIST)(),
    apiSaga(HASHTAGS_REMOVE)(),
    apiSaga(HASHTAGS_ADD)(),
    apiSaga(HASHTAGS_LIST)()
  ]);
}
