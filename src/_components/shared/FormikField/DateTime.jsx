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
    const isError = form.errors[field.name];

    const handleDateChange = newValue => {
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
                minDate={minDate || null}
                renderInput={params => {
                    // console.log(params);
                    params.error = isError;
                    return (
                        <TextField
                            sx={{
                                // '& label+.MuiInputBase-root':
                                //     {mt: '6px'},
                                // '& label': {
                                //     top: '6px',
                                // },
                                '& .MuiFormLabel-asterisk':
                                    {color: 'red'},
                            }}
                            size="small"
                            variant="outlined"
                            required={required}
                            helperText={
                                isError ? 'Chua nhap' : ''
                            }
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
