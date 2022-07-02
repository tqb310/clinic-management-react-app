import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';

export const DatePickerField = ({
    form,
    field,
    label,
    required,
    minDate,
    ...rest
}) => {
    const handleDateChange = newValue => {
        const event = {
            target: {
                name: field.name,
                value: newValue,
            },
        };
        field.onChange(event);
    };

    const keyArr = field.name.split('.');
    let error = form.errors[keyArr[0]];
    for (const key of keyArr.slice(-keyArr.length + 1)) {
        if (error && error[key]) error = error[key];
        else {
            error = '';
            break;
        }
    }
    let touched = form.touched[keyArr[0]];
    for (const key of keyArr.slice(-keyArr.length + 1)) {
        if (touched && touched[key]) touched = touched[key];
        else {
            touched = false;
            break;
        }
    }

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
                inputFormat="dd/MM/yyyy"
                label={label}
                size="small"
                value={field.value}
                onChange={handleDateChange}
                format="DD-MM-YYYY"
                minDate={minDate || null}
                renderInput={params => {
                    console.log(params);
                    params.error = error && touched;
                    return (
                        <TextField
                            sx={{
                                '& .MuiFormLabel-asterisk':
                                    {color: 'red'},
                            }}
                            size="small"
                            fullWidth
                            variant="outlined"
                            required={required}
                            helperText={
                                params.error ? error : ''
                            }
                            {...field}
                            {...params}
                            {...rest}
                        />
                    );
                }}
            />
            {!error && <div>&nbsp;</div>}
        </LocalizationProvider>
    );
};
