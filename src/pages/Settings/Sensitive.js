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
  keyword: 'name'
};

const initialValues = {
  [fields.keyword]: ''
};

const validationSchema = yup.object().shape({
  [fields.keyword]: yup.string().required()
});

const Sensitive = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { sensitive, add, remove } = useSelector(({ admin }) => ({
    sensitive: admin.sensitive.list,
    add: admin.sensitive.add,
    remove: admin.sensitive.remove
  }));

  useEffect(() => {
    dispatch(adminActions.sensitive.list());
  }, [dispatch]);

  const handleSubmit = (values, { resetForm }) => {
    dispatch(adminActions.sensitive.add(values, resetForm));
  };

  const handleDelete = id => () => {
    dispatch(adminActions.sensitive.remove(id));
  };

  return (
    <Paper className={styles.keywordsWrapper}>
      <Typography variant="h6" component="h2">
        {t('settings.sensitiveWords.title')}
      </Typography>
      <Typography variant="body2" paragraph>
        {t('settings.sensitiveWords.info')}
      </Typography>

      <Alert showOn={add.error} withMargin withClose>
        {add.error}
      </Alert>
      <Alert showOn={remove.error} withMargin withClose>
        {remove.error}
      </Alert>

      <Suspense waitFor={sensitive}>
        <ul className={styles.keywordsList}>
          {sensitive.data?.results?.map(word => (
            <li key={word.id}>
              <Chip label={word.name} onDelete={handleDelete(word.id)} />
            </li>
          ))}
        </ul>
      </Suspense>

      <Formik onSubmit={handleSubmit} initialValues={initialValues} validationSchema={validationSchema}>
        <Form className={styles.keywordsForm}>
          <FormTextField label={t('settings.sensitiveWords.inputLabel')} name={fields.keyword} />
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

export default Sensitive;
