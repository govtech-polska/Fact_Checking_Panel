import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import { Button, Typography, Paper, Chip } from '@material-ui/core';

import { adminActions } from 'storages/admin/actions';
import FormTextField from 'components/Forms/FormTextField';
import Alert from 'components/Alert';
import Suspense from 'components/Suspense';

import styles from './Settings.module.scss';

const fields = {
  tag: 'name'
};

const initialValues = {
  [fields.tag]: ''
};

const validationSchema = yup.object().shape({
  [fields.tag]: yup.string().required()
});

const Hashtags = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { hashtags, add, remove } = useSelector(({ admin }) => ({
    hashtags: admin.hashtags.list,
    add: admin.hashtags.add,
    remove: admin.hashtags.remove
  }));

  useEffect(() => {
    dispatch(adminActions.hashtags.list());
  }, [dispatch]);

  const handleSubmit = ({ name }, { resetForm }) => {
    const newTag = name.replace('#', '');
    dispatch(adminActions.hashtags.add({ name: newTag }, resetForm));
  };

  const handleDelete = id => () => {
    dispatch(adminActions.hashtags.remove(id));
  };

  return (
    <Paper className={styles.keywordsWrapper}>
      <Typography variant="h6" component="h2">
        {t('settings.tags.title')}
      </Typography>
      <Typography variant="body2" paragraph>
        {t('settings.tags.info')}
      </Typography>

      <Alert showOn={add.error} withMargin withClose>
        {add.error}
      </Alert>
      <Alert showOn={remove.error} withMargin withClose>
        {remove.error}
      </Alert>

      <Suspense waitFor={hashtags}>
        <ul className={styles.keywordsList}>
          {hashtags.data?.results?.map(word => (
            <li key={word.id}>
              <Chip label={word.name} onDelete={handleDelete(word.id)} />
            </li>
          ))}
        </ul>
      </Suspense>

      <Formik onSubmit={handleSubmit} initialValues={initialValues} validationSchema={validationSchema}>
        <Form className={styles.keywordsForm}>
          <FormTextField label={t('settings.tags.inputLabel')} name={fields.tag} />
          <Button
            className={styles.addBtn}
            type="submit"
            color="primary"
            variant="contained"
            size="small"
            disabled={add.isFetching}
          >
            {t('settings.addBtn')}
          </Button>
        </Form>
      </Formik>
    </Paper>
  );
};

export default Hashtags;
