import React, {useEffect, memo, useState} from 'react';
import {Typography} from '@mui/material';
import RequestItem from './_components/RequestItem';
import {Scrollbars} from 'react-custom-scrollbars-2';
import {useDispatch, useSelector} from 'react-redux';
import {setDataAsync} from '_redux/slice/appointmentRequestSlice';
import {
    formatDate,
    getCreatedTime,
} from '_helpers/handleDate';
import {dayLength} from '_constants/date';
import PaperImage from '_assets/images/paper.png';
// import ConfirmRequest from '../ConfirmRequest';
import './index.scss';

const tabsName = [
    {
        id: 0,
        title: 'Mới',
        status: 0,
        thresholdTime: dayLength,
        tag: 'Lastest',
    },
    {
        id: 1,
        title: 'Vừa duyệt',
        status: 1,
        thresholdTime: dayLength,
        tag: 'JustApproved',
    },
    {
        id: 2,
        title: 'Chưa duyệt',
        status: 0,
        thresholdTime: Number.POSITIVE_INFINITY,
        tag: 'NotApproved',
    },
];

const numberOfRequestList = {
    Lastest: 0,
    JustApproved: 0,
    NotApproved: 0,
};

function AppointmentDemand() {
    // const [data, setData] = useState([]);
    // const [open, setOpen] = useState(false);
    // const handleClose = () => {
    //     setOpen(false);
    // };
    const dispatch = useDispatch();

    const [tabIndex, setTabIndex] = useState(0);
    const [requestList, setRequestList] = useState([]);
    const [numberState, setNumberState] = useState(
        numberOfRequestList,
    );

    const requestState = useSelector(
        state => state.appointmentRequests,
    );
    useEffect(() => {
        dispatch(setDataAsync());
    }, []);

    useEffect(() => {
        const tempList = requestState.data.filter(
            item =>
                item.status === tabsName[tabIndex].status &&
                getCreatedTime(
                    new Date(
                        formatDate(
                            item.create_at_date,
                            item.create_at_time,
                        ),
                    ),
                    new Date(),
                ).ms < tabsName[tabIndex].thresholdTime,
        );
        setRequestList(tempList);
    }, [requestState.data, tabIndex]);

    useEffect(() => {
        //Computing number
        const tempNumberState = requestState.data.reduce(
            (result, item) => {
                const difference = getCreatedTime(
                    new Date(
                        formatDate(
                            item.create_at_date,
                            item.create_at_time,
                        ),
                    ),
                    new Date(),
                ).ms;

                if (item.status === 0) {
                    if (difference < dayLength)
                        result.Lastest++;
                    else result.NotApproved++;
                } else {
                    if (difference < dayLength)
                        result.JustApproved++;
                }

                return result;
            },
            numberState,
        );
        setNumberState(tempNumberState);
    }, [requestState.data]);

    const handleSwitchTab = idx => _ => {
        setTabIndex(idx);
    };
    return (
        <div className="appointment-demand">
            <Typography
                variant="h5"
                className="appointment-demand__title"
            >
                Yêu cầu đặt lịch hẹn
            </Typography>
            <div className="appointment-demand__tab">
                {tabsName.map(item => (
                    <div
                        onClick={handleSwitchTab(item.id)}
                        className={`appointment-demand__tab-item ${
                            tabIndex === item.id
                                ? 'active'
                                : ''
                        }`}
                    >
                        {item.title} (
                        {numberState[item.tag]})
                    </div>
                ))}
            </div>
            <Scrollbars
                style={{width: '100%', height: '85%'}}
                autoHide={true}
            >
                {requestList.length ? (
                    requestList.map(item => (
                        <RequestItem
                            key={item.id}
                            patientName={
                                item.last_name +
                                ' ' +
                                item.first_name
                            }
                            phone={item.phone}
                            timeStamp={
                                getCreatedTime(
                                    new Date(
                                        formatDate(
                                            item.create_at_date,
                                            item.create_at_time,
                                        ),
                                    ),
                                    new Date(Date.now()),
                                ).text
                            }
                            gender={item.gender}
                            date={item.date}
                            time={item.time}
                        />
                    ))
                ) : (
                    <img
                        src={PaperImage}
                        alt="empty logo"
                        width={256}
                        style={{
                            marginTop: '60px',
                            opacity: 0.5,
                        }}
                    />
                )}
            </Scrollbars>
        </div>
    );
}

export default memo(AppointmentDemand);
