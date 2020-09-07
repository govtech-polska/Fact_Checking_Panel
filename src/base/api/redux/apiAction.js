import { REQUEST } from 'base/redux/consts';

/**
 * Action creator generates action for an API request.
 * @param {string} type - The type of the action.
 * @param {string} endpoint - The endpoint URL.
 * @param {Object} [options] - Additional things which may extend the action.
 * @param {Object} [options.payload] - The payload data sending to API.
 * @param {string} [options.method] - The type of the HTTP request method (GET, POST, etc.).
 * @param {function} [options.afterSagaSuccess] - The generator function that will be call after success in saga.
 * @param {Object} [options.mockResponse] - Mocked response.
 * @param {Object} [options.extendResponse] - Extended response.
 * @param {Object} [options.clearOnRequest] - Reset redux fields to initial values on request.
 */
export const apiAction = (type, endpoint, options = {}) => {
  return {
    type: type + REQUEST,
    endpoint,
    method: options.method || 'GET',
    payload: options.payload,
    afterSagaSuccess: options.afterSagaSuccess,
    mockResponse: options.mockResponse,
    extendResponse: options.extendResponse,
    clearOnRequest: options.clearOnRequest
  };
};
