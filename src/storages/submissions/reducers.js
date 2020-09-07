import { combineReducers } from 'redux';
import { apiReducer } from 'base/api/redux';

import {
  SUBMISSIONS_LIST,
  SUBMISSIONS_HISTORY,
  SUBMISSIONS_DETAILS,
  VERIFY_SUBMISSION,
  SUBMISSIONS_REMOVE,
  SUBMISSIONS_ATTACH,
  HASHTAGS_SEARCH,
  SUBMISSIONS_UPDATE_TAGS,
  DISMISS_ASSIGNMENT,
  SUBMISSIONS_UPDATE
} from './actions';

export const submissions = combineReducers({
  list: apiReducer(SUBMISSIONS_LIST),
  history: apiReducer(SUBMISSIONS_HISTORY),
  details: apiReducer(SUBMISSIONS_DETAILS),
  update: apiReducer(SUBMISSIONS_UPDATE),
  remove: apiReducer(SUBMISSIONS_REMOVE),
  attach: apiReducer(SUBMISSIONS_ATTACH),
  verify: apiReducer(VERIFY_SUBMISSION),
  assignment: combineReducers({
    dismiss: apiReducer(DISMISS_ASSIGNMENT)
  }),
  hashtags: combineReducers({
    search: apiReducer(HASHTAGS_SEARCH),
    update: apiReducer(SUBMISSIONS_UPDATE_TAGS)
  })
});
