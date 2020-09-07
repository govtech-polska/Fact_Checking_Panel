import { put } from 'redux-saga/effects';
import { apiUrls } from 'urls';
import { apiAction } from 'base/api/redux';
import { CLEAR } from 'base/redux/consts';
import { resolveUrl } from 'utils/url';
import { rolesTypes } from 'consts';

export const SUBMISSIONS_LIST = 'submissions.SUBMISSIONS_LIST';
export const SUBMISSIONS_UPDATE_TAGS = 'submissions.SUBMISSIONS_UPDATE_TAGS';
export const SUBMISSIONS_HISTORY = 'submissions.SUBMISSIONS_HISTORY';
export const SUBMISSIONS_HISTORY_DETAILS = 'submissions.SUBMISSIONS_HISTORY_DETAILS';
export const SUBMISSIONS_DETAILS = 'submissions.SUBMISSIONS_DETAILS';
export const SUBMISSIONS_UPDATE = 'submissions.SUBMISSIONS_UPDATE';
export const SUBMISSIONS_REMOVE = 'submissions.SUBMISSIONS_REMOVE';
export const SUBMISSIONS_ATTACH = 'submissions.SUBMISSIONS_ATTACH';
export const VERIFY_SUBMISSION = 'submissions.VERIFY_SUBMISSION';

export const HASHTAGS_SEARCH = 'submissions.HASHTAGS_SEARCH';
export const DISMISS_ASSIGNMENT = 'submissions.DISMISS_ASSIGNMENT';

export const submissionsActions = {
  list: role => query => apiAction(SUBMISSIONS_LIST, resolveUrl(apiUrls.SUBMISSIONS[role].LIST, {}, query)),
  details: role => (id, clearOnRequest = true) =>
    apiAction(SUBMISSIONS_DETAILS, resolveUrl(apiUrls.SUBMISSIONS[role].DETAILS, { id }), {
      clearOnRequest: clearOnRequest,
      afterSagaSuccess: function*() {
        yield put({ type: VERIFY_SUBMISSION + CLEAR });
      }
    }),
  update: role => (id, values) =>
    apiAction(SUBMISSIONS_UPDATE, resolveUrl(apiUrls.SUBMISSIONS[role].DETAILS, { id }), {
      method: 'PATCH',
      payload: values,
      clearOnRequest: true,
      afterSagaSuccess: function*() {
        yield put(submissionsActions.details(role)(id));
      }
    }),
  verify: role => (id, payload, options = {}) =>
    apiAction(VERIFY_SUBMISSION, resolveUrl(apiUrls.SUBMISSIONS[role].VERIFY, { id }), {
      ...options,
      payload,
      method: 'POST',
      extendResponse: { id }
    }),
  history: {
    list: query => apiAction(SUBMISSIONS_HISTORY, resolveUrl(apiUrls.SUBMISSIONS.HISTORY.LIST, {}, query)),
    details: id =>
      apiAction(SUBMISSIONS_DETAILS, resolveUrl(apiUrls.SUBMISSIONS.HISTORY.DETAILS, { id }), {
        clearOnRequest: true
      })
  },
  remove: (id, payload = true) =>
    apiAction(SUBMISSIONS_REMOVE, resolveUrl(apiUrls.SUBMISSIONS[rolesTypes.ADMIN].DETAILS, { id }), {
      method: 'PATCH',
      payload: {
        deleted: payload
      },
      afterSagaSuccess: function*() {
        yield put(submissionsActions.details(rolesTypes.ADMIN)(id));
      }
    }),
  attach: (id, payload = true) =>
    apiAction(SUBMISSIONS_ATTACH, resolveUrl(apiUrls.SUBMISSIONS[rolesTypes.ADMIN].DETAILS, { id }), {
      method: 'PATCH',
      payload: {
        is_pinned: payload
      },
      afterSagaSuccess: function*() {
        yield put(submissionsActions.details(rolesTypes.ADMIN)(id));
      }
    }),
  hashtags: {
    search: name => apiAction(HASHTAGS_SEARCH, resolveUrl(apiUrls.SUBMISSIONS.HASHTAGS.LIST, {}, { search: name })),
    update: role => (id, payload, options = {}) =>
      apiAction(SUBMISSIONS_UPDATE_TAGS, resolveUrl(apiUrls.SUBMISSIONS[role].TAGS, { id }), {
        ...options,
        payload,
        method: 'PATCH',
        extendResponse: { id }
      }),
    clearUpdate: () => ({ type: SUBMISSIONS_UPDATE_TAGS + CLEAR })
  },
  dissmisAssignment: role => id =>
    apiAction(DISMISS_ASSIGNMENT, resolveUrl(apiUrls.SUBMISSIONS.ASSIGNMENT.DISMISS, { id }), {
      method: 'PATCH',
      clearOnRequest: true,
      afterSagaSuccess: function*() {
        yield put(submissionsActions.details(role)(id));
      }
    })
};
