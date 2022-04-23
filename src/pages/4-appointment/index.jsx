import React, {memo} from 'react';
import Infomation from './_components/Infomation';
import AppointmentTable from './_components/AppointmentTable';
import AppointmentDemand from './_components/AppointmentDemand';
import BarChart from '_components/shared/BarChart';
import {Grid, Typography} from '@mui/material';
import {CustomPaper} from '_components/shared/StyledComponent';
import {Pie} from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from 'chart.js';
import {RightBar} from '_components/shared/StyledComponent';
import appointmentData from '_constants/FakeData/AppointmentList';
import './index.scss';

ChartJS.register(ArcElement, Tooltip, Legend);
const data = [
        {key: 'Hai', value: 9},
        {key: 'Ba', value: 12},
        {key: 'Tư', value: 4},
        {key: 'Năm', value: 7},
        {key: 'Sáu', value: 11},
        {key: 'Bảy', value: 21},
        {key: 'CN', value: 17},
    ],
    data2 = {
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
    return (
        <Grid
            container
            spacing={3}
            className="appointment-container"
        >
            <Grid item lg={5}>
                <Infomation />
                <BarChart
                    title="Số lượng lịch hẹn trong tuần"
                    height={250}
                    yAxis={[0, 5, 10, 15, 20]}
                    data={data}
                    widthItem={33}
                    marginBottom="20px"
                />
                <CustomPaper sx={{padding: '1rem 2rem'}}>
                    <Typography variant="h5" gutterBottom>
                        Tỉ lệ số lượng cuộc hẹn mỗi khung
                        giờ
                    </Typography>
                    <Pie data={data2} />
                </CustomPaper>
            </Grid>
            <Grid item lg={7}>
                <AppointmentTable data={appointmentData} />
            </Grid>
            <RightBar>
                <AppointmentDemand />
            </RightBar>
        </Grid>
    );
}

Appointment.propTypes = {};

export default memo(Appointment);
