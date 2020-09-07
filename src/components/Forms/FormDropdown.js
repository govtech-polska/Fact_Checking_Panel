import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import cx from 'classnames';
import { useField } from 'formik';
import { TextField, MenuItem } from '@material-ui/core';
import { useFieldError } from 'hooks/useFieldError';

const FormDropdown = ({ className, errorClassName, label, options = [], ...props }) => {
  const { t } = useTranslation();
  const [field, meta] = useField(props);
  const { hasError, error } = useFieldError({ meta });
  const classes = hasError ? cx(className, errorClassName) : className;
  const isEmptyValue = !!options.find(option => option.value === '');

  return (
    <TextField
      {...field}
      className={classes}
      error={hasError}
      helperText={hasError && error}
      label={label}
      select
      InputLabelProps={{ shrink: isEmptyValue || undefined }}
      SelectProps={{
        displayEmpty: isEmptyValue
      }}
    >
      {options.map(option => (
        <MenuItem key={option.value} value={option.value}>
          {option.i18nkey ? t(option.i18nkey) : option.label}
        </MenuItem>
      ))}
    </TextField>
  );
};

FormDropdown.propTypes = {
  className: PropTypes.string,
  errorClassName: PropTypes.string,
  label: PropTypes.string,
  options: PropTypes.array.isRequired
};

export default FormDropdown;
