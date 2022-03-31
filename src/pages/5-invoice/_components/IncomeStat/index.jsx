import React, {memo} from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from 'chart.js';
import {Line, Doughnut} from 'react-chartjs-2';
import {Typography, Box} from '@mui/material';
import './index.scss';
// import PropTypes from 'prop-types'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
);

const lineOptions = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
    },
};

const lineLabels = [
    'Tháng 1',
    'Tháng 2',
    'Tháng 3',
    'Tháng 4',
    'Tháng 5',
    'Tháng 6',
    'Tháng 7',
    'Tháng 8',
    'Tháng 9',
    'Tháng 10',
    'Tháng 11',
    'Tháng 12',
];

const lineData = {
    labels: lineLabels,
    datasets: [
        {
            label: 'Doanh thu',
            data: [
                5, 12, 26, 25, 12, 3, 54, 45, 20, 9, 12, 15,
            ],
            borderColor: '#c6d9ff',
            backgroundColor: '#6b9eff',
        },
    ],
};

const douData = {
    labels: ['Doanh thu', 'Chi tiêu'],
    datasets: [
        {
            label: '# of Votes',
            data: [50000, 5000],
            backgroundColor: [
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 99, 132, 0.2)',
            ],
            borderColor: [
                'rgba(54, 162, 235, 1)',
                'rgba(255, 99, 132, 1)',
            ],
            borderWidth: 2,
        },
    ],
};
function IncomeStat({}) {
    return (
        <Box className="income-stat__container">
            <Typography
                variant="h5"
                fontWeight={700}
                mb={1}
            >
                Doanh thu trung bình hàng tháng
            </Typography>
            <Line options={lineOptions} data={lineData} />
            <Typography
                variant="h5"
                fontWeight={700}
                mb={2}
                mt={5}
            >
                Tỉ lệ thu chi tháng này
                <Doughnut data={douData} />
            </Typography>
        </Box>
    );
}

IncomeStat.propTypes = {};

export default memo(IncomeStat);
