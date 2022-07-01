import React, {memo, useState, useEffect} from 'react';
import {Box, Typography} from '@mui/material';
// import {Add, Search} from '@mui/icons-material';
import {Dot} from '_components/shared/StyledComponent';
import {useDispatch} from 'react-redux';
import {
    setDataByStatusAsync,
    setNumberEachStatusAsync,
} from '_redux/slice/queueSlice';
import {onSnapshot, collection} from 'firebase/firestore';
import {db} from '_services/firebase/app';
import PaperImg from '_assets/images/paper.png';
import './index.scss';
// import PropTypes from 'prop-types';

const tabsName = [
    {id: 1, title: 'Đang khám', tag: 'serving', status: 2},
    {id: 2, title: 'Đang chờ', tag: 'waiting', status: 1},
    {id: 3, title: 'Qua lượt', tag: 'missed', status: 0},
];

function QueueListItem({
    className = '',
    name,
    gender,
    dob,
    date,
    time,
    numericalOrder,
}) {
    return (
        <Box className={`queue-list__item ${className}`}>
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
            <Box className="queue-list__item-info">
                <Typography variant="h6">{name}</Typography>
                <Typography color="#888" fontWeight={400}>
                    {gender} <Dot />{' '}
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
            </Box>
        </Box>
    );
}
function QueueList({queueData, numberEachStatus}) {
    const dispatch = useDispatch();
    const [tab, setTab] = useState(1);
    const [status, setStatus] = useState(2);

    const handleTabClick = (status, id) => e => {
        setTab(id);
        setStatus(status);
        dispatch(setDataByStatusAsync(status));
    };
    useEffect(() => {
        const unsub = onSnapshot(
            collection(db, 'queue'),
            () => {
                const eventHandler = async () => {
                    await dispatch(
                        setDataByStatusAsync(status),
                    );
                    await dispatch(
                        setNumberEachStatusAsync(),
                    );
                };
                eventHandler();
            },
        );
        return unsub;
    }, [status]);

    return (
        <Box className="queue-list">
            <Box className="queue-list__tab">
                {tabsName.map(item => (
                    <Box
                        key={item.id}
                        className={`queue-list__tab-item ${
                            tab === item.id ? 'active' : ''
                        }`}
                        onClick={handleTabClick(
                            item.status,
                            item.id,
                        )}
                    >
                        <Typography fontWeight="700">
                            {item.title}
                        </Typography>{' '}
                        ({numberEachStatus?.[item.tag]})
                    </Box>
                ))}
            </Box>
            <Box className="queue-list__actions">
                {/* <Button
                    startIcon={<Search />}
                    variant="contained"
                    sx={{
                        textTransform: 'capitalize',
                        width: '45%',
                        borderRadius: '20px',
                    }}
                >
                    Tìm kiếm
                </Button>
                <Button
                    startIcon={<Add />}
                    variant="contained"
                    sx={{
                        textTransform: 'capitalize',
                        width: '45%',
                        borderRadius: '20px',
                    }}
                >
                    Thêm mới
                </Button> */}
            </Box>
            <Box className="queue-list__content">
                {queueData && queueData.length ? (
                    queueData.map(item => (
                        <QueueListItem
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
                    ))
                ) : (
                    <img
                        src={PaperImg}
                        alt="Khong co du lieu"
                        width={128}
                        style={{
                            display: 'block',
                            margin: 'auto',
                            opacity: 0.2,
                            paddingBottom: '2rem',
                        }}
                    />
                )}
            </Box>
        </Box>
    );
}

QueueList.propTypes = {};

export default memo(QueueList);
