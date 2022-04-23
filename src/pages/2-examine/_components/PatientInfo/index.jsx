import React from 'react';
import {TextField} from '@mui/material';
// import {dateParse} from '_constants/date';
import {gender} from '_constants/general';
// import {CustomPaper} from '_components/shared/StyledComponent';
import './index.scss';
// import PropTypes from 'prop-types'

function PatientInfo({data, data1}) {
    // console.log(data);
    return (
        <div className="ECPatientInfo">
            <div className="ECPatientInfo__avatar col-1-3 row-1-3">
                <div className="ECPatientInfo__avatarInner">
                    TB
                </div>
            </div>
            <div className="ECPatientInfo__name col-3-7">
                <TextField
                    variant="filled"
                    label="Tên bệnh nhân"
                    value={data && data.PATIENT_NAME}
                    size="small"
                    sx={{
                        '& .MuiInputBase-input': {},
                        width: '100%',
                    }}
                />
            </div>
            <div className="ECPatientInfo__birthdate col-7-10">
                <TextField
                    variant="filled"
                    label="Ngày sinh"
                    value={data && data.DATE_OF_BIRTH}
                    size="small"
                    sx={{
                        '& .MuiInputBase-input': {},
                        width: '100%',
                    }}
                />
            </div>
            <div className="ECPatientInfo__age col-10-11">
                <TextField
                    variant="filled"
                    label="Tuổi"
                    value="21"
                    size="small"
                    sx={{
                        '& .MuiInputBase-input': {},
                        width: '100%',
                    }}
                />
            </div>
            <div className="ECPatientInfo__gender col-11-13">
                <TextField
                    variant="filled"
                    label="Giới tính"
                    value={gender[data && data.GENDER]}
                    size="small"
                    sx={{
                        '& .MuiInputBase-input': {},
                        width: '100%',
                    }}
                />
            </div>
            <div className="ECPatientInfo__phone col-3-7">
                <TextField
                    variant="filled"
                    label="Điện thoại"
                    value={data && data.PHONE}
                    size="small"
                    sx={{
                        '& .MuiInputBase-input': {},
                        width: '100%',
                    }}
                />
            </div>
            <div className="ECPatientInfo__idcard col-7-10">
                <TextField
                    variant="filled"
                    label="CMND/CCCD"
                    value={data && data.IDENTITY_NUMBER}
                    size="small"
                    sx={{
                        '& .MuiInputBase-input': {},
                        width: '100%',
                    }}
                />
            </div>
            <div className="ECPatientInfo__job col-10-13">
                <TextField
                    variant="filled"
                    label="Nghề nghiệp"
                    value={data && data.OCCUPATION}
                    size="small"
                    sx={{
                        '& .MuiInputBase-input': {},
                        width: '100%',
                    }}
                />
            </div>
            <div className="ECPatientInfo__address col-1-13">
                <TextField
                    multiline
                    rows={2}
                    variant="filled"
                    label="Địa chỉ"
                    value={data && data.ADDRESS}
                    size="small"
                    sx={{
                        '& .MuiInputBase-input': {},
                        width: '100%',
                    }}
                />
            </div>
            <div className="ECPatientInfo__note col-1-13">
                <TextField
                    multiline
                    rows={2}
                    variant="filled"
                    label="Ghi chú"
                    value="ABC"
                    size="small"
                    sx={{
                        '& .MuiInputBase-input': {},
                        width: '100%',
                    }}
                />
            </div>
        </div>
    );
}

PatientInfo.propTypes = {};

export default PatientInfo;
