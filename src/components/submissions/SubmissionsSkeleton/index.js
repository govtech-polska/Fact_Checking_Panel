import React from 'react';
import { Skeleton as SkeletonMui } from '@material-ui/lab';
import { Card } from '@material-ui/core';

import styles from './SubmissionsSkeleton.module.scss';

const cardsNumber = [...Array(20).keys()];

const SubmissionsSkeleton = () => {
  return cardsNumber.map(index => (
    <Card key={index} className={styles.skeleton}>
      <SkeletonMui height={160} width={300} variant="rect" animation="wave" />
      <div className={styles.skeletonContent}>
        <SkeletonMui className={styles.skeletonText} height={20} animation="wave" />
        <SkeletonMui className={styles.skeletonText} height={20} animation="wave" />
        <SkeletonMui className={styles.skeletonText} height={20} animation="wave" />
      </div>
    </Card>
  ));
};

export default SubmissionsSkeleton;
