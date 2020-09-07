import React from 'react';
import PropTypes from 'prop-types';
import { Link, useRouteMatch } from 'react-router-dom';
import { Pagination as MuiPagination, PaginationItem } from '@material-ui/lab';

import { useQuery } from 'hooks/useQuery';
import { extendQueryString } from 'utils/url';

import styles from './Pagination.module.scss';

const PAGE_SIZE = 20;
const Pagination = ({ total, pageSize = PAGE_SIZE }) => {
  const { url } = useRouteMatch();
  const { page = 1, ...query } = useQuery();
  const pageCount = Math.ceil(total / pageSize);

  return (
    <div className={styles.pagination}>
      <MuiPagination
        count={pageCount}
        page={parseFloat(page)}
        renderItem={item => (
          <PaginationItem component={Link} to={extendQueryString(url, query, { page: item.page })} {...item} />
        )}
      />
    </div>
  );
};

Pagination.propTypes = {
  pageSize: PropTypes.number,
  total: PropTypes.number
};

export default Pagination;
