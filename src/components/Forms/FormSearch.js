import PropTypes from 'prop-types';
import React from 'react';
import { FormControl, InputAdornment, IconButton, TextField } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

const FormSearch = ({ className, onChange, ...props }) => (
  <FormControl className={className}>
    <TextField
      className={className}
      onChange={e => {
        e.persist();
        onChange(e);
      }}
      {...props}
      InputProps={{
        ...props.InputProps,
        endAdornment: (
          <InputAdornment>
            <IconButton>
              <SearchIcon />
            </IconButton>
          </InputAdornment>
        )
      }}
    />
  </FormControl>
);

FormSearch.propTypes = {
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
  InputProps: PropTypes.object
};

export default FormSearch;
