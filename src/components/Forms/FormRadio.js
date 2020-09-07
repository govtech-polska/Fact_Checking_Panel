import React from 'react';
import PropTypes from 'prop-types';
import { useField } from 'formik';
import { FormHelperText, RadioGroup, FormLabel, Radio, FormControl, FormControlLabel } from '@material-ui/core';
import { useFieldError } from 'hooks/useFieldError';

const FormRadio = ({ className, label, options, disabled, ...props }) => {
  const [field, meta] = useField(props);
  const { hasError, error } = useFieldError({ meta, disabled });

  return (
    <FormControl error={hasError} component="fieldset" className={className}>
      <FormLabel component="legend">{label}</FormLabel>
      <RadioGroup aria-label={label} {...field}>
        {options.map(({ label, value, ...rest }) => (
          <FormControlLabel
            key={value}
            value={value}
            control={<Radio />}
            label={label}
            disabled={disabled}
            {...rest}
            {...props}
          />
        ))}
      </RadioGroup>
      {hasError && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
};

FormRadio.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string,
      disabled: PropTypes.bool
    })
  ).isRequired,
  className: PropTypes.string,
  label: PropTypes.string,
  disabled: PropTypes.bool
};

export default FormRadio;
