import axios from 'axios';
import { getToken } from 'utils/token';

/**
 * Creates an API request.
 * @param {string} method - The type of the HTTP request method.
 * @param {string} url - The endpoint URL.
 * @param {Object} data - The payload data.
 */
export const request = (method, url, data) => {
  let requestConfig = {
    baseURL: process.env.REACT_APP_API_URL,
    method,
    url,
    data,
    headers: {
      'Cache-Control': 'no-cache'
    }
  };

  const token = getToken();
  if (token) {
    requestConfig.headers = {
      ...(requestConfig.headers || {}),
      Authorization: `Token ${token}`
    };
  }

  return axios(requestConfig);
};
