import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Link as RouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import PublicIcon from '@material-ui/icons/Public';
import EditIcon from '@material-ui/icons/Edit';
import ClearIcon from '@material-ui/icons/Clear';
import { Typography, Paper, Chip, Button, Link } from '@material-ui/core';
import VerificationForm from 'components/VerificationForm';
import Alert from 'components/Alert';
import { resolveUrl } from 'utils/url';
import { appUrls } from 'urls';

import styles from './Verdict.module.scss';

const StaticVerdict = ({ title, comment, verdict, sources, duplicateId }) => {
  const { t } = useTranslation();
  // TODO: use consts for verdict types (after merge with internationalization)
  const verdictClass = cx(styles.verdict, {
    [styles.verdictTrue]: verdict === 'true',
    [styles.verdictFalse]: verdict === 'false',
    [styles.verdictUnidentified]: verdict === 'unidentified'
  });

  if (duplicateId) {
    const path = resolveUrl(appUrls.SUBMISSIONS.DETAILS, { id: duplicateId });

    return (
      <Typography className={styles.field} variant="body1">
        <Typography variant="caption" className={styles.caption}>
          {t('verification.duplicate')}
        </Typography>
        <Link component={RouterLink} to={path}>
          {window.location.origin}
          {path}
        </Link>
      </Typography>
    );
  }

  if (verdict === 'spam') {
    return (
      <Typography className={styles.field} variant="body1">
        <Typography variant="caption" className={styles.caption}>
          {t('verification.verdict')}
        </Typography>
        SPAM
      </Typography>
    );
  }

  return (
    <>
      <Typography className={styles.field} variant="body1">
        <Typography variant="caption" className={styles.captionVerdict}>
          {t('verification.verdict')}
        </Typography>
        <Chip label={t(`verdictTypes.${verdict}`)} className={verdictClass} component="span" />
      </Typography>

      <Typography className={styles.field} variant="body1">
        <Typography variant="caption" className={styles.caption}>
          {t('verification.submissionTitle')}
        </Typography>
        {title}
      </Typography>

      <Typography className={styles.field} variant="body1">
        <Typography variant="caption" className={styles.caption}>
          {t('verification.comment')}
        </Typography>
        {comment}
      </Typography>

      <Typography className={styles.field} variant="body1">
        <Typography variant="caption" className={styles.caption}>
          {t('verification.sources')}
        </Typography>
        {sources}
      </Typography>
    </>
  );
};

StaticVerdict.propTypes = {
  title: PropTypes.string,
  comment: PropTypes.string,
  verdict: PropTypes.string,
  sources: PropTypes.string,
  duplicateId: PropTypes.string
};

const Verdict = ({ values, onUpdate, onPublish, updateState, publishState, isPublished, isAdmin, allowEdit }) => {
  const { t } = useTranslation();
  const { id, title, comment, confirmation_sources, verdict, duplicate_reference, judge } = values;
  const [isEditMode, setIsEditMode] = useState(false);

  const wasUpdated = updateState?.data;
  useEffect(() => {
    if (wasUpdated) {
      setIsEditMode(false);
    }
  }, [wasUpdated]);

  if (isEditMode) {
    return (
      <VerificationForm
        values={values}
        onSubmit={nextValues => onUpdate(nextValues, id)}
        onCancel={() => setIsEditMode(false)}
        isSubmitting={updateState?.isFetching}
        error={updateState?.error}
      />
    );
  }

  return (
    <Paper className={styles.paper}>
      <StaticVerdict
        title={title}
        verdict={verdict}
        comment={comment}
        sources={confirmation_sources}
        duplicateId={duplicate_reference}
      />
      {allowEdit && (
        <Button
          className={styles.singleEditBtn}
          onClick={() => setIsEditMode(true)}
          variant="outlined"
          startIcon={<EditIcon />}
        >
          {t('common.edit')}
        </Button>
      )}
      {isAdmin && (
        <>
          <div className={styles.adminActions}>
            <Typography className={styles.field} variant="body1">
              <Typography variant="caption" className={styles.caption}>
                {t('verification.author')}
              </Typography>
              {judge?.email}
            </Typography>
            <Button
              className={styles.adminBtn}
              onClick={() => setIsEditMode(true)}
              variant="outlined"
              startIcon={<EditIcon />}
            >
              {t('common.edit')}
            </Button>

            {onPublish &&
              (isPublished ? (
                <Button
                  className={styles.adminBtn}
                  onClick={() => onPublish(false)}
                  variant="outlined"
                  color="secondary"
                  startIcon={<ClearIcon />}
                  disabled={publishState?.isFetching}
                >
                  {t('adminDetails.undoPublication')}
                </Button>
              ) : (
                <Button
                  className={styles.adminBtn}
                  onClick={() => onPublish(true)}
                  variant="outlined"
                  color="primary"
                  startIcon={<PublicIcon />}
                  disabled={publishState?.isFetching}
                >
                  {t('adminDetails.publish')}
                </Button>
              ))}
          </div>
          <Alert showOn={publishState?.error}>{publishState?.error}</Alert>
        </>
      )}
    </Paper>
  );
};

Verdict.propTypes = {
  values: PropTypes.object,
  onUpdate: PropTypes.func,
  onPublish: PropTypes.func,
  isAdmin: PropTypes.bool,
  isPublished: PropTypes.bool,
  error: PropTypes.string,
  isUpdating: PropTypes.bool,
  allowEdit: PropTypes.bool,
  updateState: PropTypes.shape({
    isFetching: PropTypes.bool,
    error: PropTypes.string,
    data: PropTypes.any
  }),
  publishState: PropTypes.shape({
    isFetching: PropTypes.bool,
    error: PropTypes.string
  })
};

export default Verdict;
