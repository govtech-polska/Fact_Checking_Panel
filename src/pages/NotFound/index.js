import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Typography, Link, Paper } from '@material-ui/core';

import { appUrls } from 'urls';

import styles from './NotFound.module.scss';

const NotFound = () => {
  return (
    <div className={styles.wrapper}>
      <Paper className={styles.content}>
        <Typography variant="h2" component="h1">
          404
        </Typography>
        <Typography paragraph>
          Przykro nam, ale pod tym adresem niczego nie ma{' '}
          <span role="img" aria-label="smutna buźka">
            😥
          </span>
          .
        </Typography>
        <Link component={RouterLink} to={appUrls.DASHBOARD}>
          Wróć na stronę główną
        </Link>
      </Paper>
    </div>
  );
};

export default NotFound;
