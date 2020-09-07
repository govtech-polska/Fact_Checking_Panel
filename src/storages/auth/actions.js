import { call, put } from 'redux-saga/effects';
import { apiUrls, appUrls } from 'urls';
import { apiAction } from 'base/api/redux';
import { resolveUrl } from 'utils/url';
import { setToken } from 'utils/token';
import history from 'base/history';
import { userActions } from 'storages/user/actions';

export const AUTH_REGISTER = 'AUTH_REGISTER';
export const AUTH_LOGIN = 'AUTH_LOGIN';
export const AUTH_EMAIL = 'AUTH_EMAIL';
export const PASSWORD_RESET = 'PASSWORD_RESET';
export const PASSWORD_RESET_VALIDATE_TOKEN = 'PASSWORD_RESET_VALIDATE_TOKEN';
export const PASSWORD_RESET_REQUEST = 'PASSWORD_RESET_REQUEST';
export const LOGOUT = 'LOGOUT';

export const authActions = {
  email: token => apiAction(AUTH_EMAIL, resolveUrl(apiUrls.AUTH.SIGN_UP, { token })),
  signUp: (token, payload) =>
    apiAction(AUTH_REGISTER, resolveUrl(apiUrls.AUTH.SIGN_UP, { token }), { method: 'POST', payload }),
  login: (payload, remember, redirectUrl) =>
    apiAction(AUTH_LOGIN, apiUrls.AUTH.LOGIN, {
      method: 'POST',
      payload,
      clearOnRequest: true,
      afterSagaSuccess: function*(data) {
        yield call(setToken, data.token, remember);
        yield put(userActions.getUser());
        yield call(history.replace, redirectUrl || appUrls.DASHBOARD);
      }
    }),
  logout: () => apiAction(LOGOUT, apiUrls.AUTH.LOGOUT, { method: 'POST' }),
  passwordResetRequest: (payload, afterSuccessCallback) =>
    apiAction(PASSWORD_RESET_REQUEST, apiUrls.AUTH.PASSWORD_RESET_REQUEST, {
      method: 'POST',
      payload,
      afterSagaSuccess: afterSuccessCallback
    }),
  passwordResetValidateToken: (id, token) =>
    apiAction(PASSWORD_RESET_VALIDATE_TOKEN, resolveUrl(apiUrls.AUTH.PASSWORD_RESET, { id, token })),
  passwordReset: (id, token, payload, afterSuccessCallback) =>
    apiAction(PASSWORD_RESET, resolveUrl(apiUrls.AUTH.PASSWORD_RESET, { id, token }), {
      method: 'POST',
      payload,
      afterSagaSuccess: afterSuccessCallback
    })
};
