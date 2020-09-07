import { put, call } from 'redux-saga/effects';
import { apiAction } from 'base/api/redux';
import { apiUrls } from 'urls';
import { resolveUrl } from 'utils/url';
import { CLEAR } from 'base/redux/consts';
import { submissionsActions } from 'storages/submissions/actions';
import { rolesTypes } from 'consts';

export const CHECKERS_LIST = 'admin.CHECKERS_LIST';
export const EXPERTS_LIST = 'admin.EXPERTS_LIST';
export const MODERATORS_LIST = 'admin.MODERATORS_LIST';
export const SPECIALISTS_LIST = 'admin.SPECIALISTS_LIST';
export const USER_ADD = 'admin.USER_ADD';
export const USER_UPDATE = 'admin.USER_UPDATE';
export const INVITATIONS_LIST = 'admin.INVITATIONS_LIST';

export const PUBLISH = 'admin.PUBLISH';
export const ASSIGN_EXPERT = 'admin.ASSIGN_EXPERT';
export const DISMISS_ASSIGNMENT = 'admin.DISMISS_ASSIGNMENT';

export const EDIT_NEWS = 'admin.EDIT_NEWS';
export const EDIT_IMAGE = 'admin.EDIT_IMAGE';
export const EDIT_EXPERT_OPINION = 'admin.EDIT_EXPERT_OPINION';
export const EDIT_CHECKER_OPINION = 'admin.EDIT_CHECKER_OPINION';

export const SENSITIVE_LIST = 'admin.SENSITIVE_LIST';
export const SENSITIVE_ADD = 'admin.SENSITIVE_ADD';
export const SENSITIVE_REMOVE = 'admin.SENSITIVE_REMOVE';

export const DOMAINS_LIST = 'admin.DOMAINS_LIST';
export const DOMAINS_ADD = 'admin.DOMAINS_ADD';
export const DOMAINS_REMOVE = 'admin.DOMAINS_REMOVE';

export const HASHTAGS_LIST = 'admin.HASHTAGS_LIST';
export const HASHTAGS_ADD = 'admin.HASHTAGS_ADD';
export const HASHTAGS_REMOVE = 'admin.HASHTAGS_REMOVE';

const refreshDetails = id =>
  function*() {
    yield put(submissionsActions.details(rolesTypes.ADMIN)(id, false));
  };

export const adminActions = {
  users: {
    checkers: query => apiAction(CHECKERS_LIST, resolveUrl(apiUrls.ADMIN.USERS.CHECKERS, {}, query)),
    experts: query => apiAction(EXPERTS_LIST, resolveUrl(apiUrls.ADMIN.USERS.EXPERTS, {}, query)),
    moderators: query => apiAction(MODERATORS_LIST, resolveUrl(apiUrls.ADMIN.USERS.MODERATORS, {}, query)),
    specialists: query => apiAction(SPECIALISTS_LIST, resolveUrl(apiUrls.ADMIN.USERS.SPECIALISTS, {}, query)),
    add: payload => apiAction(USER_ADD, apiUrls.ADMIN.USERS.ADD, { method: 'POST', payload, clearOnRequest: true }),
    clearAdd: () => ({ type: USER_ADD + CLEAR }),
    update: (id, payload, afterSagaSuccess) =>
      apiAction(USER_UPDATE, resolveUrl(apiUrls.ADMIN.USERS.UPDATE, { id }), {
        method: 'PATCH',
        payload,
        afterSagaSuccess
      }),
    clearUpdate: () => ({ type: USER_UPDATE + CLEAR })
  },
  invitations: query => apiAction(INVITATIONS_LIST, resolveUrl(apiUrls.ADMIN.INVITATIONS, {}, query)),
  publish: (id, isPublished) =>
    apiAction(PUBLISH, resolveUrl(apiUrls.SUBMISSIONS[rolesTypes.ADMIN].DETAILS, { id }), {
      method: 'PATCH',
      payload: { is_published: isPublished },
      clearOnRequest: true,
      afterSagaSuccess: refreshDetails(id)
    }),
  assign: (id, userId) =>
    apiAction(ASSIGN_EXPERT, resolveUrl(apiUrls.ADMIN.ASSIGNMENT.ASSIGN, { id }), {
      method: 'PATCH',
      payload: { assignee: userId, replace_assignee: true }
    }),
  dismissAssignment: id =>
    apiAction(DISMISS_ASSIGNMENT, resolveUrl(apiUrls.ADMIN.ASSIGNMENT.DISMISS, { id }), {
      method: 'DELETE'
    }),
  clearAssign: () => ({ type: ASSIGN_EXPERT + CLEAR }),
  edit: {
    news: (id, payload) =>
      apiAction(EDIT_NEWS, resolveUrl(apiUrls.ADMIN.EDIT.NEWS, { id }), {
        method: 'PATCH',
        payload,
        clearOnRequest: true,
        afterSagaSuccess: refreshDetails(id)
      }),
    image: (id, payload, afterSagaSuccess) =>
      apiAction(EDIT_IMAGE, resolveUrl(apiUrls.ADMIN.EDIT.IMAGE, { id }), {
        method: 'PATCH',
        payload,
        afterSagaSuccess: function*() {
          yield call(refreshDetails(id));
          yield call(afterSagaSuccess);
        },
        clearOnRequest: true
      }),
    expertOpinion: (id, opinionId, payload, afterSagaSuccess = refreshDetails(id)) =>
      apiAction(EDIT_EXPERT_OPINION, resolveUrl(apiUrls.ADMIN.EDIT.EXPERT_OPINION, { opinionId }), {
        method: 'PUT',
        payload,
        clearOnRequest: true,
        afterSagaSuccess
      }),
    checkerOpinion: (id, opinionId, payload) =>
      apiAction(EDIT_CHECKER_OPINION, resolveUrl(apiUrls.ADMIN.EDIT.CHECKER_OPINION, { opinionId }), {
        method: 'PUT',
        payload,
        clearOnRequest: true,
        afterSagaSuccess: refreshDetails(id)
      }),
    clearNews: () => ({ type: EDIT_NEWS + CLEAR })
  },
  sensitive: {
    list: () => apiAction(SENSITIVE_LIST, resolveUrl(apiUrls.ADMIN.SENSITIVE.LIST, {}, { page_size: 200 })),
    add: (payload, resetForm) =>
      apiAction(SENSITIVE_ADD, apiUrls.ADMIN.SENSITIVE.LIST, {
        method: 'POST',
        payload,
        afterSagaSuccess: resetForm,
        clearOnRequest: true
      }),
    remove: id =>
      apiAction(SENSITIVE_REMOVE, resolveUrl(apiUrls.ADMIN.SENSITIVE.DETAILS, { id }), {
        method: 'DELETE',
        extendResponse: { id },
        clearOnRequest: true
      })
  },
  domains: {
    list: () => apiAction(DOMAINS_LIST, resolveUrl(apiUrls.ADMIN.DOMAINS.LIST, {}, { page_size: 200 })),
    add: (payload, resetForm) =>
      apiAction(DOMAINS_ADD, apiUrls.ADMIN.DOMAINS.LIST, {
        method: 'POST',
        payload,
        afterSagaSuccess: resetForm,
        clearOnRequest: true
      }),
    remove: id =>
      apiAction(DOMAINS_REMOVE, resolveUrl(apiUrls.ADMIN.DOMAINS.DETAILS, { id }), {
        method: 'DELETE',
        extendResponse: { id },
        clearOnRequest: true
      })
  },
  hashtags: {
    list: search => apiAction(HASHTAGS_LIST, resolveUrl(apiUrls.ADMIN.HASHTAGS.LIST, {}, { page_size: 200, search })),
    add: (payload, resetForm) =>
      apiAction(HASHTAGS_ADD, apiUrls.ADMIN.HASHTAGS.LIST, {
        method: 'POST',
        payload,
        afterSagaSuccess: resetForm,
        clearOnRequest: true
      }),
    remove: id =>
      apiAction(HASHTAGS_REMOVE, resolveUrl(apiUrls.ADMIN.HASHTAGS.DETAILS, { id }), {
        method: 'DELETE',
        extendResponse: { id },
        clearOnRequest: true
      })
  }
};
