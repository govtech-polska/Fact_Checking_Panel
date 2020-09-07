import { combineReducers } from 'redux';

import { apiReducer } from 'base/api/redux';
import {
  AUTH_LOGIN,
  AUTH_REGISTER,
  AUTH_EMAIL,
  LOGOUT,
  PASSWORD_RESET_REQUEST,
  PASSWORD_RESET,
  PASSWORD_RESET_VALIDATE_TOKEN
} from './actions';
import { getToken } from 'utils/token';
import { SUCCESS } from 'base/redux/consts';
import { GET_USER } from 'storages/user/actions';

const infoReducer = (state = { isAuthenticated: !!getToken(), role: null }, action) => {
  switch (action.type) {
    case AUTH_LOGIN + SUCCESS: {
      return {
        ...state,
        isAuthenticated: !!action.data.token
      };
    }
    case GET_USER + SUCCESS: {
      return {
        ...state,
        role: action.data.role
      };
    }
    case LOGOUT: {
      return {
        ...state,
        isAuthenticated: false
      };
    }
    default:
      return state;
  }
};

export const auth = combineReducers({
  info: infoReducer,
  email: apiReducer(AUTH_EMAIL),
  register: apiReducer(AUTH_REGISTER),
  login: apiReducer(AUTH_LOGIN),
  logout: apiReducer(LOGOUT),
  passwordReset: combineReducers({
    request: apiReducer(PASSWORD_RESET_REQUEST),
    validation: apiReducer(PASSWORD_RESET_VALIDATE_TOKEN),
    reset: apiReducer(PASSWORD_RESET)
  })
});
