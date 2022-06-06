import React, {memo} from 'react';
import {TextField} from '@mui/material';
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
        <div className="ECPatientInfo">
            <div className="ECPatientInfo__name col-1-5">
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
            </div>
            <div className="ECPatientInfo__birthdate col-5-8">
                <TextField
                    variant="filled"
                    label="Ngày sinh"
                    value={dob || ''}
                    size="small"
                    sx={textFieldStyle}
                />
            </div>
            <div className="ECPatientInfo__age col-8-10">
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
            </div>
            <div className="ECPatientInfo__gender col-10-13">
                <TextField
                    variant="filled"
                    label="Giới tính"
                    value={gender || ''}
                    size="small"
                    sx={textFieldStyle}
                />
            </div>
            <div className="ECPatientInfo__phone col-1-5">
                <TextField
                    variant="filled"
                    label="Điện thoại"
                    value={phone || ''}
                    size="small"
                    sx={textFieldStyle}
                />
            </div>
            <div className="ECPatientInfo__idcard col-5-8">
                <TextField
                    variant="filled"
                    label="CMND/CCCD"
                    value={identity_number || ''}
                    size="small"
                    sx={textFieldStyle}
                />
            </div>
            <div className="ECPatientInfo__job col-8-13">
                <TextField
                    variant="filled"
                    label="Nghề nghiệp"
                    value={occupation || ''}
                    size="small"
                    sx={textFieldStyle}
                />
            </div>
            <div className="ECPatientInfo__address col-1-13">
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
            </div>
            <div className="ECPatientInfo__note col-1-13">
                <TextField
                    multiline
                    rows={2}
                    variant="filled"
                    label="Ghi chú"
                    value={note || ''}
                    size="small"
                    sx={textFieldStyle}
                />
            </div>
        </div>
    );
}

PatientInfo.propTypes = {};

export default memo(PatientInfo);
