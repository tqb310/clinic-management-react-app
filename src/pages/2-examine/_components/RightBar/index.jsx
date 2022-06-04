import React, {useState, memo, useEffect} from 'react';
import {RightBar} from '_components/shared/StyledComponent';
import {Button, Typography, Box} from '@mui/material';
import {SwapVert, Alarm} from '@mui/icons-material';
import {Dot} from '_components/shared/StyledComponent';
// import socket from '_services/socket.io';
import './index.scss';
// import PropTypes from 'prop-types'

const QueueItem = ({
    name,
    gender,
    dob,
    date,
    time,
    numericalOrder,
    className = '',
    status,
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
                # {numericalOrder}
            </Typography>
            <Box className="queue-list-doctor__item-info">
                <Typography variant="h6">{name}</Typography>
                <Typography color="#888" fontWeight={400}>
                    {gender ? 'Nam' : 'Nữ'} <Dot />{' '}
                    <Typography
                        component="span"
                        fontWeight={400}
                    >
                        {dob}
                    </Typography>
                </Typography>
                <Typography color="#888" fontWeight={400}>
                    Xếp hàng vào lúc:{' '}
                    <Typography
                        component="span"
                        fontWeight={400}
                    >
                        {time} <Dot /> {date}
                    </Typography>
                </Typography>
                {status === 2 && (
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
                                10:00
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

function RightBarContent({queue, numberEachStatus}) {
    const [selected, setSelected] = useState(1);
    const [filterdQueue, setFilterdQueue] = useState([]);
    const [activePatient, setActivePatient] =
        useState(null);

    useEffect(() => {
        const tempQueue = queue.filter(
            item => item.status === selected,
        );
        setFilterdQueue(tempQueue);
    }, [selected, queue]);

    useEffect(() => {
        const temQueue = queue.find(
            item => item.status === 2,
        );
        setActivePatient(temQueue);
    }, [queue]);

    return (
        <RightBar className="RBDoctorHome" pt={2}>
            <Typography
                variant="h5"
                fontWeight={700}
                gutterBottom
            >
                Hàng đợi
            </Typography>
            {activePatient ? (
                <QueueItem
                    name={activePatient.name}
                    gender={activePatient.gender}
                    dob={activePatient.dob}
                    date={activePatient.date}
                    time={activePatient.time}
                    numericalOrder={
                        activePatient.numericalOrder
                    }
                    className=""
                    status={activePatient.status}
                />
            ) : (
                <Typography
                    variant="h6"
                    fontWeight={700}
                    gutterBottom
                >
                    Chưa có bệnh nhân
                </Typography>
            )}
            <Button
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
                    onClick={setSelected.bind(null, 1)}
                >
                    Đang chờ{' '}
                    <span>
                        ({numberEachStatus.waiting})
                    </span>
                </div>
                <div
                    className={`RBDoctorHome__queueTab-item
                    ${selected === 0 ? 'active' : ''}
                    `}
                    onClick={setSelected.bind(null, 0)}
                >
                    Qua lượt{' '}
                    <span>({numberEachStatus.missed})</span>
                </div>
            </div>
            <div className="RBDoctorHome__queueList">
                {filterdQueue &&
                    filterdQueue.length > 0 &&
                    filterdQueue.map(item => (
                        <QueueItem
                            key={item.id}
                            name={
                                item.last_name +
                                ' ' +
                                item.first_name
                            }
                            gender={
                                item.gender ? 'Nam' : 'Nữ'
                            }
                            dob={item.dob}
                            time={item.time}
                            date={item.date}
                            numericalOrder={
                                item.numerical_order
                            }
                        />
                    ))}
            </div>
        </RightBar>
    );
}

RightBarContent.propTypes = {};

export default memo(RightBarContent);
