import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { Button, Paper, TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';

import styles from './AdminDetails.module.scss';

const DomainsForm = ({ domains, onUpdate, defaultValue }) => {
  const { t } = useTranslation();
  const [value, setValue] = useState(defaultValue);

  const handleSave = () => {
    onUpdate(value.map(val => val.id));
  };

  const handleChange = (_, newValue) => {
    setValue(newValue);
  };

  return (
    <Paper className={styles.domainsForm}>
      <Autocomplete
        multiple
        className={styles.domainsFormInput}
        onChange={handleChange}
        options={domains}
        noOptionsText={t('categories.noCategory')}
        getOptionLabel={option => option.name}
        getOptionSelected={(option, value) => option.id === value.id}
        value={value}
        renderInput={params => <TextField {...params} label={t('categories.label')} />}
      />
      <Button variant="contained" color="primary" onClick={handleSave}>
        {t('common.save')}
      </Button>
    </Paper>
  );
};

DomainsForm.defaultValue = {
  domains: []
};

DomainsForm.propTypes = {
  domains: PropTypes.array,
  defaultValue: PropTypes.array,
  onUpdate: PropTypes.func
};

export default DomainsForm;
