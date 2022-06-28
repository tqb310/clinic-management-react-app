import React, {memo, useEffect} from 'react';
import CardContainer from './_components/CardContainer';
import QueueSummary from './_components/QueueSummary';
import Appointment from './_components/Appointment';
import {RightBar} from '_components/shared/StyledComponent';
import {Grid, Typography} from '@mui/material';
import Doctor from '_assets/images/doctor2.png';
import {useSelector, useDispatch} from 'react-redux';
import {setDataByDateAsync as setAppointmentData} from '_redux/slice/appointmentSlice';
import {setDataAsync as setQueueData} from '_redux/slice/queueSlice';
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
            data: barLabels.map(label =>
                Math.trunc(100 - Math.random() * 90),
            ),
            backgroundColor: '#6b9eff',
        },
    ],
};

function Dashboard(props) {
    // console.log(props);
    const dispatch = useDispatch();

    const name = useSelector(
        state => state.user.current.name,
    );
    const todayAppointments = useSelector(
        state => state.appointments.data,
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
    useEffect(() => {
        // dispatch(setPatients());
        // dispatch(setInvoices());
        const unsub1 = appointmentFirestoreRealtime();
        const unsub2 = queueFirestoreRealtime();
        return () => {
            unsub1();
            unsub2();
        };
    }, []);
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
                <CardContainer />
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
                            data={barData}
                        />
                    </CustomPaper>
                </Grid>
                <Grid item lg={4}>
                    <QueueSummary
                        data={queue.slice(0, 5)}
                    />
                </Grid>
            </Grid>
            <div>
                <Appointment
                    todayAppointments={todayAppointments}
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
