import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useRouteMatch } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import cx from 'classnames';
import { Select, MenuItem, FormControl, InputLabel, Paper, TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';

import history from 'base/history';
import { useQuery } from 'hooks/useQuery';
import { FILTERS, filtersActions } from 'storages/filters/actions';
import { extendQueryString } from 'utils/url';
import { debounce } from 'utils';
import FormSearch from 'components/Forms/FormSearch';

import styles from './Filters.module.scss';

export const ALL_OPTIONS = {
  i18nkey: 'filters.showAll',
  label: 'Pokaż wszystkie',
  value: ''
};

const extractDefaultFilterQuery = (filters = []) =>
  filters.reduce((obj, el) => {
    const { name, defaultValue } = el;
    const isDefaultValue = Object.keys(el).includes('defaultValue');
    const selected = isDefaultValue ? defaultValue : '';
    const convertedValue = selected === ALL_OPTIONS.value ? null : selected;
    return { ...obj, [name]: convertedValue };
  }, {});

const Filters = ({ filters, dynamicFilters, withSearch, children }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { url } = useRouteMatch();
  const { page, ...query } = useQuery();
  const [currentQuery, setCurrentQuery] = useState(() => ({ ...extractDefaultFilterQuery(filters), ...query, page }));

  useEffect(() => {
    const extendedQuery = extendQueryString(url, currentQuery);
    history.replace(extendedQuery);
  }, [url, currentQuery]);

  const setCurrentQueryAndOmitPage = ({ page, ...rest }) => setCurrentQuery(rest);

  const handleChange = ({ target: { name, value } }) => {
    // It's workaround for not displaying fields in query string if there is default value
    const convertedValue = value === ALL_OPTIONS.value ? null : value;
    setCurrentQueryAndOmitPage({ ...currentQuery, [name]: convertedValue });
  };

  const reduxFilters = useSelector(state =>
    Object.values(FILTERS).reduce((acc, v) => ({ ...acc, [v]: state.filters[v].data?.results || [] }), {})
  );

  const searchForAutocomplete = actionName => (_, newValue) => {
    dispatch(filtersActions[actionName](newValue));
  };

  const applyAutocompleteFilters = filterName => (_, newFilters) => {
    setCurrentQueryAndOmitPage({ ...currentQuery, [filterName]: newFilters.map(f => f.name) });
  };

  return (
    <Paper className={styles.wrapper}>
      {withSearch && (
        <FormSearch
          name="search"
          defaultValue={query.search}
          onChange={debounce(handleChange, 300)}
          label={t('fields.search')}
        />
      )}

      {dynamicFilters?.map(({ filterName, actionName, label, i18nkey }) => (
        <Autocomplete
          key={actionName}
          multiple
          onChange={applyAutocompleteFilters(filterName)}
          onInputChange={debounce(searchForAutocomplete(actionName), 200)}
          options={reduxFilters[actionName]}
          renderOption={option => option.label || option.name}
          getOptionLabel={option => option.name}
          getOptionSelected={(option, val) => option.name === val.name}
          noOptionsText={t('common.noResults')}
          renderInput={params => <TextField {...params} label={t(i18nkey) || label} />}
        />
      ))}

      {filters?.map(el => {
        const { name, label, i18nkey, options } = el;
        const isDefaultValue = Object.keys(el).includes('defaultValue');

        return (
          <FormControl key={name}>
            <InputLabel className={styles.inputLabel} id={name} shrink={isDefaultValue}>
              {t(i18nkey) || label}
            </InputLabel>
            <Select
              labelId={name}
              name={name}
              value={query[name] || ALL_OPTIONS.value}
              onChange={handleChange}
              displayEmpty={isDefaultValue}
              className={cx(query[name] && styles.defaultValue)}
            >
              {options.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {t(option.i18nkey) || option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        );
      })}
      {children}
    </Paper>
  );
};

Filters.propTypes = {
  filters: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      label: PropTypes.string,
      defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]),
      options: PropTypes.arrayOf(
        PropTypes.shape({
          i18nkey: PropTypes.string,
          label: PropTypes.string,
          value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool])
        })
      )
    })
  ),
  dynamicFilters: PropTypes.arrayOf(
    PropTypes.shape({
      actionName: PropTypes.string,
      filterName: PropTypes.string,
      label: PropTypes.string
    })
  ),
  withSearch: PropTypes.bool,
  children: PropTypes.element
};

export default Filters;
