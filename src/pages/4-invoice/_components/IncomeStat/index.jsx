import React, {memo} from 'react';
import {CustomPaper} from '_components/shared/StyledComponent';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import {Line} from 'react-chartjs-2';
import {Typography, Box} from '@mui/material';
// import faker from 'faker';
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
);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
    },
};

const labels = [
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

export const data = {
    labels,
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
            <Line options={options} data={data} />
        </Box>
    );
}

IncomeStat.propTypes = {};

export default memo(IncomeStat);
