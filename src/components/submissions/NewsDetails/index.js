/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import { Typography, Button, Link, Paper } from '@material-ui/core';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import EditIcon from '@material-ui/icons/Edit';
import SendIcon from '@material-ui/icons/Send';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

import FormTextField from 'components/Forms/FormTextField';
import Alert from 'components/Alert';
import Lightbox from 'components/Lightbox';
import ImageEditor from 'components/ImageEditor';

import styles from './SubmissionDetails.module.scss';

const StaticDetails = ({ text, sensitiveWords, url, comment, onEditStart, canBeEdit }) => {
  const { t } = useTranslation();
  const isSensitive = sensitiveWords?.length > 0;
  return (
    <>
      <Typography variant="h6" component="h2">
        {t('details.userComment')}
      </Typography>
      <Typography className={styles.textWrap} paragraph>
        {comment}
      </Typography>
      <Typography variant="h6" component="h2">
        {t('details.informationContent')}
      </Typography>
      <Typography paragraph={!isSensitive}>{text}</Typography>
      {isSensitive && (
        <Typography variant="body2" className={styles.additionalText} paragraph>
          {t('details.sensitiveWords')} {sensitiveWords.map(keyword => keyword.name).join(', ')}
        </Typography>
      )}
      <Link className={styles.link} href={url} target="_blank" rel="noreferrer noopener">
        <OpenInNewIcon /> {url}
      </Link>

      {canBeEdit && (
        <Button onClick={onEditStart} className={styles.editBtn} variant="outlined" startIcon={<EditIcon />}>
          {t('adminDetails.editSubmission')}
        </Button>
      )}
    </>
  );
};

const fields = {
  comment: 'comment',
  text: 'text',
  url: 'url'
};

const validationSchema = yup.object().shape({
  [fields.comment]: yup.string(),
  [fields.text]: yup.string().max(250),
  [fields.url]: yup
    .string()
    .url()
    .required()
});

const EditableDetails = ({ initialValues, onSubmit, onCancel, isSubmitting, error }) => {
  const { t } = useTranslation();
  return (
    <>
      <Alert showOn={error} className={styles.alert}>
        {error}
      </Alert>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        <Form className={styles.form}>
          <FormTextField className={styles.field} label={t('details.userComment')} name={fields.comment} multiline />
          <FormTextField
            className={styles.field}
            label={t('details.informationContent')}
            name={fields.text}
            multiline
          />
          <FormTextField className={styles.field} label={t('details.sourceLink')} name={fields.url} multiline />

          <div className={styles.actions}>
            <Button className={styles.editBtn} onClick={onCancel}>
              {t('common.cancel')}
            </Button>
            <Button
              type="submit"
              className={styles.editBtn}
              variant="contained"
              color="primary"
              startIcon={<SendIcon />}
              disabled={isSubmitting}
            >
              {t('common.save')}
            </Button>
          </div>
        </Form>
      </Formik>
    </>
  );
};

const NewsDetails = ({ submission, onNewsEdit, onImageEdit, editState }) => {
  const { t } = useTranslation();
  const { screenshot_url: image, url, text, comment, sensitive_keywords: sensitiveWords } = submission;
  const reportedAt = new Date(submission.reported_at).toLocaleString();
  const { editNews } = useSelector(({ admin }) => ({ editNews: admin.edit.news }));
  const [isOpen, setOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [showImageEditor, setShowImageEditor] = useState(false);

  const handleEditStart = () => {
    setIsEditMode(true);
  };

  const wasEdited = editState?.data;
  useEffect(() => {
    if (wasEdited) {
      setIsEditMode(false);
    }
  }, [wasEdited]);

  return (
    <>
      <Paper className={styles.container} variant="outlined">
        {image ? (
          <img
            src={image}
            alt="Zrzut ekranu"
            className={styles.image}
            title="Powiększ zdjęcie"
            onClick={() => setOpen(true)}
          />
        ) : (
          <div className={styles.noImageInfoWrapper}>
            <Typography className={styles.noScreenshotInfo}>{t('adminDetails.noScreenshot')}</Typography>
            {onImageEdit && (
              <Button variant="outlined" size="small" onClick={onImageEdit} startIcon={<CloudUploadIcon />}>
                {t('adminDetails.uploadScreenshot')}
              </Button>
            )}
          </div>
        )}

        {onImageEdit && image && (
          <div className={styles.actions}>
            <Button variant="outlined" size="small" onClick={() => setShowImageEditor(true)} startIcon={<EditIcon />}>
              {t('adminDetails.editImage')}
            </Button>
            <Button variant="outlined" size="small" onClick={onImageEdit} startIcon={<CloudUploadIcon />}>
              {t('adminDetails.uploadNewImage')}
            </Button>
          </div>
        )}

        <Typography variant="body2" className={styles.additionalText} paragraph>
          {t('details.reportedAt')} {reportedAt}
        </Typography>

        {isEditMode ? (
          <EditableDetails
            initialValues={{ text, url, comment }}
            onCancel={() => setIsEditMode(false)}
            onSubmit={onNewsEdit}
            isSubmitting={editNews.isFetching}
            error={editNews.error}
          />
        ) : (
          <StaticDetails
            text={text || '—'}
            url={url}
            sensitiveWords={sensitiveWords}
            comment={comment || '—'}
            canBeEdit={!!onNewsEdit}
            onEditStart={handleEditStart}
          />
        )}
      </Paper>

      <Lightbox isOpen={isOpen} url={image} onClose={() => setOpen(false)} />
      <ImageEditor isOpen={showImageEditor} image={image} onClose={() => setShowImageEditor(false)} />
    </>
  );
};

NewsDetails.propTypes = {
  submission: PropTypes.object,
  onNewsEdit: PropTypes.func,
  onImageEdit: PropTypes.func
};

export default NewsDetails;
