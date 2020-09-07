import { combineReducers } from 'redux';
import { apiReducer } from 'base/api/redux';

import { FILTERS_ACTION_TYPES, FILTERS } from './actions';

const getReducers = () =>
  Object.values(FILTERS).reduce(
    (acc, v) => ({
      ...acc,
      [v]: apiReducer(FILTERS_ACTION_TYPES[v])
    }),
    {}
  );

export const filters = combineReducers(getReducers());
