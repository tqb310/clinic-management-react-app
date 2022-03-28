import React from 'react';
import {EventAvailable} from '@mui/icons-material';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {CustomPaper} from '_components/shared/StyledComponent';
import './index.scss';
import {Typography} from '@mui/material';
// import {dateParse} from '_constants/date';
// import PropTypes from 'prop-types'

function CardInfor({createAt, type, doctor, status}) {
    return (
        <CustomPaper className="CardInfor">
            <Typography
                variant="h6"
                sx={{gridColumn: '1/3', mb: 2}}
            >
                Lịch sử khám bệnh
            </Typography>
            <p className="title">
                <EventAvailable className="CardInfor__icon" />
                Ngày tạo
            </p>
            <p>28/03/2022</p>
            <p className="title">
                <FontAwesomeIcon
                    icon="stethoscope"
                    className="CardInfor__icon"
                />
                Loại
            </p>
            <p className="link">Khám mới</p>
            <p className="title">
                <FontAwesomeIcon
                    className="CardInfor__icon"
                    icon="user-md"
                />
                Bác sĩ
            </p>
            <p>Trương Quốc Bảo</p>
            <p className="CardInfor__last title">
                <FontAwesomeIcon
                    className="CardInfor__icon"
                    icon="spinner"
                />
                Trạng thái
            </p>
            <p className="CardInfor__last in-process">
                Đã khám
            </p>
        </CustomPaper>
    );
}

CardInfor.propTypes = {};

export default CardInfor;
