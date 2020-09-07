import { useLocation } from 'react-router-dom';
import qs from 'qs';

export const useQuery = () => {
  const search = useLocation().search;
  return qs.parse(search, { ignoreQueryPrefix: true });
};
