import { all } from 'redux-saga/effects';

import { apiSaga } from 'base/api/redux';

import { FILTERS_ACTION_TYPES } from './actions';

export function* filtersSagas() {
  yield all(Object.values(FILTERS_ACTION_TYPES).map(type => apiSaga(type)()));
}
