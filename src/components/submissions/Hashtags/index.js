import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { debounce } from 'utils';

import { Button, Paper, TextField, CircularProgress } from '@material-ui/core';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import { submissionsActions } from 'storages/submissions/actions';
import { adminActions } from 'storages/admin/actions';

import styles from './Hashtags.module.scss';

const filter = createFilterOptions();

const Hashtags = ({ onSave, defaultValue, isAdmin }) => {
  const { t } = useTranslation();
  const [value, setValue] = useState(defaultValue);

  const dispatch = useDispatch();
  const { hashtags, isSearching } = useSelector(({ submissions, admin }) => ({
    hashtags: submissions.hashtags.search.data?.results || admin.hashtags.list.data?.results || [],
    isSearching: submissions.hashtags.search.isFetching || admin.hashtags.list.isFetching
  }));

  useEffect(() => {
    if (defaultValue?.length > 0) {
      setValue(defaultValue);
    }
  }, [defaultValue]);

  useEffect(() => {
    if (isAdmin) {
      dispatch(adminActions.hashtags.list());
    } else {
      dispatch(submissionsActions.hashtags.search());
    }
  }, [dispatch, isAdmin]);

  const updateOptions = (_, newValue) => {
    if (isAdmin) {
      dispatch(adminActions.hashtags.list(newValue));
    } else {
      dispatch(submissionsActions.hashtags.search(newValue));
    }
  };

  const handleSave = () => {
    onSave(value.map(val => val.name.toLowerCase()));
  };

  const handleChange = (_, newValue) => {
    setValue(newValue);
  };

  const isMoreThan6 = value.length > 6;
  return (
    <Paper className={styles.wrapper}>
      <Autocomplete
        className={styles.autocomplete}
        multiple
        freeSolo
        value={value}
        onChange={handleChange}
        onInputChange={debounce(updateOptions, 200)}
        options={hashtags}
        filterOptions={(options, params) => {
          const filtered = filter(options, params);
          if (params.inputValue !== '') {
            filtered.push({
              inputValue: params.inputValue,
              name: params.inputValue,
              label: t('tags.add', { tag: params.inputValue })
            });
          }
          return filtered;
        }}
        getOptionLabel={option => {
          if (typeof option === 'string') {
            return option;
          }
          if (option.inputValue) {
            return option.inputValue;
          }
          return option.name;
        }}
        getOptionSelected={(option, val) => option.name === val.name}
        renderOption={option => option.label || option.name}
        renderInput={params => (
          <TextField
            {...params}
            label={t('tags.label')}
            error={isMoreThan6}
            helperText={isMoreThan6 && t('tags.errorSubmission')}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <React.Fragment>
                  {isSearching ? <CircularProgress size={20} /> : null}
                  {params.InputProps.endAdornment}
                </React.Fragment>
              )
            }}
          />
        )}
      />
      <Button variant="contained" color="primary" onClick={handleSave}>
        {t('common.save')}
      </Button>
    </Paper>
  );
};

Hashtags.defaultProps = {
  defaultValue: []
};

Hashtags.propTypes = {
  defaultValue: PropTypes.array,
  onSave: PropTypes.func,
  isAdmin: PropTypes.bool
};

export default Hashtags;
