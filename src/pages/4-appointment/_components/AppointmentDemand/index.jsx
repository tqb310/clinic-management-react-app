import React, {useEffect, memo, useState} from 'react';
import {Typography} from '@mui/material';
import RequestItem from './_components/RequestItem';
import {Scrollbars} from 'react-custom-scrollbars-2';
import {useDispatch, useSelector} from 'react-redux';
import {
    setDataAsync,
    setSelectedRequest,
} from '_redux/slice/appointmentRequestSlice';
import {
    formatDate,
    getCreatedTime,
} from '_helpers/handleDate';
// import {dayLength} from '_constants/date';
import PaperImage from '_assets/images/paper.png';
import {useFirestoreRealtime} from '_hooks';
import ConfirmRequest from '../ConfirmRequest';
import LocationProvider from '_contexts/LocationContext';
import {appointmentModel, patientModel} from '_models';
import appointmentService from '_services/firebase/appointment.service';
import appointmentRequestService from '_services/firebase/appointment-request.service';
import getDateTimeComparator from '_helpers/getDateTimeComparator';
import {CardSkeleton} from '_components/shared/SkeletonLoading';
import './index.scss';

const tabsName = [
    {
        id: 0,
        title: 'Chưa duyệt',
        status: 0,
        tag: 'NotApproved',
    },
    {
        id: 1,
        title: 'Vừa duyệt',
        status: 1,
        tag: 'JustApproved',
    },
];

function AppointmentDemand() {
    const dispatch = useDispatch();

    const [tabIndex, setTabIndex] = useState(0);
    const [requestList, setRequestList] = useState([]);
    const [numberState, setNumberState] = useState({});

    const requestState = useSelector(
        state => state.appointmentRequests,
    );

    const firestoreRealtime = useFirestoreRealtime({
        collectionName: 'appointment-requests',
        eventHandler: () => {
            dispatch(setDataAsync());
        },
    });

    const handleSubmit = async (values, actions) => {
        try {
            //
            values.patient.province =
                requestState.selectedRequest.province || '';
            values.patient.district =
                requestState.selectedRequest.district || '';
            values.patient.ward =
                requestState.selectedRequest.ward || '';
            const payload = {
                patient: patientModel(values.patient),
                appointment: appointmentModel(
                    values.appointment,
                ),
            };
            payload.appointment.create_at = formatDate(
                new Date().toLocaleDateString(),
                '',
                'm/d/y',
                true,
            );
            await appointmentService.addAppointment(
                payload,
            );
            await appointmentRequestService.updateAppointmentRequest(
                requestState.selectedRequest.id,
                {status: 1},
            );
            closeModal();
        } catch (error) {
            console.log(error);
        }
    };
    const closeModal = () => {
        dispatch(setSelectedRequest());
    };
    const approvalAction = id => e => {
        dispatch(setSelectedRequest(id));
    };
    const cancelAction = id => e => {
        try {
            appointmentRequestService.deleteAppointmentRequest(
                id,
            );
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        // dispatch(setDataAsync());
        const unsub = firestoreRealtime();
        return unsub;
    }, []);

    useEffect(() => {
        //To compute the request list for each state
        const filteredRequestList =
            requestState.data.filter(item => {
                return (
                    item.status ===
                    tabsName[tabIndex].status
                );
            });
        const sortedRequestList = filteredRequestList.sort(
            (item1, item2) =>
                -getDateTimeComparator(
                    formatDate(
                        item1.create_at_date,
                        item1.create_at_time,
                    ),
                    formatDate(
                        item2.create_at_date,
                        item2.create_at_time,
                    ),
                ),
        );
        setRequestList(sortedRequestList);
    }, [requestState.data, tabIndex]);

    useEffect(() => {
        //To compute the number of requests for each state
        const tempNumberState = requestState.data.reduce(
            (result, item) => {
                if (!item.status) {
                    result.NotApproved++;
                } else {
                    result.JustApproved++;
                }
                return result;
            },
            {
                JustApproved: 0,
                NotApproved: 0,
            },
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
            {requestState.isLoading ? (
                Array.from(new Array(3), (_, index) => (
                    <CardSkeleton
                        key={index}
                        sx={{mx: 2, mt: 3}}
                    />
                ))
            ) : (
                <Scrollbars
                    style={{width: '100%', height: '85%'}}
                    autoHide={true}
                >
                    {requestList.length ? (
                        requestList.map(item => (
                            <RequestItem
                                key={item.id}
                                id={item.id}
                                patientName={
                                    item.last_name +
                                    ' ' +
                                    item.first_name
                                }
                                phone={item.phone}
                                timeStamp={getCreatedTime(
                                    new Date(
                                        formatDate(
                                            item.create_at_date,
                                            item.create_at_time,
                                        ),
                                    ),
                                    new Date(Date.now()),
                                ).toString()}
                                gender={item.gender}
                                date={item.date}
                                time={item.time}
                                approvalAction={
                                    approvalAction
                                }
                                cancelAction={cancelAction}
                                isApproved={
                                    tabsName[tabIndex]
                                        .status === 1
                                }
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
            )}
            <LocationProvider>
                <ConfirmRequest
                    title="Duyệt yêu cầu đặt lịch hẹn"
                    open={requestState.isOpenConfirmForm}
                    handleClose={closeModal}
                    data={requestState.selectedRequest}
                    handleSubmit={handleSubmit}
                    submitLabel="Duyệt"
                />
            </LocationProvider>
        </div>
    );
}

export default memo(AppointmentDemand);
