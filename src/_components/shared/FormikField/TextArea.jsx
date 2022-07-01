import React from 'react';
import {
    FormControl,
    FormHelperText,
    InputLabel,
    InputAdornment,
    OutlinedInput,
} from '@mui/material';
// import { ErrorMessage } from "formik";
// import PropTypes from 'prop-types'

function TextArea({
    form,
    field,
    label,
    required,
    icon: Icon,
    ...rest
}) {
    // console.log(field);
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
        <FormControl
            // style={{ margin: "0.1rem 0" }}
            size="small"
            fullWidth
            error={error && touched}
            required={required}
            sx={{
                '& label+.MuiInputBase-root': {
                    // marginTop: '8px !important',
                },
            }}
        >
            <InputLabel
                sx={{
                    fontSize: 14,
                    top: '4%',
                    '& .MuiFormLabel-asterisk': {
                        color: 'red',
                    },
                }}
            >
                {label}
            </InputLabel>
            <OutlinedInput
                {...field}
                {...rest}
                label={label}
                sx={{fontSize: 15}}
                multiline
                endAdornment={
                    Icon && (
                        <InputAdornment position="end">
                            <Icon />
                        </InputAdornment>
                    )
                }
            />
            {error && touched ? (
                <FormHelperText sx={{marginTop: 0}}>
                    {error}
                </FormHelperText>
            ) : (
                <div>&nbsp;</div>
            )}
        </FormControl>
    );
}

TextArea.propTypes = {};

export default TextArea;
