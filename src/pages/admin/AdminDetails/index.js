import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Button, Typography } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import RestoreIcon from '@material-ui/icons/Restore';

import { submissionsActions } from 'storages/submissions/actions';
import { adminActions } from 'storages/admin/actions';
import { rolesTypes } from 'consts';

import Title from 'components/Title';
import Suspense from 'components/Suspense';
import Uploader from 'components/Uploader';
import NewsDetails from 'components/submissions/NewsDetails';
import Skeleton from 'components/submissions/NewsDetails/Skeleton';
import CheckersVerdicts from 'components/submissions/CheckersVerdicts';
import ExpertVerdict from 'components/submissions/ExpertVerdict';
import PinOutlined from 'components/icons/PinOutlined';
import Pin from 'components/icons/Pin';
import Hashtags from 'components/submissions/Hashtags';
import Toast from 'components/Toast';
import DomainsForm from './DomainsForm';
import AssignExpert from './AssignExpert';

import styles from './AdminDetails.module.scss';

const AdminDetails = ({ role }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const {
    params: { id }
  } = useRouteMatch();
  const [showUploader, setShowUploader] = useState(false);
  const {
    submission,
    image,
    newsUpdated,
    opinionSubmitted,
    checkerUpdated,
    expertUpdated,
    domains,
    assign,
    publish,
    dismiss
  } = useSelector(({ submissions, admin }) => ({
    domains: admin.domains.list.data?.results || [],
    submission: submissions.details,
    image: admin.edit.image,
    newsUpdated: admin.edit.news,
    checkerUpdated: admin.edit.checker,
    expertUpdated: admin.edit.expert,
    assign: admin.assignment.assign,
    dismiss: admin.assignment.dismiss,
    publish: admin.publish,
    opinionSubmitted: submissions.verify
  }));

  useEffect(() => {
    dispatch(adminActions.domains.list());
    dispatch(submissionsActions.details(rolesTypes.ADMIN)(id));
    return () => {
      dispatch(adminActions.clearAssign());
      dispatch(adminActions.edit.clearNews());
    };
  }, [dispatch, id]);

  const handleExpertOpinionSubmit = values => {
    dispatch(
      submissionsActions.verify(role)(id, values, {
        afterSagaSuccess: () => dispatch(submissionsActions.details(role)(id))
      })
    );
  };

  const updateNews = values => {
    dispatch(adminActions.edit.news(id, values));
  };

  const updateCheckerVerdict = (values, verdictId) => {
    dispatch(adminActions.edit.checkerOpinion(id, verdictId, values));
  };

  const updateExpertVerdict = (values, verdictId) => {
    dispatch(adminActions.edit.expertOpinion(id, verdictId, values));
  };

  const updateImage = files => {
    const file = files[0];
    const payload = new FormData();
    payload.append('image', file, file.name);
    dispatch(adminActions.edit.image(id, payload, () => setShowUploader(false)));
  };

  const updateDomains = values => {
    dispatch(adminActions.edit.news(id, { domains: values }));
  };

  const handleRemove = () => {
    dispatch(submissionsActions.remove(id));
  };

  const handleRecover = () => {
    dispatch(submissionsActions.remove(id, false));
  };

  const handleAttach = () => {
    dispatch(submissionsActions.attach(id));
  };

  const handleDetach = () => {
    dispatch(submissionsActions.attach(id, false));
  };

  const handleAssign = user => {
    if (user) {
      dispatch(adminActions.assign(id, user?.id));
    } else {
      dispatch(adminActions.dismissAssignment(id));
    }
  };

  const handlePublication = nextPublicationStatus => {
    dispatch(adminActions.publish(id, nextPublicationStatus));
  };

  const checkersOpinions = submission.data?.fact_checker_opinions;
  const expertOpinion = submission.data?.expert_opinion;

  return (
    <div className={styles.container}>
      <Toast showOn={newsUpdated.data} withClose>
        {t('common.saved')}
      </Toast>
      <Title>{t('details.title')}</Title>
      <Suspense waitFor={submission} fallback={<Skeleton />} polling>
        <NewsDetails
          submission={submission.data}
          onNewsEdit={updateNews}
          onImageEdit={() => setShowUploader(true)}
          editState={newsUpdated}
          editable
        />
        <Uploader
          onSave={updateImage}
          onClose={() => setShowUploader(false)}
          isOpen={showUploader}
          error={image.error}
          isSubmitting={image.isFetching}
        />
        <AssignExpert
          onUpdate={handleAssign}
          error={assign.error || dismiss.error}
          isUpdatting={assign.isFetching || dismiss.isFetching}
          defaultValue={{ email: submission.data?.assigned_crew_member }}
          verdictExists={!!expertOpinion}
        />
        <DomainsForm onUpdate={updateDomains} defaultValue={submission.data?.domains} domains={domains} />
      </Suspense>

      <Hashtags onSave={tags => updateNews({ tags })} defaultValue={submission.data?.tags} isAdmin />

      <CheckersVerdicts
        checkersOpinions={checkersOpinions}
        onUpdate={updateCheckerVerdict}
        updateState={checkerUpdated}
        isAdmin
      />
      <ExpertVerdict
        values={expertOpinion}
        onSubmit={handleExpertOpinionSubmit}
        onUpdate={updateExpertVerdict}
        onPublish={handlePublication}
        submitState={opinionSubmitted}
        updateState={expertUpdated}
        publishState={publish}
        isPublished={submission.data?.is_published}
        role={role}
        isAdmin
      />

      <div className={styles.removeWrapper}>
        {submission.data?.is_pinned ? (
          <Button onClick={handleDetach} startIcon={<PinOutlined />}>
            {t('adminDetails.unpinSubmission')}
          </Button>
        ) : (
          <Button onClick={handleAttach} startIcon={<Pin />}>
            {t('adminDetails.pinSubmission')}
          </Button>
        )}
      </div>

      <div className={styles.removeWrapper}>
        {submission.data?.deleted ? (
          <>
            <Typography>{t('adminDetails.removed')}</Typography>
            <Button onClick={handleRecover} color="primary" startIcon={<RestoreIcon />}>
              {t('adminDetails.restoreSubmission')}
            </Button>
          </>
        ) : (
          <Button onClick={handleRemove} color="secondary" startIcon={<DeleteIcon />}>
            {t('adminDetails.removeSubmission')}
          </Button>
        )}
      </div>
    </div>
  );
};

AdminDetails.propTypes = {
  role: PropTypes.string
};

export default AdminDetails;
