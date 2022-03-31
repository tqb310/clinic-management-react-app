import React from 'react';
import {EventAvailable} from '@mui/icons-material';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {CustomPaper} from '_components/shared/StyledComponent';
import './index.scss';
import {Typography} from '@mui/material';
import HumanBody from '_assets/images/human-body.png';
// import {dateParse} from '_constants/date';
// import PropTypes from 'prop-types'

function CheckupInfo({createAt, type, doctor, status}) {
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
                    <span>80</span>Nhịp tim (nhịp/ phút)
                </li>
                <li className="checkup-info__item">
                    <span>120</span>Huyết áp (mmHg)
                </li>
                <li className="checkup-info__item">
                    <span>90</span>Nhịp thở (nhịp/ phút)
                </li>
                <li className="checkup-info__item">
                    <span>37.5</span>Nhiệt độ (&#176;C)
                </li>
                <li className="checkup-info__item">
                    <span>170</span>Chiều cao (cm)
                </li>
                <li className="checkup-info__item">
                    <span>65</span>Cân nặng (kg)
                </li>
            </ul>
            <img src={HumanBody} alt="cơ thể" width={136} />
        </CustomPaper>
    );
}

CheckupInfo.propTypes = {};

export default CheckupInfo;
