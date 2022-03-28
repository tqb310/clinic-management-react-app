import React, {memo} from 'react';
import {
    DateRangeOutlined,
    AccessTimeOutlined,
} from '@mui/icons-material';
import {Avatar, Button} from '@mui/material';
import MalePatient from '_assets/images/male-patient.png';
import FemalePatient from '_assets/images/female-patient.png';
import './index.scss';
// import PropTypes from 'prop-types'

function RequestItem({
    patientName,
    phone,
    timeStamp,
    gender,
    date,
    time,
}) {
    return (
        <div className="appointment-demand__item">
            <div className="appointment-demand__item-info">
                <Avatar
                    src={
                        gender ? MalePatient : FemalePatient
                    }
                    sx={{width: 40, height: 40, mr: 2}}
                    variant="circular"
                />
                <div>
                    <p className="appointment-demand__item-info-name">
                        {patientName}
                    </p>
                    <p className="appointment-demand__item-info-phone">
                        {phone}
                    </p>
                </div>
                <div className="appointment-demand__item-info-timestamp">
                    {timeStamp}
                </div>
            </div>
            <div className="appointment-demand__item-datetime">
                <div className="appointment-demand__item-date">
                    <DateRangeOutlined
                        sx={{
                            fontSize: '1.45rem',
                            verticalAlign: 'text-top',
                        }}
                    />
                    <span>{date}</span>
                </div>
                <div className="appointment-demand__item-time">
                    <AccessTimeOutlined
                        sx={{
                            fontSize: '1.45rem',
                            verticalAlign: 'text-top',
                        }}
                    />
                    <span>{time}</span>
                </div>
            </div>
            <div className="appointment-demand__item-actions">
                <Button
                    color="error"
                    sx={{
                        textTransform: 'capitalize',
                        borderRadius: '20px',
                        mr: 8,
                        minWidth: '100px',
                    }}
                >
                    Hủy
                </Button>
                <Button
                    // color="info"
                    variant="outlined"
                    sx={{
                        textTransform: 'capitalize',
                        borderRadius: '20px',
                        minWidth: '100px',
                    }}
                >
                    Chi tiết
                </Button>
            </div>
        </div>
    );
}

RequestItem.propTypes = {};

export default memo(RequestItem);
