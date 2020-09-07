import { apiAction } from 'base/api/redux';
import { apiUrls } from 'urls';
import { CLEAR } from 'base/redux/consts';

export const GET_USER = 'user.GET_USER';
export const CHANGE_PASSWORD = 'user.CHANGE_PASSWORD';
export const EMAIL_SUBSCRIPTION = 'user.EMAIL_SUBSCRIPTION';

export const userActions = {
  getUser: () => apiAction(GET_USER, apiUrls.USER.DETAILS),
  changePassword: (payload, afterSagaSuccess) =>
    apiAction(CHANGE_PASSWORD, apiUrls.USER.CHANGE_PASSWORD, {
      method: 'POST',
      payload,
      afterSagaSuccess,
      clearOnRequest: true
    }),
  resetChangePassword: () => ({ type: CHANGE_PASSWORD + CLEAR }),
  changeEmailSubscription: isAllowed =>
    apiAction(EMAIL_SUBSCRIPTION, apiUrls.USER.EMAIL_SUBSCRIPTION, {
      method: 'PATCH',
      payload: { allow_subscriptions: isAllowed },
      clearOnRequest: true
    })
};
