import { useQuery } from './useQuery';
import history from 'base/history';
import { extendQueryString } from 'utils/url';
import { useRouteMatch } from 'react-router-dom';

const parseOrderingQuery = orderingQuery => {
  if (!orderingQuery) {
    return {};
  }
  const key = orderingQuery.startsWith('-') ? orderingQuery.slice(1) : orderingQuery;
  const direction = key !== orderingQuery ? 'desc' : 'asc';
  return {
    [key]: direction
  };
};

/**
 * Hook for ordering management. Based on changes in query string.
 * @param {object} defaultValue
 * @returns {object} sort Object with utils for using sorting
 * @returns {object} sort.value Actual ordering value { [key]: 'asc'|'desc' }
 * @returns {function} sort.toggleValue Function for toggling actual order value
 */
export const useSort = () => {
  const { url } = useRouteMatch();
  const query = useQuery();

  const value = parseOrderingQuery(query.ordering);

  const setValue = nextValue => {
    history.replace(extendQueryString(url, query, { ordering: nextValue }));
  };

  const toggleValue = key => {
    const nextValue = value[key] === 'asc' ? `-${key}` : key;
    setValue(nextValue);
  };

  return { value, toggleValue, setValue };
};
