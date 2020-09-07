import Route from 'route-parser';
import qs from 'qs';

/**
 * Returns a path with the given parameters.
 * @param {string} pattern - The path pattern.
 * @param {Object} params - The parameters of the path.
 */
export const resolveUrl = (path, params, query) => {
  const route = new Route(path);
  const url = route.reverse(params);
  const queryString = qs.stringify(query, { arrayFormat: 'brackets', addQueryPrefix: true });
  return `${url}${queryString}`;
};

/**
 * Returns parameters from the given path.
 * @param {string} pattern - The path pattern.
 * @param {string} path - The resolved path.
 */
export const matchUrl = (pattern, path) => {
  const route = new Route(pattern);
  return route.match(path);
};

export const extendQueryString = (url, actualQuery, extendedQuery = {}) =>
  url +
  qs.stringify(
    { ...actualQuery, ...extendedQuery },
    { addQueryPrefix: true, skipNulls: true, arrayFormat: 'brackets' }
  );
