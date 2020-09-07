import { all } from 'redux-saga/effects';

import { apiSaga } from 'base/api/redux';
import {
  SUBMISSIONS_LIST,
  SUBMISSIONS_HISTORY,
  SUBMISSIONS_DETAILS,
  VERIFY_SUBMISSION,
  SUBMISSIONS_HISTORY_DETAILS,
  SUBMISSIONS_REMOVE,
  SUBMISSIONS_ATTACH,
  SUBMISSIONS_UPDATE_TAGS,
  HASHTAGS_SEARCH,
  DISMISS_ASSIGNMENT,
  SUBMISSIONS_UPDATE
} from './actions';

export function* submissionsSagas() {
  yield all([
    apiSaga(SUBMISSIONS_LIST)(),
    apiSaga(SUBMISSIONS_HISTORY)(),
    apiSaga(SUBMISSIONS_DETAILS)(),
    apiSaga(SUBMISSIONS_UPDATE)(),
    apiSaga(SUBMISSIONS_REMOVE)(),
    apiSaga(SUBMISSIONS_ATTACH)(),
    apiSaga(VERIFY_SUBMISSION)(),
    apiSaga(SUBMISSIONS_HISTORY_DETAILS)(),
    apiSaga(HASHTAGS_SEARCH)(),
    apiSaga(SUBMISSIONS_UPDATE_TAGS)(),
    apiSaga(DISMISS_ASSIGNMENT)()
  ]);
}
