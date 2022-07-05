import React, {memo, useEffect, useState} from 'react';
import CardContainer from './_components/CardContainer';
import QueueSummary from './_components/QueueSummary';
import Appointment from './_components/Appointment';
import {RightBar} from '_components/shared/StyledComponent';
import {Grid, Typography} from '@mui/material';
import Doctor from '_assets/images/doctor2.png';
import {useSelector, useDispatch} from 'react-redux';
import {
    setDataByDateAsync as setAppointmentData,
    setDataNumberAsync as setAppointmentNumber,
} from '_redux/slice/appointmentSlice';
import {setDataNumberAsync as setPatientNumber} from '_redux/slice/patientSlice';
import {setDataAsync as setQueueData} from '_redux/slice/queueSlice';
import {
    setRevenueDataAsync,
    setVisitsEachMonthAsync,
} from '_redux/slice/invoiceSlice';
import {CustomPaper} from '_components/shared/StyledComponent';
import {useFirestoreRealtime} from '_hooks';
import {Bar} from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import './index.scss';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
);

const barLabels = [
    'Thg 1',
    'Thg 2',
    'Thg 3',
    'Thg 4',
    'Thg 5',
    'Thg 6',
    'Thg 7',
    'Thg 8',
    'Thg 9',
    'Thg 10',
    'Thg 11',
    'Thg 12',
];

const options = {
    responsive: true,
    plugins: {},
};
const barData = {
    labels: barLabels,
    datasets: [
        {
            label: 'Số lượt khám trong năm nay',
            backgroundColor: '#6b9eff',
        },
    ],
};

function Dashboard(props) {
    // console.log(props);
    const [barActualData, setBarActualData] =
        useState(barData);
    const dispatch = useDispatch();
    const name = useSelector(
        state => state.user.current.name,
    );
    const todayAppointments = useSelector(
        state => state.appointments.data,
    );
    const appointmentNumber = useSelector(
        state => state.appointments.number,
    );
    const loadingAppointment = useSelector(
        state => state.appointments.isLoading,
    );
    const loadingQueue = useSelector(
        state => state.queues.isLoading,
    );
    const nextPatient = useSelector(
        state => state.appointments.nextPatient,
    );
    const patientNumber = useSelector(
        state => state.patients.number,
    );
    const revenueData = useSelector(
        state => state.invoices.revenue,
    );
    const visitsEachMonth = useSelector(
        state => state.invoices.visitsEachMonth,
    );
    const queue = useSelector(state => state.queues.data);

    const appointmentFirestoreRealtime =
        useFirestoreRealtime({
            collectionName: 'appointments',
            eventHandler: () => {
                dispatch(setAppointmentData());
            },
        });
    const queueFirestoreRealtime = useFirestoreRealtime({
        collectionName: 'queue',
        eventHandler: () => {
            dispatch(setQueueData());
        },
    });
    const invoiceFirestoreRealtime = useFirestoreRealtime({
        collectionName: 'invoices',
        eventHandler: () => {
            dispatch(setVisitsEachMonthAsync());
        },
    });
    useEffect(() => {
        dispatch(setRevenueDataAsync());
        dispatch(setPatientNumber());
        dispatch(setAppointmentNumber());
        const unsub1 = appointmentFirestoreRealtime();
        const unsub2 = queueFirestoreRealtime();
        const unsub3 = invoiceFirestoreRealtime();
        return () => {
            unsub1();
            unsub2();
            unsub3();
        };
    }, []);

    useEffect(() => {
        setBarActualData(pre => ({
            ...pre,
            datasets: [
                {...pre.datasets[0], data: visitsEachMonth},
            ],
        }));
    }, [visitsEachMonth]);

    return (
        <div className="dashboard">
            <Typography
                variant="h5"
                color="primary"
                className="dashboard__title"
                sx={{mb: 2}}
            >
                Xin chào,{' '}
                <Typography
                    variant="h5"
                    color="secondary"
                    component="span"
                >
                    {name}
                </Typography>
            </Typography>
            <div className="dashboard-section">
                <CardContainer
                    patientNumber={patientNumber}
                    appointmentNumber={appointmentNumber}
                    revenueData={revenueData}
                />
            </div>
            <Grid
                container
                spacing={3}
                className="dashboard-section"
            >
                <Grid item lg={8}>
                    <CustomPaper sx={{p: 1}}>
                        <Typography
                            variant="h5"
                            sx={{px: 1, mb: 1}}
                        >
                            Biểu đồ biểu diễn số lượt khám
                            trong năm nay
                        </Typography>
                        <Bar
                            options={options}
                            data={barActualData}
                        />
                    </CustomPaper>
                </Grid>
                <Grid item lg={4}>
                    <QueueSummary
                        data={queue.slice(0, 5)}
                        loading={loadingQueue}
                    />
                </Grid>
            </Grid>
            <div>
                <Appointment
                    todayAppointments={todayAppointments}
                    nextPatient={nextPatient}
                    loading={loadingAppointment}
                />
            </div>
            <RightBar>
                <img
                    src={Doctor}
                    alt="doctor"
                    width={'100%'}
                    height={'100%'}
                    style={{objectFit: 'cover'}}
                />
            </RightBar>
        </div>
    );
}

Dashboard.propTypes = {};

export default memo(Dashboard);
