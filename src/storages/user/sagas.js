import { all, take, put } from 'redux-saga/effects';

import { apiSaga } from 'base/api/redux';
import { GET_USER, CHANGE_PASSWORD, EMAIL_SUBSCRIPTION } from './actions';
import { FAILURE } from 'base/redux/consts';
import { authActions } from 'storages/auth/actions';

function* logoutOnFailure() {
  while (true) {
    yield take(GET_USER + FAILURE);
    yield put(authActions.logout());
  }
}

export function* userSagas() {
  yield all([apiSaga(GET_USER)(), logoutOnFailure(), apiSaga(CHANGE_PASSWORD)(), apiSaga(EMAIL_SUBSCRIPTION)()]);
}
