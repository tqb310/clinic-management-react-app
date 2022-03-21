import React, {memo} from 'react';
import {Typography, Stack} from '@mui/material';
import {CustomPaper} from '_components/shared/StyledComponent';
import ListItem from '_components/shared/ListItem';
import Doctor1 from '_assets/images/doctor1.png';
import Doctor2 from '_assets/images/doctor2.png';
import Doctor3 from '_assets/images/doctor3.jpg';
import Doctor4 from '_assets/images/doctor4.png';
import './index.scss';
// import PropTypes from 'prop-types'

function RoomState(props) {
    return (
        <CustomPaper className="RoomState">
            <Typography
                variant="h5"
                className="RoomState__title"
            >
                Bác sĩ
            </Typography>
            <Stack
                justifyContent="space-between"
                spacing={1}
                mt={1}
            >
                <ListItem
                    avatar={Doctor1}
                    title="BS. Quốc Bảo"
                    subtitle="Phòng khám 1"
                    statusText="Đang hoạt động"
                    statusCode={1}
                />
                <ListItem
                    avatar={Doctor2}
                    title="BS. Yến Nhi"
                    subtitle="Phòng khám 2"
                    statusText="Ngừng hoạt động"
                    statusCode={0}
                />
                <ListItem
                    avatar={Doctor3}
                    title="BS. Thiên Long"
                    subtitle="Phòng khám 3"
                    statusText="Ngừng hoạt động"
                    statusCode={0}
                />
                <ListItem
                    avatar={Doctor4}
                    title="BS. Ngọc Hạnh"
                    subtitle="Phòng khám 4"
                    statusText="Ngừng hoạt động"
                    statusCode={0}
                />
            </Stack>
        </CustomPaper>
    );
}

RoomState.propTypes = {};

export default memo(RoomState);
