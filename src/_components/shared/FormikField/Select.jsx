import React from 'react';
import {
    FormControl,
    FormHelperText,
    InputLabel,
    //InputAdornment,
    Select,
    MenuItem,
} from '@mui/material';
// import {useLocation} from '_contexts/LocationContext';

// export const province = [
//     {id: 1, key: 'Bình Thuận', value: 1},
//     {id: 2, key: 'TP.HCM', value: 2},
// ];
export default function SelectField({
    form,
    field,
    label,
    required,
    items,
    variant = 'outlined',
    onChangeLocation,
    ...rest
}) {
    // const {onChange} = useLocation();

    const handleChange = e => {
        field.onChange(e);
        if (onChangeLocation) onChangeLocation(e);
        if (field.name === 'ADDRESS.province') {
            form.setFieldValue('ADDRESS.district', '');
            form.setFieldValue('ADDRESS.ward', '');
            form.setFieldValue('ADDRESS.details', '');
        }
        if (field.name === 'ADDRESS.district') {
            form.setFieldValue('ADDRESS.ward', '');
            form.setFieldValue('ADDRESS.details', '');
        }
        if (field.name === 'ADDRESS.ward') {
            form.setFieldValue('ADDRESS.details', '');
        }
        // console.log(e.target.name);
    };

    const keyArr = field.name.split('.');
    let error, touched;
    if (keyArr.length > 1) {
        error = form.errors[keyArr[0]];
        for (const key of keyArr.slice(
            -keyArr.length + 1,
        )) {
            if (error && error[key]) error = error[key];
            else {
                error = '';
                break;
            }
        }
        touched = form.touched[keyArr[0]];
        for (const key of keyArr.slice(
            -keyArr.length + 1,
        )) {
            if (touched && touched[key])
                touched = touched[key];
            else {
                touched = false;
                break;
            }
        }
    } else {
        error = form.errors[field.name];
        touched = form.touched[field.name];
    }

    return (
        <FormControl
            sx={
                {
                    // '& .MuiInputBase-root': {
                    //     marginTop: '6px !important',
                    // },
                }
            }
            fullWidth
            required={required}
            error={error && touched}
            size="small"
        >
            <InputLabel
                id="demo-simple-select-label"
                sx={{
                    '& .MuiFormLabel-asterisk': {
                        color: 'red',
                    },
                }}
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
                variant={variant}
            >
                {items &&
                    items.map(({value, key, id}) => {
                        return (
                            <MenuItem
                                key={id}
                                value={value}
                            >
                                {key}
                            </MenuItem>
                        );
                    })}
            </Select>
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
