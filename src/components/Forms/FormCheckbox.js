import PropTypes from 'prop-types';
import React from 'react';
import { useField } from 'formik';
import { Checkbox, FormHelperText, FormControl, FormControlLabel } from '@material-ui/core';
import { useFieldError } from 'hooks/useFieldError';

const FormCheckbox = ({ className, label, errorClassName, labelClassName, disabled, onChange, ...props }) => {
  const [field, meta] = useField(props);
  const { hasError, error } = useFieldError({ meta, disabled });

  const handleChange = args => {
    field.onChange(args);
    if (onChange) {
      onChange(args.target.checked);
    }
  };

  return (
    <FormControl error={hasError} className={className}>
      <FormControlLabel
        control={<Checkbox {...field} {...props} checked={field.value} disabled={disabled} onChange={handleChange} />}
        label={label}
        classes={{
          label: labelClassName
        }}
      />
      {hasError && <FormHelperText className={errorClassName}>{error}</FormHelperText>}
    </FormControl>
  );
};

FormCheckbox.propTypes = {
  label: PropTypes.string.isRequired,
  className: PropTypes.string,
  errorClassName: PropTypes.string,
  labelClassName: PropTypes.string,
  onChange: PropTypes.func,
  disabled: PropTypes.bool
};

export default FormCheckbox;
