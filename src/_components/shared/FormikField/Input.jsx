import React from 'react';
import {
    FormControl,
    FormHelperText,
    InputLabel,
    InputAdornment,
    Input,
    OutlinedInput,
} from '@mui/material';
import {useDispatch} from 'react-redux';
import {setPatientHint} from '_redux/slice/queueSlice';
// import { ErrorMessage } from "formik";
// import PropTypes from 'prop-types'

function InputField({
    form,
    field,
    label,
    required,
    left,
    icon: Icon,
    variant = 'standard',
    autoComplete,
    ...rest
}) {
    const dispatch = useDispatch();
    const isError = form.errors[field.name];
    const handleChange = e => {
        field.onChange(e);
        if (field.name === 'PATIENT_PHONE') {
            if (e.target.value.trim()) {
                dispatch(
                    setPatientHint(e.target.value.trim()),
                );
            } else {
                dispatch(
                    setPatientHint(e.target.value.trim()),
                );
            }
        }
    };
    const handleClick = e => {
        if (field.name === 'PATIENT_PHONE') {
            e.stopPropagation();
        }
    };
    return (
        <FormControl
            size="small"
            fullWidth
            error={isError}
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
                    // top: '4%',
                    // left: left || '-6.5%',
                    '& .MuiFormLabel-asterisk': {
                        color: 'red',
                    },
                }}
            >
                {label}
            </InputLabel>
            <OutlinedInput
                {...field}
                label={label}
                sx={{fontSize: 15}}
                {...rest}
                onChange={handleChange}
                onClick={handleClick}
                autoComplete={autoComplete}
                endAdornment={
                    Icon && (
                        <InputAdornment position="end">
                            {typeof Icon === 'object' ? (
                                <Icon
                                    sx={{
                                        fontSize: '1.8rem',
                                    }}
                                />
                            ) : (
                                Icon
                            )}
                        </InputAdornment>
                    )
                }
            />
            {isError ? (
                <FormHelperText sx={{marginTop: 0}}>
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
