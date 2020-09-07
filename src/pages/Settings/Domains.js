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

const Domains = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { domains, add, remove } = useSelector(({ admin }) => ({
    domains: admin.domains.list,
    add: admin.domains.add,
    remove: admin.domains.remove
  }));

  useEffect(() => {
    dispatch(adminActions.domains.list());
  }, [dispatch]);

  const handleSubmit = (values, { resetForm }) => {
    dispatch(adminActions.domains.add(values, resetForm));
  };

  const handleDelete = id => () => {
    dispatch(adminActions.domains.remove(id));
  };

  return (
    <Paper className={styles.keywordsWrapper}>
      <Typography variant="h6" component="h2">
        {t('settings.domains.title')}
      </Typography>
      <Typography variant="body2" paragraph>
        {t('settings.domains.info')}
      </Typography>

      <Alert showOn={add.error} withMargin withClose>
        {add.error}
      </Alert>
      <Alert showOn={remove.error} withMargin withClose>
        {remove.error}
      </Alert>

      <Suspense waitFor={domains}>
        <ul className={styles.keywordsList}>
          {domains.data?.results?.map(word => (
            <li key={word.id}>
              <Chip label={word.name} onDelete={handleDelete(word.id)} />
            </li>
          ))}
        </ul>
      </Suspense>

      <Formik onSubmit={handleSubmit} initialValues={initialValues} validationSchema={validationSchema}>
        <Form className={styles.keywordsForm}>
          <FormTextField label={t('settings.domains.inputLabel')} name={fields.tag} />
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

export default Domains;
