import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Typography } from '@material-ui/core';
import Verdict from 'components/submissions/Verdict';

import styles from './ExpertVerdict.module.scss';
import { rolesTypes } from 'consts';
import VerificationForm from 'components/VerificationForm';

const ExpertVerdict = ({
  values,
  onSubmit,
  onUpdate,
  onPublish,
  submitState,
  updateState,
  publishState,
  isPublished,
  role
}) => {
  const { t } = useTranslation();
  const allAdminRoles = role === rolesTypes.ADMIN || role === rolesTypes.MODERATOR;
  const onlyModerator = role === rolesTypes.MODERATOR;

  return (
    <div className={styles.wrapper}>
      <Typography component="h2" variant="h5" paragraph>
        {t('details.expertVerdict')}
      </Typography>

      {values ? (
        <Verdict
          values={values}
          onUpdate={onUpdate}
          onPublish={onPublish}
          updateState={updateState}
          publishState={publishState}
          isPublished={isPublished}
          isAdmin={allAdminRoles}
          allowEdit={!allAdminRoles && onUpdate && !isPublished}
        />
      ) : onlyModerator ? (
        <VerificationForm onSubmit={onSubmit} isSubmitting={submitState.isFetching} error={submitState.error} />
      ) : (
        <Typography paragraph>{t('details.noExpertVerdict')}</Typography>
      )}
    </div>
  );
};

ExpertVerdict.propTypes = {
  isPublished: PropTypes.bool,
  onPublish: PropTypes.func,
  onSubmit: PropTypes.func,
  onUpdate: PropTypes.func,
  publishState: PropTypes.shape({
    error: PropTypes.string,
    isFetching: PropTypes.bool
  }),
  role: PropTypes.string,
  submitState: PropTypes.shape({
    error: PropTypes.string,
    isFetching: PropTypes.bool
  }),
  updateState: PropTypes.shape({
    data: PropTypes.any,
    error: PropTypes.string,
    isFetching: PropTypes.bool
  }),
  values: PropTypes.object
};

export default ExpertVerdict;
