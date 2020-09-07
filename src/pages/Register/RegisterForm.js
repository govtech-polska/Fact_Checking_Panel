import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import { Button } from '@material-ui/core';

import FormDropdown from 'components/Forms/FormDropdown';
import FormCheckbox from 'components/Forms/FormCheckbox';
import FormTextField from 'components/Forms/FormTextField';
import { yupCreatePassword } from 'utils/validation';
import { specializationOptions } from 'consts';

import styles from './Register.module.scss';

const fields = {
  name: 'name',
  email: 'email',
  password: 'password',
  repeatPassword: 'password2',
  agreement: 'agreement',
  specialization: 'specialization'
};

const initialValues = {
  [fields.name]: '',
  [fields.password]: '',
  [fields.repeatPassword]: '',
  [fields.agreement]: false,
  [fields.specialization]: ''
};

const validationSchema = yup.object().shape({
  [fields.name]: yup.string().required(),
  [fields.password]: yupCreatePassword,
  [fields.repeatPassword]: yup
    .string()
    .required()
    .oneOf([yup.ref(fields.password)], 'validations.passwordRepeat'),
  [fields.specialization]: yup.string().required(),
  [fields.agreement]: yup.bool().oneOf([true], 'validations.registerAgreement')
});

const RegisterForm = ({ email, onSubmit, isSubmitting }) => {
  const { t } = useTranslation();

  return (
    <Formik
      initialValues={{ ...initialValues, [fields.email]: email }}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      <Form className={styles.form}>
        <FormTextField
          className={styles.field}
          name={fields.email}
          type="text"
          label={t('fields.email')}
          InputProps={{ readOnly: true, disableUnderline: true }}
        />
        <FormTextField className={styles.field} name={fields.name} type="text" label={t('fields.nameAndSurname')} />
        <FormTextField className={styles.field} name={fields.password} type="password" label={t('fields.password')} />
        <FormTextField
          className={styles.field}
          name={fields.repeatPassword}
          type="password"
          label={t('fields.repeatPassword')}
        />
        <FormDropdown
          className={styles.field}
          name={fields.specialization}
          label={t('fields.specialization')}
          options={specializationOptions}
        />
        <FormCheckbox
          className={styles.field}
          name={fields.agreement}
          label={t('register.agreement')}
          labelClassName={styles.checkbox}
        />
        <Button className={styles.button} type="submit" variant="contained" color="secondary" disabled={isSubmitting}>
          {t('register.sendBtn')}
        </Button>
      </Form>
    </Formik>
  );
};

RegisterForm.propTypes = {
  email: PropTypes.string.isRequired,
  onSubmit: PropTypes.func,
  isSubmitting: PropTypes.bool
};

export default RegisterForm;
