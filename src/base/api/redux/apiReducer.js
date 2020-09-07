import { REQUEST, SUCCESS, FAILURE, CLEAR } from 'base/redux/consts';

/**
 * Method creates reducer for an API request.
 * @param {string} type - The type of the action.
 * @param {object} [extension] - Object with [type]: reducer() structure to customize apiReducer.
 */
export const apiReducer = (type, extension = {}) => {
  const initialState = {
    data: null,
    error: null,
    isFetching: false
  };

  return (state = initialState, action) => {
    if (extension[action.type]) {
      return extension[action.type](state, action);
    }

    switch (action.type) {
      case type + REQUEST:
        return {
          ...(action.clearOnRequest ? initialState : state),
          isFetching: true
        };
      case type + SUCCESS: {
        return {
          ...state,
          error: initialState.error,
          isFetching: initialState.isFetching,
          data: action.data
        };
      }
      case type + FAILURE:
        return {
          ...state,
          error: action.error,
          isFetching: initialState.isFetching
        };
      case type + CLEAR:
        return initialState;
      case type + CLEAR + FAILURE:
        return {
          ...state,
          error: null
        };
      default:
        return state;
    }
  };
};
