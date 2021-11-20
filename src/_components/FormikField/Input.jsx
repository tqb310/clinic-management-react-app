import React from "react";
import {
  FormControl,
  FormHelperText,
  InputLabel,
  InputAdornment,
  Input,
} from "@mui/material";
// import { ErrorMessage } from "formik";
// import PropTypes from 'prop-types'

function InputField({ form, field, label, required, icon: Icon, ...rest }) {
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
      <InputLabel
        sx={{
          fontSize: 14,
          top: "4%",
          left: "-6.5%",
          "& .MuiFormLabel-asterisk": { color: "red" },
        }}
      >
        {label}
      </InputLabel>
      <Input
        {...field}
        label={label}
        sx={{ fontSize: 15 }}
        {...rest}
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

export default InputField;
