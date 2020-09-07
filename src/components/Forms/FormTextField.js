import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { useField } from 'formik';
import { TextField } from '@material-ui/core';
import { useFieldError } from 'hooks/useFieldError';

const FormTextField = ({ label, errorClassName, className, type, disabled, helperText, ...props }) => {
  const [field, meta] = useField(props);
  const { hasError, error } = useFieldError({ meta, disabled });

  const classes = hasError ? cx(className, errorClassName) : className;

  return (
    <TextField
      {...field}
      {...props}
      className={classes}
      error={hasError}
      helperText={hasError ? error : helperText}
      label={label}
      type={type}
      disabled={disabled}
    />
  );
};

FormTextField.defaultProps = {
  type: 'text'
};

FormTextField.propTypes = {
  label: PropTypes.string,
  errorClassName: PropTypes.string,
  className: PropTypes.string,
  rows: PropTypes.number,
  multiline: PropTypes.bool,
  disabled: PropTypes.bool,
  helperText: PropTypes.string,
  type: PropTypes.any
};

export default FormTextField;
