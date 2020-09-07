import { call, put, takeEvery, delay } from 'redux-saga/effects';

import { request } from 'base/api';
import { REQUEST, SUCCESS, FAILURE } from 'base/redux/consts';
import { LOGOUT } from 'storages/auth/actions';

// TODO: match errors to form fields in the future
export const getError = error => {
  if (error.response?.data) {
    const { detail, ...fields } = error.response.data;

    const errors = Object.values(fields)
      .map(field => field && field[0])
      .join('\n');

    return detail || errors;
  }

  return error.message || 'Wystąpił błąd';
};

/**
 * Method creates saga for an API request.
 * @param {string} type - The type of the action.
 */
export const apiSaga = type => {
  function* callApi(action) {
    try {
      let data;
      if (action.mockResponse) {
        yield delay(Math.random() * 2000);
        if (action.mockResponse.error) {
          throw new Error(action.mockResponse.error);
        }
        data = action.mockResponse;
      } else {
        const { data: requestData } = yield call(request, action.method, action.endpoint, action.payload);
        data = requestData;
      }
      if (action.extendResponse) {
        data = {
          ...data,
          ...action.extendResponse
        };
      }
      if (!data) {
        data = {
          success: true
        };
      }
      yield put({
        type: type + SUCCESS,
        data
      });
      if (action.afterSagaSuccess) {
        yield call(action.afterSagaSuccess, data);
      }
    } catch (error) {
      if (error.response?.status === 401) {
        yield put({ type: LOGOUT });
      }
      yield put({
        type: type + FAILURE,
        error: getError(error)
      });
    }
  }

  return function*() {
    yield takeEvery(type + REQUEST, callApi);
  };
};
