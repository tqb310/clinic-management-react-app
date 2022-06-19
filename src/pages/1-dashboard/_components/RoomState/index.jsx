import React, {memo} from 'react';
import {Typography, Box} from '@mui/material';
import {CustomPaper} from '_components/shared/StyledComponent';
import {Dot} from '_components/shared/StyledComponent';
import {StatusPaper} from '_components/shared/StyledComponent';
import './index.scss';
// import PropTypes from 'prop-types'
function QueueListItem() {
    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                py: 1,
            }}
        >
            <Typography
                variant="h6"
                sx={{
                    width: '60px',
                    color: 'primary.main',
                }}
            >
                # 26
            </Typography>
            <Box sx={{flex: 1}}>
                <Typography variant="h6">
                    Truong Thi Lan
                </Typography>
                <Typography color="#888" fontWeight={400}>
                    Nữ <Dot />{' '}
                    <Typography
                        component="span"
                        fontWeight={400}
                    >
                        23/12/1999
                    </Typography>
                </Typography>
            </Box>
            <StatusPaper status="success">
                Đang khám
            </StatusPaper>
        </Box>
    );
}
function RoomState(props) {
    return (
        <CustomPaper className="RoomState">
            <Typography
                variant="h5"
                className="RoomState__title"
            >
                Hàng đợi
            </Typography>
            <Box sx={{mt: 1}}>
                <QueueListItem />
                <QueueListItem />
                <QueueListItem />
            </Box>
        </CustomPaper>
    );
}

RoomState.propTypes = {};

export default memo(RoomState);
