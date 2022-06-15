import React, {memo} from 'react';
import {TextField, Grid} from '@mui/material';
import './index.scss';
// import {dateParse} from '_constants/date';
// import {CustomPaper} from '_components/shared/StyledComponent';
// import PropTypes from 'prop-types'

const textFieldStyle = {
    '& .MuiInputBase-input': {
        fontSize: '1.6rem',
    },
    '& .MuiInputLabel-root': {
        fontSize: '1.6rem',
    },
    width: '100%',
};
function PatientInfo({
    first_name,
    last_name,
    dob,
    phone,
    identity_number,
    occupation,
    ward,
    district,
    province,
    note,
    gender,
}) {
    // console.log(data);
    return (
        <Grid
            container
            spacing={2}
            className="ECPatientInfo"
        >
            <Grid
                item
                xs={4}
                className="ECPatientInfo__name"
            >
                <TextField
                    variant="filled"
                    label="Tên bệnh nhân"
                    value={
                        last_name && first_name
                            ? `${last_name} ${first_name}`
                            : ''
                    }
                    size="small"
                    sx={textFieldStyle}
                />
            </Grid>
            <Grid
                item
                xs={3}
                className="ECPatientInfo__birthdate"
            >
                <TextField
                    variant="filled"
                    label="Ngày sinh"
                    value={dob || ''}
                    size="small"
                    sx={textFieldStyle}
                />
            </Grid>
            <Grid
                item
                xs={2}
                className="ECPatientInfo__age"
            >
                <TextField
                    variant="filled"
                    label="Tuổi"
                    value={
                        dob
                            ? new Date().getFullYear() -
                              dob.split('/').slice(-1)
                            : ''
                    }
                    size="small"
                    sx={textFieldStyle}
                />
            </Grid>
            <Grid
                item
                xs={3}
                className="ECPatientInfo__gender"
            >
                <TextField
                    variant="filled"
                    label="Giới tính"
                    value={gender || ''}
                    size="small"
                    sx={textFieldStyle}
                />
            </Grid>
            <Grid
                item
                xs={4}
                className="ECPatientInfo__phone"
            >
                <TextField
                    variant="filled"
                    label="Điện thoại"
                    value={phone || ''}
                    size="small"
                    sx={textFieldStyle}
                />
            </Grid>
            <Grid
                item
                xs={3}
                className="ECPatientInfo__idcard"
            >
                <TextField
                    variant="filled"
                    label="CMND/CCCD"
                    value={identity_number || ''}
                    size="small"
                    sx={textFieldStyle}
                />
            </Grid>
            <Grid
                item
                xs={5}
                className="ECPatientInfo__job"
            >
                <TextField
                    variant="filled"
                    label="Nghề nghiệp"
                    value={occupation || ''}
                    size="small"
                    sx={textFieldStyle}
                />
            </Grid>
            <Grid
                item
                xs={12}
                className="ECPatientInfo__address"
            >
                <TextField
                    multiline
                    rows={2}
                    variant="filled"
                    label="Địa chỉ"
                    value={
                        province && district
                            ? `${ward} - ${district} - ${province}`
                            : ''
                    }
                    size="small"
                    sx={textFieldStyle}
                />
            </Grid>
            <Grid
                item
                xs={12}
                className="ECPatientInfo__note"
            >
                <TextField
                    multiline
                    rows={2}
                    variant="filled"
                    label="Ghi chú"
                    value={note || ''}
                    size="small"
                    sx={textFieldStyle}
                />
            </Grid>
        </Grid>
    );
}

PatientInfo.propTypes = {};

export default memo(PatientInfo);
