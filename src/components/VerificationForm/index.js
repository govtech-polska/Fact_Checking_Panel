import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Formik, Form } from 'formik';
import * as yup from 'yup';

import { Button, Typography, Paper } from '@material-ui/core';
import FormTextField from 'components/Forms/FormTextField';
import FormRadio from 'components/Forms/FormRadio';

import { VERDICT_OPTIONS, VERDICT_TYPES, VERDICT_TYPES_OPTIONS } from './consts';
import styles from './VerificationForm.module.scss';

const getUUIDFromUrl = url => {
  return url.match(/[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}/)?.[0];
};

const fields = {
  type: 'type',
  duplicateReference: 'duplicate_reference',
  title: 'title',
  verdict: 'verdict',
  comment: 'comment',
  confirmationSources: 'confirmation_sources'
};

const getInitialValues = (values = {}) => ({
  [fields.type]: values[fields.duplicateReference]
    ? VERDICT_TYPES.DUPLICATE
    : values[fields.verdict] === 'spam'
    ? VERDICT_TYPES.SPAM
    : VERDICT_TYPES.VERDICT,
  [fields.duplicateReference]: values[fields.duplicateReference] || '',
  [fields.title]: values[fields.title] || '',
  [fields.verdict]: values[fields.verdict] || '',
  [fields.comment]: values[fields.comment] || '',
  [fields.confirmationSources]: values[fields.confirmationSources] || ''
});

const MIN_VERDICT_LENGTH = 500;

const validationSchema = yup.object().shape({
  [fields.type]: yup.string().required(),
  [fields.duplicateReference]: yup.string().when(fields.type, {
    is: VERDICT_TYPES.DUPLICATE,
    then: yup
      .string()
      .url()
      .required('validations.requiredDuplicateUrl')
  }),
  [fields.title]: yup.string().when(fields.type, {
    is: VERDICT_TYPES.VERDICT,
    then: yup.string().required('validations.requiredTitle')
  }),
  [fields.verdict]: yup.string().when(fields.type, {
    is: VERDICT_TYPES.VERDICT,
    then: yup.string().required('validations.requiredVerdict')
  }),
  [fields.comment]: yup.string().when(fields.type, {
    is: VERDICT_TYPES.VERDICT,
    then: yup
      .string()
      .min(MIN_VERDICT_LENGTH, 'validations.minVerdictComment')
      .required('validations.requiredVerdictComment')
  }),
  [fields.confirmationSources]: yup.string().when(fields.type, {
    is: VERDICT_TYPES.VERDICT,
    then: yup.string().required('validations.requiredVerdictComment')
  })
});

const VerificationForm = ({ values: initialValues, onSubmit, isSubmitting, error, onCancel }) => {
  const { t } = useTranslation();

  const getTranslatedOptions = (values, prefix) => values.map(value => ({ value, label: t(`${prefix}.${value}`) }));

  const handleSubmit = ({ [fields.type]: type, [fields.duplicateReference]: duplicateReference, ...restValues }) => {
    let payload = { [fields.type]: type };
    if (type === VERDICT_TYPES.DUPLICATE) {
      payload = {
        ...payload,
        [fields.duplicateReference]: getUUIDFromUrl(duplicateReference)
      };
    }
    if (type === VERDICT_TYPES.VERDICT) {
      payload = {
        ...payload,
        ...restValues
      };
    }
    onSubmit(payload);
  };

  return (
    <Paper className={styles.container}>
      <Formik
        initialValues={getInitialValues(initialValues)}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values }) => {
          const letterNumber = values[fields.comment].length;
          const isDuplicate = values[fields.type] === VERDICT_TYPES.DUPLICATE;
          const isVerdict = values[fields.type] === VERDICT_TYPES.VERDICT;
          return (
            <Form>
              <FormRadio
                label={t('verification.formType')}
                name={fields.type}
                options={getTranslatedOptions(VERDICT_TYPES_OPTIONS, 'verdictFormOptions')}
              />
              {isDuplicate && (
                <FormTextField
                  className={styles.field}
                  name={fields.duplicateReference}
                  label={t('verification.duplicateLink')}
                  helperText={t('verification.duplicateLinkHelp', { origin: window.location.origin })}
                />
              )}
              {isVerdict && (
                <>
                  <FormTextField
                    className={styles.field}
                    name={fields.title}
                    label={t('verification.submissionTitle')}
                    helperText={t('verification.submissionTitleHelp')}
                  />
                  <FormRadio
                    className={styles.field}
                    name={fields.verdict}
                    options={getTranslatedOptions(VERDICT_OPTIONS, 'verdictTypes')}
                    label={t('verification.yourVerdict')}
                  />
                  <FormTextField
                    className={styles.field}
                    name={fields.comment}
                    label={t('verification.comment')}
                    multiline
                  />
                  <div className={styles.letterCounter}>
                    {t('verification.letterCount')} <span>{letterNumber}</span>
                  </div>
                  <FormTextField
                    className={styles.field}
                    name={fields.confirmationSources}
                    label={t('verification.sources')}
                    helperText={t('verification.sourcesHelp')}
                    multiline
                  />
                </>
              )}
              <div className={styles.actions}>
                {onCancel ? (
                  <>
                    <Button color="primary" onClick={onCancel} disabled={isSubmitting}>
                      {t('common.cancel')}
                    </Button>
                    <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
                      {t('common.update')}
                    </Button>
                  </>
                ) : (
                  <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
                    {t('verification.sendBtn')}
                  </Button>
                )}
              </div>
              {error && <Typography color="error">{error}</Typography>}
            </Form>
          );
        }}
      </Formik>
    </Paper>
  );
};

VerificationForm.propTypes = {
  onSubmit: PropTypes.func,
  onCancel: PropTypes.func,
  title: PropTypes.string,
  values: PropTypes.object,
  isSubmitting: PropTypes.bool,
  error: PropTypes.string,
  disableForm: PropTypes.bool
};

export default VerificationForm;
