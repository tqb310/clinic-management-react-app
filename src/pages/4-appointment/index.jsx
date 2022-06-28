import React, {memo, useEffect} from 'react';
import Infomation from './_components/Infomation';
import AppointmentTable from './_components/AppointmentTable';
import AppointmentDemand from './_components/AppointmentDemand';
import {Grid, Typography} from '@mui/material';
import {CustomPaper} from '_components/shared/StyledComponent';
import {Pie, Bar} from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
} from 'chart.js';
import {RightBar} from '_components/shared/StyledComponent';
// import appointmentData from '_constants/FakeData/AppointmentList';
import {useDispatch, useSelector} from 'react-redux';
import {setDataAsync} from '_redux/slice/appointmentSlice';
import {useFirestoreRealtime} from '_hooks';
import './index.scss';

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
);

const options = {
    responsive: true,
    plugins: {},
};

const barLabels = [
        'Hai',
        'Ba',
        'Tư',
        'Năm',
        'Sáu',
        'Bảy',
        'CN',
    ],
    barData = {
        labels: barLabels,
        datasets: [
            {
                label: 'Số lượng lịch hẹn trong tuần',
                data: barLabels.map(label =>
                    Math.trunc(100 - Math.random() * 90),
                ),
                backgroundColor: '#6b9eff',
            },
        ],
    },
    pieData = {
        labels: [
            '7h-9h',
            '9h15-11h',
            '13h-15h',
            '15h15-17h',
        ],
        datasets: [
            {
                label: 'Quoc Bao',
                data: [12, 19, 3, 5],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                ],
                borderWidth: 2,
            },
        ],
    };
function Appointment(props) {
    const dispatch = useDispatch();
    const appointmentState = useSelector(
        state => state.appointments,
    );
    const firestoreRealtime = useFirestoreRealtime({
        collectionName: 'appointments',
        eventHandler: () => {
            dispatch(setDataAsync());
        },
    });
    useEffect(() => {
        const unsub = firestoreRealtime();
        return unsub;
    }, []);
    return (
        <Grid
            container
            spacing={3}
            className="appointment-container"
        >
            <Grid item lg={5}>
                <Infomation />
                <CustomPaper sx={{p: 1, mb: 3}}>
                    <Typography
                        variant="h5"
                        sx={{px: 1, mb: 1}}
                    >
                        Số lượng lịch hẹn trong tuần
                    </Typography>
                    <Bar data={barData} options={options} />
                </CustomPaper>
                <CustomPaper sx={{padding: '1rem 2rem'}}>
                    <Typography variant="h5" gutterBottom>
                        Tỉ lệ số lượng cuộc hẹn mỗi khung
                        giờ
                    </Typography>
                    <Pie data={pieData} options={options} />
                </CustomPaper>
            </Grid>
            <Grid item lg={7}>
                <AppointmentTable data={appointmentState} />
            </Grid>
            <RightBar>
                <AppointmentDemand />
            </RightBar>
        </Grid>
    );
}

Appointment.propTypes = {};

export default memo(Appointment);
