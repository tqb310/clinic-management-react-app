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
    setPatientHint,
    ...rest
}) {
    const dispatch = useDispatch();

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
    const handleChange = e => {
        field.onChange(e);
        if (
            /PHONE|phone/i.test(field.name) &&
            setPatientHint
        ) {
            if (e.target.value.trim()) {
                dispatch(
                    setPatientHint(e.target.value.trim()),
                );
            } else {
                dispatch(setPatientHint(''));
            }
        }
    };
    const handleClick = e => {
        if (/PHONE|phone/i.test(field.name)) {
            e.stopPropagation();
        }
    };
    return (
        <FormControl
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

Input.propTypes = {};

export default InputField;
