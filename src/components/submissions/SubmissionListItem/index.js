import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Link } from 'react-router-dom';
import { Card, CardMedia, CardContent, Typography, Chip, Tooltip, CardActionArea } from '@material-ui/core';
import Pin from 'components/icons/Pin';

import { appUrls } from 'urls';
import { resolveUrl } from 'utils/url';
import styles from './SubmissionCard.module.scss';
import { verdictTypes } from 'consts';

const getVerdict = (verdict, isDuplicate, isSensitive) => {
  if (isDuplicate) return 'Duplikat';
  if (isSensitive) return 'Wrażliwe słowa';
  return verdictTypes[verdict];
};

// TODO: WIP
const SubmissionListItem = ({
  id,
  text,
  image,
  reportDate,
  verdict,
  isDuplicate,
  isSensitive,
  isPinned,
  // props for history card
  title,
  isHistory // temporary solution, do it better in next iteration
}) => {
  const verdictClass = cx(styles.verdict, {
    [styles.verdictTrue]: verdict === 'true',
    [styles.verdictFalse]: verdict === 'false'
  });

  const formattedReportDate = reportDate && new Date(reportDate).toLocaleString();
  const verdictLabel = getVerdict(verdict, isDuplicate, isSensitive);

  return (
    <Card
      component={Link}
      to={resolveUrl(isHistory ? appUrls.HISTORY.DETAILS : appUrls.SUBMISSIONS.DETAILS, { id })}
      className={styles.card}
    >
      <CardActionArea className={styles.wrapper}>
        <CardMedia className={styles.image} image={image} title="" />
        <CardContent className={styles.content}>
          <Typography variant="caption" className={styles.dateLabel}>
            {formattedReportDate}
          </Typography>
          <div className={styles.verdictWrapper}>
            {isSensitive && <Chip className={cx(styles.verdict, styles.verdictSensitive)} label="Wrażliwe słowa" />}
            <Chip className={verdictClass} label={`${verdictLabel}`} />
            {isPinned && (
              <Tooltip title="Przypięte na portalu">
                <Pin className={styles.pinIcon} />
              </Tooltip>
            )}
          </div>
          <Typography variant="caption" className={styles.commentLabel}>
            Tytuł
          </Typography>
          <Typography className={styles.comment}>{title || '—'}</Typography>

          <Typography variant="caption" className={styles.commentLabel}>
            Zaznaczony fragment
          </Typography>
          <Typography className={styles.comment}>{text}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

SubmissionListItem.propTypes = {
  id: PropTypes.string,
  url: PropTypes.string,
  image: PropTypes.string,
  text: PropTypes.string,
  title: PropTypes.string,
  verdict: PropTypes.string,
  reportDate: PropTypes.string,
  hasOpinion: PropTypes.bool,
  isHistory: PropTypes.bool,
  isDuplicate: PropTypes.bool,
  isSensitive: PropTypes.bool,
  isPinned: PropTypes.bool
};

export default SubmissionListItem;
