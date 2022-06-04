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
    id,
    patientName,
    phone,
    timeStamp,
    gender,
    date,
    time,
    approvalAction,
    cancelAction,
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
                    variant="outlined"
                    sx={{
                        textTransform: 'capitalize',
                        borderRadius: '20px',
                        minWidth: '100px',
                    }}
                    onClick={approvalAction(id)}
                >
                    Chi tiết
                </Button>
                <Button
                    color="error"
                    variant="contained"
                    sx={{
                        textTransform: 'capitalize',
                        borderRadius: '20px',
                        minWidth: '100px',
                    }}
                    onClick={cancelAction(id)}
                >
                    Hủy
                </Button>
            </div>
        </div>
    );
}

RequestItem.propTypes = {};

export default memo(RequestItem);
