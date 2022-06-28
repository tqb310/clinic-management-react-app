import React, {memo} from 'react';
import {Typography, Box, IconButton} from '@mui/material';
import {CustomPaper} from '_components/shared/StyledComponent';
import {Dot} from '_components/shared/StyledComponent';
import {StatusPaper} from '_components/shared/StyledComponent';
import PaperImg from '_assets/images/paper.png';
import {ArrowDownward} from '@mui/icons-material';
import './index.scss';
// import PropTypes from 'prop-types'
const statusArray = [
    {status: 'error', text: 'Qua lượt'},
    {status: 'primary', text: 'Đang chờ'},
    {status: 'success', text: 'Đang khám'},
];
function QueueListItem({
    orderNumber,
    name,
    gender,
    dob,
    status,
}) {
    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                py: 1,
                userSelect: 'none',
            }}
        >
            <Typography
                variant="h6"
                sx={{
                    width: '60px',
                    color: 'primary.main',
                }}
            >
                {orderNumber ? '# 26' : ''}
            </Typography>
            <Box sx={{flex: 1}}>
                <Typography variant="h6">
                    {name || ''}
                </Typography>
                <Typography color="#888" fontWeight={400}>
                    {gender || ''} <Dot />{' '}
                    <Typography
                        component="span"
                        fontWeight={400}
                    >
                        {dob || ''}
                    </Typography>
                </Typography>
            </Box>
            <StatusPaper
                status={statusArray[status].status}
            >
                {statusArray[status].text}
            </StatusPaper>
        </Box>
    );
}
function QueueSummary({data}) {
    return (
        <CustomPaper className="queue-summary">
            <Typography
                variant="h5"
                className="queue-summary__title"
            >
                Hàng đợi
            </Typography>
            <Box sx={{mt: 1}}>
                {data.length ? (
                    data.map(item => (
                        <QueueListItem
                            orderNumber={
                                item.numerical_order
                            }
                            name={
                                item.last_name +
                                ' ' +
                                item.first_name
                            }
                            gender={
                                item.gender ? 'Nam' : 'Nữ'
                            }
                            dob={item.dob}
                            status={item.status}
                        />
                    ))
                ) : (
                    <img
                        src={PaperImg}
                        alt="empty logo"
                        width={136}
                        style={{
                            margin: '60px auto 0',
                            display: 'block',
                            opacity: 0.4,
                        }}
                    />
                )}
            </Box>
            <Box className="queue-summary__more">
                <IconButton>
                    <ArrowDownward />
                </IconButton>
            </Box>
        </CustomPaper>
    );
}

QueueSummary.propTypes = {};

export default memo(QueueSummary);
