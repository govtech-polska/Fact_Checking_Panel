import { combineReducers } from 'redux';

import { apiReducer } from 'base/api/redux';
import { GET_USER, CHANGE_PASSWORD, EMAIL_SUBSCRIPTION } from './actions';

export const user = combineReducers({
  details: apiReducer(GET_USER),
  passwordChange: apiReducer(CHANGE_PASSWORD),
  emailSubscription: apiReducer(EMAIL_SUBSCRIPTION)
});
