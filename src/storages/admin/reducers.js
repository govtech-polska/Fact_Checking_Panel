import { combineReducers } from 'redux';
import { apiReducer } from 'base/api/redux';
import { SUCCESS } from 'base/redux/consts';

import {
  EXPERTS_LIST,
  CHECKERS_LIST,
  USER_ADD,
  USER_UPDATE,
  INVITATIONS_LIST,
  EDIT_IMAGE,
  EDIT_EXPERT_OPINION,
  EDIT_CHECKER_OPINION,
  EDIT_NEWS,
  DOMAINS_LIST,
  DOMAINS_ADD,
  DOMAINS_REMOVE,
  SPECIALISTS_LIST,
  HASHTAGS_LIST,
  HASHTAGS_ADD,
  HASHTAGS_REMOVE,
  SENSITIVE_LIST,
  SENSITIVE_ADD,
  SENSITIVE_REMOVE,
  ASSIGN_EXPERT,
  DISMISS_ASSIGNMENT,
  MODERATORS_LIST,
  PUBLISH
} from './actions';

const extendList = (addType, removeType) => ({
  [addType + SUCCESS]: (state, action) => ({
    ...state,
    data: {
      ...state.data,
      results: [...state.data.results, action.data]
    }
  }),
  [removeType + SUCCESS]: (state, action) => ({
    ...state,
    data: {
      ...state.data,
      results: state.data.results.filter(item => item.id !== action.data.id)
    }
  })
});

export const admin = combineReducers({
  users: combineReducers({
    checkers: apiReducer(CHECKERS_LIST),
    experts: apiReducer(EXPERTS_LIST),
    specialists: apiReducer(SPECIALISTS_LIST),
    moderators: apiReducer(MODERATORS_LIST),
    add: apiReducer(USER_ADD),
    update: apiReducer(USER_UPDATE)
  }),
  invitations: apiReducer(INVITATIONS_LIST),
  publish: apiReducer(PUBLISH),
  assignment: combineReducers({
    assign: apiReducer(ASSIGN_EXPERT),
    dismiss: apiReducer(DISMISS_ASSIGNMENT)
  }),
  edit: combineReducers({
    news: apiReducer(EDIT_NEWS),
    image: apiReducer(EDIT_IMAGE),
    checker: apiReducer(EDIT_CHECKER_OPINION),
    expert: apiReducer(EDIT_EXPERT_OPINION)
  }),
  sensitive: combineReducers({
    list: apiReducer(SENSITIVE_LIST, extendList(SENSITIVE_ADD, SENSITIVE_REMOVE)),
    add: apiReducer(SENSITIVE_ADD),
    remove: apiReducer(SENSITIVE_REMOVE)
  }),
  domains: combineReducers({
    list: apiReducer(DOMAINS_LIST, extendList(DOMAINS_ADD, DOMAINS_REMOVE)),
    add: apiReducer(DOMAINS_ADD),
    remove: apiReducer(DOMAINS_REMOVE)
  }),
  hashtags: combineReducers({
    list: apiReducer(HASHTAGS_LIST, extendList(HASHTAGS_ADD, HASHTAGS_REMOVE)),
    add: apiReducer(HASHTAGS_ADD),
    remove: apiReducer(HASHTAGS_REMOVE)
  })
});
