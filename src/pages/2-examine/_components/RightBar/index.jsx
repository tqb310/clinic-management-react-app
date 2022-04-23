import React, {useState, memo} from 'react';
import {RightBar} from '_components/shared/StyledComponent';
import {Button, Typography, Box} from '@mui/material';
import {SwapVert, Alarm} from '@mui/icons-material';
import {Dot} from '_components/shared/StyledComponent';
// import socket from '_services/socket.io';
import './index.scss';
// import PropTypes from 'prop-types'

const QueueItem = ({
    avatar,
    pname,
    pnum,
    cid,
    state,
    current = false,
    start,
    className = '',
}) => {
    return (
        <Box
            className={`queue-list-doctor__item ${className}`}
        >
            <Typography
                variant="h6"
                sx={{
                    width: '60px',
                    color: 'primary.main',
                    textAlign: 'center',
                }}
            >
                # 26
            </Typography>
            <Box className="queue-list-doctor__item-info">
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
                <Typography color="#888" fontWeight={400}>
                    Xếp hàng vào lúc:{' '}
                    <Typography
                        component="span"
                        fontWeight={400}
                    >
                        7:45 <Dot /> 30/03/2022
                    </Typography>
                </Typography>
                {current && (
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            mt: 1,
                        }}
                    >
                        <Typography>
                            <Alarm
                                sx={{
                                    fontSize: '1.8rem',
                                    mr: 1,
                                    verticalAlign: 'middle',
                                }}
                            />
                            <Typography
                                variant="h5"
                                component="span"
                                sx={{
                                    verticalAlign: 'top',
                                }}
                            >
                                15:00
                            </Typography>
                        </Typography>
                        <Button
                            sx={{
                                textTransform: 'capitalize',
                                py: 0.25,
                            }}
                            variant="outlined"
                        >
                            Bắt đầu
                        </Button>
                    </Box>
                )}
            </Box>
        </Box>
    );
};

function RightBarContent({
    queue,
    continuous,
    handleContinuous,
    start,
}) {
    const [selected, setSelected] = useState(1);
    // console.log(queue);
    const createAvatar = name => {
        return name
            .split(' ')
            .map(data => data[0])
            .join('');
    };
    return (
        <RightBar className="RBDoctorHome">
            <Typography
                variant="h5"
                fontWeight={700}
                gutterBottom
            >
                Hàng đợi
            </Typography>
            <QueueItem
                avatar={createAvatar('Truong Bao')}
                pname="Truong Quoc Bao"
                cid={12345}
                pnum={12345}
                current
                start={() => {}}
            />

            <Button
                onClick={() => handleContinuous(true)}
                variant="outlined"
                startIcon={<SwapVert />}
                sx={{my: 2}}
            >
                Tiếp tục
            </Button>
            <div className="RBDoctorHome__queueTab">
                <div
                    className={`RBDoctorHome__queueTab-item
                        ${selected === 1 ? 'active' : ''}
                    `}
                >
                    Đang chờ <span>(20)</span>
                </div>
                <div
                    className={`RBDoctorHome__queueTab-item
                    ${selected === 2 ? 'active' : ''}
                `}
                >
                    Qua lượt <span>(20)</span>
                </div>
            </div>
            <div className="RBDoctorHome__queueList">
                <QueueItem
                    avatar={createAvatar('Truong Bao')}
                    pname="Truong Yen Lan"
                    cid={1234}
                    pnum={12}
                />
            </div>
        </RightBar>
    );
}

RightBarContent.propTypes = {};

export default memo(RightBarContent);
