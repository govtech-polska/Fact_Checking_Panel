import { all, put, take } from 'redux-saga/effects';
import * as Sentry from '@sentry/browser';

import { submissionsSagas } from 'storages/submissions/sagas';
import { authSaga } from 'storages/auth/sagas';
import { userSagas } from 'storages/user/sagas';
import { userActions, GET_USER } from 'storages/user/actions';
import { adminSagas } from 'storages/admin/sagas';
import { filtersSagas } from 'storages/filters/sagas';

import { getToken } from 'utils/token';
import { SUCCESS } from './consts';

function* initialSaga() {
  if (getToken()) {
    yield put(userActions.getUser());
  }
}

function* sentrySaga() {
  if (process.env.REACT_APP_SENTRY_ENV) {
    while (true) {
      const action = yield take(GET_USER + SUCCESS);
      Sentry.configureScope(function(scope) {
        scope.setUser({ email: action.data.email });
      });
    }
  }
}

export default function* rootSaga() {
  yield all([
    submissionsSagas(),
    authSaga(),
    userSagas(),
    adminSagas(),
    filtersSagas(),
    sentrySaga(),
    // It has to be the last one
    initialSaga()
  ]);
}
