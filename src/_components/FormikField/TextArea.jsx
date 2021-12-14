import React from "react";
import {
  FormControl,  
  FormHelperText,
  InputLabel,
  InputAdornment,
  Input
} from "@mui/material";
// import { ErrorMessage } from "formik";
// import PropTypes from 'prop-types'

function TextArea({ form, field, label, required, icon: Icon, ...rest }) {
  // console.log(field);
  const isError = form.errors[field.name];
  return (
    <FormControl
      // style={{ margin: "0.1rem 0" }}
      size="small"
      fullWidth
      error={isError}
      required={required}
      sx={{
        "& label+.MuiInputBase-root": { marginTop: "8px !important" },        
      }}
    >
      <InputLabel sx={{fontSize: 14, top: '4%', left: '-2%'}}>{label}</InputLabel>
      <Input        
        {...field}
        {...rest}
        label={label}
        sx={{ fontSize: 15 }}
        multiline
        endAdornment={
          Icon && (
            <InputAdornment position="end">
              <Icon />
            </InputAdornment>
          )
        }
      />
      {isError ? (
        <FormHelperText sx={{ marginTop: 0 }}>
          {form.errors[field.name]}
        </FormHelperText>
      ) : (
        <div>&nbsp;</div>
      )}
    </FormControl>
  );
}

Input.propTypes = {};

export default TextArea;
