import React, {memo} from 'react';
import PatientInfor from './PatientInfor';
import CardInfor from './CardInfor';
// import {CustomPaper} from '_components/shared/StyledComponent';
import {Typography} from '@mui/material';
import PaperImage from '_assets/images/paper.png';
import {VisibilityOff} from '@mui/icons-material';
import './index.scss';
// import PropTypes from 'prop-types';

function RightBarContent({data}) {
    return (
        <div className="patient-rightbar">
            {' '}
            {data ? (
                <>
                    {/* <Typography
                        className="patient-rightbar__header"
                        variant="h5"
                    >
                        <Typography
                    variant="h6"
                    component="span"
                    color="#555"
                >
                    Lịch sử khám bệnh
                </Typography>
                        <div className="patient-rightbar__id">
                        Xem nhanh
                        </div>
                    </Typography> */}
                    <PatientInfor data={data} />
                    <CardInfor data={data} />
                </>
            ) : (
                <>
                    <img
                        src={PaperImage}
                        alt="empty logo"
                        width={256}
                        style={{marginTop: '60px'}}
                    />
                    <p style={{marginTop: '100px'}}>
                        {' '}
                        Chọn{' '}
                        <VisibilityOff
                            sx={{
                                fontSize: '1.6rem',
                                mx: '5px',
                                transform:
                                    'translateY(3px)',
                                color: '#555',
                            }}
                        />{' '}
                        để xem nhanh thông tin của bệnh nhân
                    </p>
                </>
            )}
        </div>
    );
}

RightBarContent.propTypes = {};

export default memo(RightBarContent);
