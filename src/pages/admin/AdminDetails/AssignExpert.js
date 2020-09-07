import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { Button, Paper, TextField, Typography } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';

import { adminActions } from 'storages/admin/actions';
import { debounce } from 'utils';

import styles from './AdminDetails.module.scss';

const AssignExpert = ({ onUpdate, defaultValue, error, isUpdatting, verdictExists }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [value, setValue] = useState(defaultValue);
  const { experts, specialists } = useSelector(({ admin }) => ({
    experts: admin.users.experts,
    specialists: admin.users.specialists
  }));

  const list = [...(experts?.data?.results ?? []), ...(specialists?.data?.results ?? [])];

  const handleSave = () => {
    onUpdate(value);
  };

  const handleChange = (_, newValue) => {
    setValue(newValue);
  };

  const handleInputChange = (_, newValue) => {
    dispatch(adminActions.users.experts({ search: newValue, is_active: true }));
    dispatch(adminActions.users.specialists({ search: newValue, is_active: true }));
  };

  if (verdictExists) {
    return (
      <Paper className={styles.assignExpertInfo}>
        <Typography variant="caption" className={styles.assignExpertInfoLabel}>
          Przypisz eksperta
        </Typography>
        <Typography variant="body2">To zgłoszenie posiada już werdykt eksperta.</Typography>
      </Paper>
    );
  }

  return (
    <Paper className={styles.assignExpert}>
      <Autocomplete
        className={styles.domainsFormInput}
        value={value}
        onInputChange={debounce(handleInputChange, 150)}
        onChange={handleChange}
        options={list}
        noOptionsText="Brak wyników. Zacznij wpisywać nazwę lub email eksperta."
        getOptionLabel={option => option.email}
        getOptionSelected={(option, value) => option.id === value.id}
        renderInput={params => <TextField {...params} label="Przypisz eksperta" helperText={error} error={!!error} />}
        renderOption={option => {
          return (
            <div className={styles.assignItem}>
              <div>
                <Typography>{option.name}</Typography>
                <Typography variant="caption">{option.email}</Typography>
              </div>
              {option.domain && <Typography variant="caption">Kategoria: {option.domain.name}</Typography>}
            </div>
          );
        }}
      />
      <Button variant="contained" color="primary" onClick={handleSave} disabled={isUpdatting}>
        {t('common.save')}
      </Button>
    </Paper>
  );
};

AssignExpert.propTypes = {
  defaultValue: PropTypes.object,
  onUpdate: PropTypes.func,
  error: PropTypes.string,
  isUpdatting: PropTypes.bool,
  verdictExists: PropTypes.bool
};

export default AssignExpert;
