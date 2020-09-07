import { all, take, call } from 'redux-saga/effects';

import { apiSaga } from 'base/api/redux';
import {
  AUTH_LOGIN,
  AUTH_REGISTER,
  AUTH_EMAIL,
  LOGOUT,
  PASSWORD_RESET_REQUEST,
  PASSWORD_RESET,
  PASSWORD_RESET_VALIDATE_TOKEN
} from './actions';
import { clearToken } from 'utils/token';
import history from 'base/history';
import { appUrls } from 'urls';
import { SUCCESS, FAILURE } from 'base/redux/consts';

function* logoutFlow() {
  while (true) {
    yield take([LOGOUT + SUCCESS, LOGOUT + FAILURE]);
    yield call(clearToken);
    yield call(history.push, appUrls.LOGIN);
  }
}

export function* authSaga() {
  yield all([
    apiSaga(AUTH_LOGIN)(),
    apiSaga(LOGOUT)(),
    apiSaga(AUTH_REGISTER)(),
    apiSaga(AUTH_EMAIL)(),
    apiSaga(PASSWORD_RESET)(),
    apiSaga(PASSWORD_RESET_VALIDATE_TOKEN)(),
    apiSaga(PASSWORD_RESET_REQUEST)(),
    logoutFlow()
  ]);
}
