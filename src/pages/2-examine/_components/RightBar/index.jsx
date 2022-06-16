import React, {useState, memo, useEffect} from 'react';
import {RightBar} from '_components/shared/StyledComponent';
import {Button, Typography, Box} from '@mui/material';
import {SwapVert} from '@mui/icons-material';
import {Dot} from '_components/shared/StyledComponent';
import {setCardDataAsync} from '_redux/slice/queueSlice';
import {useDispatch} from 'react-redux';
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
            </Box>
        </Box>
    );
};

function RightBarContent({
    queue,
    numberEachStatus,
    selectedCard,
}) {
    const dispatch = useDispatch();
    const [selected, setSelected] = useState(1);
    const [filterdQueue, setFilterdQueue] = useState([]);

    useEffect(() => {
        const tempQueue = queue.filter(
            item => item.status === selected,
        );
        setFilterdQueue(tempQueue);
    }, [selected, queue]);

    const goToNextPatient = () => {
        dispatch(setCardDataAsync());
    };

    return (
        <RightBar className="RBDoctorHome" pt={2}>
            <Typography
                variant="h5"
                fontWeight={700}
                gutterBottom
            >
                Hàng đợi
            </Typography>
            {selectedCard ? (
                <QueueItem
                    name={`${selectedCard.last_name} ${selectedCard.first_name}`}
                    gender={selectedCard.gender}
                    dob={selectedCard.dob}
                    date={selectedCard.date}
                    time={selectedCard.time}
                    numericalOrder={
                        selectedCard.numerical_order
                    }
                    className=""
                    status={selectedCard.status}
                />
            ) : (
                <Typography
                    variant="h6"
                    sx={{fontWeight: 700, py: 2}}
                    gutterBottom
                >
                    Không có bệnh nhân đang khám
                </Typography>
            )}
            <Button
                variant="outlined"
                startIcon={<SwapVert />}
                sx={{my: 2}}
                onClick={goToNextPatient}
                disabled={
                    !queue.filter(item => item.status === 1)
                        .length
                }
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
                            gender={item.gender}
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
