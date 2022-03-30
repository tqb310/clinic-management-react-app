import React, {memo} from 'react';
import PatientInfor from './PatientInfor';
import CardInfor from './CardInfor';
import {CustomPaper} from '_components/shared/StyledComponent';
import {Typography} from '@mui/material';
import './index.scss';
// import PropTypes from 'prop-types';

function RightBarContent({data}) {
    return (
        <div className="patient-rightbar">
            <PatientInfor />

            <CustomPaper className="patient-rightbar__header">
                <Typography
                    variant="h6"
                    component="span"
                    color="#555"
                >
                    Lịch sử khám bệnh
                </Typography>
                <div className="patient-rightbar__id">
                    Xem chi tiết
                </div>
            </CustomPaper>
            <CardInfor />
        </div>
    );
}

RightBarContent.propTypes = {};

export default memo(RightBarContent);
