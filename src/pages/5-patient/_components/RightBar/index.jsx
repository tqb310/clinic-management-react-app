import React, {memo} from 'react';
import PatientInfor from './PatientInfor';
import CardInfor from './CardInfor';
import {CustomPaper} from '_components/shared/StyledComponent';
import {Typography} from '@mui/material';
import './index.scss';
// import PropTypes from 'prop-types';

function RightBarContent({data}) {
    // const info = data.data
    // console.log(info)
    return (
        <div className="patient-rightbar">
            <CustomPaper className="patient-rightbar__header">
                <Typography
                    variant="h6"
                    component="span"
                    color="#555"
                >
                    Mã bệnh nhân
                </Typography>
                <div className="patient-rightbar__id">
                    #1234
                </div>
            </CustomPaper>
            <div>
                <PatientInfor
                // data={info.diagnostic.PATIENT}
                />
                <CardInfor
                // createAt={info.diagnostic.CREATE_AT}
                // type={'Khám mới'}
                // doctor={
                //     info.diagnostic.DOCTOR.EMPLOYEE_NAME
                // }
                // status={info.status}
                />
            </div>
        </div>
    );
}

RightBarContent.propTypes = {};

export default memo(RightBarContent);
