import React, {memo} from 'react';
// import {EventAvailable} from '@mui/icons-material';
// import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {CustomPaper} from '_components/shared/StyledComponent';
import './index.scss';
import {Typography} from '@mui/material';
import HumanBody from '_assets/images/human-body.png';
// import {dateParse} from '_constants/date';
// import PropTypes from 'prop-types'

function CheckupInfo({data}) {
    return (
        <CustomPaper className="checkup-info">
            <Typography
                variant="h6"
                sx={{gridColumn: '1/3', mb: 2}}
            >
                Thông tin lâm sàng
            </Typography>
            <ul className="checkup-info__insights">
                <li className="checkup-info__item">
                    <span>{data.heart_rate || 91}</span>Nhịp
                    tim (nhịp/ phút)
                </li>
                <li className="checkup-info__item">
                    <span>{data.blood_pressure || 80}</span>
                    Huyết áp (mmHg)
                </li>
                <li className="checkup-info__item">
                    <span>{data.breathing_rate || 92}</span>
                    Nhịp thở (nhịp/ phút)
                </li>
                <li className="checkup-info__item">
                    <span>{data.temperature || 37}</span>
                    Nhiệt độ (&#176;C)
                </li>
                <li className="checkup-info__item">
                    <span>{data.height}</span>Chiều cao (cm)
                </li>
                <li className="checkup-info__item">
                    <span>{data.weight}</span>Cân nặng (kg)
                </li>
            </ul>
            <img src={HumanBody} alt="cơ thể" width={136} />
        </CustomPaper>
    );
}

CheckupInfo.propTypes = {};

export default memo(CheckupInfo);
