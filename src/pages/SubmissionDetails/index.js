import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useRouteMatch } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Typography, Chip } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';

import { appUrls } from 'urls';
import { submissionsActions } from 'storages/submissions/actions';
import { adminActions } from 'storages/admin/actions';
import Title from 'components/Title';
import Suspense from 'components/Suspense';
import VerificationForm from 'components/VerificationForm';
import NewsDetails from 'components/submissions/NewsDetails';
import Skeleton from 'components/submissions/NewsDetails/Skeleton';
import CheckersVerdicts from 'components/submissions/CheckersVerdicts';
import ExpertVerdict from 'components/submissions/ExpertVerdict';
import Hashtags from 'components/submissions/Hashtags';
import Toast from 'components/Toast';
import { rolesTypes } from 'consts';

import styles from './SubmissionDetails.module.scss';
import { useTranslation } from 'react-i18next';

const SuccessInfo = () => {
  const { t } = useTranslation();
  return (
    <div className={styles.successContainer}>
      <div className={styles.successText}>
        <CheckCircleOutlineIcon color="inherit" />
        <span>{t('details.formSent')}</span>
      </div>
      <div className={styles.successText}>
        <Button component={Link} to={appUrls.DASHBOARD} color="primary">
          {t('details.backToList')}
        </Button>
      </div>
    </div>
  );
};

const FactCheckerView = ({ onSubmit, isSubmitting, error, showSuccess }) => {
  const { t } = useTranslation();
  return (
    <>
      <Title component="h2">{t('verification.yourVerdict')}</Title>
      {showSuccess ? (
        <SuccessInfo />
      ) : (
        <VerificationForm onSubmit={onSubmit} isSubmitting={isSubmitting} error={error} />
      )}
    </>
  );
};

FactCheckerView.propTypes = {
  onSubmit: PropTypes.func,
  isSubmitting: PropTypes.bool,
  error: PropTypes.string,
  showSuccess: PropTypes.bool
};

const ExpertView = ({ submissionDetails, onSubmit, isSubmitting, error, showSuccess, role }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { expertOpinionUpdate, hashtagsUpdate } = useSelector(({ admin, submissions }) => ({
    expertOpinionUpdate: admin.edit.expert,
    hashtagsUpdate: submissions.hashtags.update
  }));

  const handleTagsUpdate = values => {
    dispatch(submissionsActions.hashtags.update(role)(submissionDetails?.id, { tags: values }));
  };

  const handleUpdate = (values, verdictId) => {
    dispatch(
      adminActions.edit.expertOpinion(submissionDetails?.id, verdictId, values, () =>
        dispatch(submissionsActions.details(role)(submissionDetails?.id, false))
      )
    );
  };

  return (
    <>
      <Toast showOn={hashtagsUpdate.data}>{t('tags.tagsUpdated')}</Toast>
      <Hashtags onSave={handleTagsUpdate} defaultValue={submissionDetails?.tags} />
      <CheckersVerdicts checkersOpinions={submissionDetails?.fact_checker_opinions} />
      {submissionDetails?.expert_opinion ? (
        <ExpertVerdict
          onUpdate={handleUpdate}
          updateState={expertOpinionUpdate}
          values={submissionDetails.expert_opinion}
        />
      ) : (
        <>
          <Title component="h2">{t('verification.yourVerdict')}</Title>

          {showSuccess ? (
            <SuccessInfo />
          ) : (
            <VerificationForm onSubmit={onSubmit} isSubmitting={isSubmitting} error={error} />
          )}
        </>
      )}
    </>
  );
};

ExpertView.propTypes = {
  submissionDetails: PropTypes.object,
  onSubmit: PropTypes.func,
  onTagsUpdate: PropTypes.func,
  onUpdate: PropTypes.func,
  isSubmitting: PropTypes.bool,
  error: PropTypes.string,
  showSuccess: PropTypes.bool,
  role: PropTypes.string
};

const checkRole = role => type => type.includes(role);

const SubmissionDetails = ({ role }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const {
    params: { id }
  } = useRouteMatch();

  const { submission, submissionVerification, myEmail, dissmis } = useSelector(({ submissions, user }) => ({
    submissionVerification: submissions.verify,
    submission: submissions.details,
    myEmail: user.details.data?.email,
    dissmis: submissions.assignment.dismiss
  }));
  const isAssignedToMe = myEmail === submission.data?.assigned_crew_member;

  useEffect(() => {
    dispatch(submissionsActions.details(role)(id));

    return () => {
      dispatch(submissionsActions.hashtags.clearUpdate());
    };
  }, [dispatch, id, role]);

  const handleSubmit = payload => {
    dispatch(submissionsActions.verify(role)(id, payload));
  };

  const dismissAssigment = () => {
    dispatch(submissionsActions.dissmisAssignment(role)(id));
  };

  const isRole = checkRole(role);
  const isOpined = submissionVerification.data?.id === id || submission.data?.is_opined;

  return (
    <div className={styles.container}>
      <Title>{t('details.title')}</Title>
      {isAssignedToMe && (
        <Alert
          className={styles.assignedInfo}
          severity="info"
          variant="filled"
          elevation={1}
          action={
            <Button onClick={dismissAssigment} disabled={dissmis.isFetching} color="inherit" size="small">
              {t('details.dismissAssigment')}
            </Button>
          }
        >
          {t('details.assignedToMe')}
        </Alert>
      )}
      {!isAssignedToMe && submission.data?.assigned_crew_member && (
        <Alert className={styles.assignedInfo} severity="warning" variant="filled" elevation={1}>
          {t('details.assignedToOther')}
        </Alert>
      )}
      <Suspense waitFor={submission} fallback={<Skeleton />} polling>
        {submission.data?.domains?.length > 0 && (
          <div className={styles.domainsChipsWrapper}>
            <Typography>{t('details.domains')}</Typography>
            {submission.data.domains.map(domain => (
              <Chip className={styles.domainsChip} key={domain.id} label={domain.name} color="secondary" />
            ))}
          </div>
        )}
        <NewsDetails submission={submission.data} />
      </Suspense>

      {isRole([rolesTypes.CHECKER]) && (
        <FactCheckerView
          onSubmit={handleSubmit}
          isSubmitting={submissionVerification.isFetching}
          error={submissionVerification.error}
          showSuccess={isOpined}
        />
      )}

      {isRole([rolesTypes.EXPERT, rolesTypes.SPECIALIST]) && (
        <ExpertView
          isAssignedToMe={isAssignedToMe}
          submissionDetails={submission.data}
          onSubmit={handleSubmit}
          isSubmitting={submissionVerification.isFetching}
          error={submissionVerification.error}
          showSuccess={isOpined}
          role={role}
        />
      )}
    </div>
  );
};

SubmissionDetails.propTypes = {
  role: PropTypes.oneOf(Object.values(rolesTypes))
};

export default SubmissionDetails;
