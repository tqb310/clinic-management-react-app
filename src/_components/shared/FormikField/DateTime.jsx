import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";

export const Date = ({ form, field, label, required, ...rest }) => {
  const isError = form.errors[field.name];

  const handleDateChange = (newValue) => {
    const event = {
      target: {
        name: field.name,
        value: newValue,
      },
    };
    field.onChange(event);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker     
        inputFormat="dd/MM/yyyy" 
        label={label}
        size="small"
        value={field.value}
        onChange={handleDateChange}
        format="DD-MM-YYYY"
        renderInput={(params) => {
          // console.log(params);
          params.error = isError;
          return (
            <TextField
              sx={{
                "& label+.MuiInputBase-root": { marginTop: "8px !important" },
                "& label": {top: '-15%', fontSize: 14},
                "& .MuiFormLabel-asterisk": { color: "red" },
              }}
              size="small"
              variant="standard"
              required={required}
              helperText={isError ? "Chua nhap" : ""}
              {...params}
              {...rest}
            />
          );
        }}
      />
      {!isError && <div>&nbsp;</div>}
    </LocalizationProvider>
  );
};
