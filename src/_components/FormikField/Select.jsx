import React from "react";
import {
  FormControl,
  FormHelperText,
  InputLabel,
  //   InputAdornment,
  Select,
  MenuItem,
} from "@mui/material";

export const province = [
  { id: 1, key: "Bình Thuận", value: 1 },
  { id: 2, key: "TP.HCM", value: 2 },
];
export default function SelectField({
  form,
  field,
  label,
  required,
  items,  
  ...rest
}) {
  const isError = form.errors[field.name];
  const handleChange = (e) => {
    field.onChange(e);    
    if(field.name === "ADDRESS.province"){
      form.setFieldValue("ADDRESS.district", "");
      form.setFieldValue("ADDRESS.ward", "");
      form.setFieldValue("ADDRESS.details", "");
    }
    if(field.name === "ADDRESS.district"){
      form.setFieldValue("ADDRESS.ward", "");
      form.setFieldValue("ADDRESS.details", "");
    }
    if(field.name === "ADDRESS.ward"){
      form.setFieldValue("ADDRESS.details", "");
    }
  }
  return (
    <FormControl
      sx={{
        "& .MuiInputBase-root": { marginTop: "8px !important" },
        "& label": { top: "-3%", left: "-6.5%", fontSize: 14 },
      }}
      fullWidth
      required={required}
    >
      <InputLabel
        id="demo-simple-select-label"
        sx={{ "& .MuiFormLabel-asterisk": { color: "red" } }}
      >
        {label}
      </InputLabel>
      <Select
        {...field}
        {...rest}
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        label={label}
        size="small"
        onChange={handleChange}
        variant="standard"
      >
        {items &&
          items.map(({ value, key, id }) => {
            return (
              <MenuItem key={id} value={value}>
                {key}
              </MenuItem>
            );
          })}
      </Select>
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
