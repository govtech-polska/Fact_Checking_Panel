import React from 'react';
import { Skeleton as SkeletonMui } from '@material-ui/lab';
import { Paper, Typography } from '@material-ui/core';

import styles from './SubmissionDetails.module.scss';

const Skeleton = () => {
  return (
    <Paper className={styles.skeleton} variant="outlined">
      <SkeletonMui height={334} variant="rect" className={styles.skeletonImg} />

      <Typography variant="body2" paragraph>
        <SkeletonMui width={220} />
      </Typography>

      <Typography variant="h6">
        <SkeletonMui width={220} />
      </Typography>
      <Typography paragraph>
        <SkeletonMui />
      </Typography>

      <Typography variant="h6">
        <SkeletonMui width={220} />
      </Typography>
      <Typography paragraph>
        <SkeletonMui />
      </Typography>

      <Typography>
        <SkeletonMui />
      </Typography>
    </Paper>
  );
};

export default Skeleton;
