import React, {memo} from 'react';
import CardContainer from './_components/CardContainer';
import BarChart from '_components/shared/BarChart';
import RoomState from './_components/RoomState';
import Appointment from './_components/Appointment';
import {RightBar} from '_components/shared/StyledComponent';
import {Grid, Typography} from '@mui/material';
// import VisitChart from "./_components/VisitChart";
// import authentication from "_services/authentication.service";
// import { Scrollbars } from "react-custom-scrollbars-2";
// import {RightBar} from '_components/shared/StyledComponent/RightBar';
// import PropTypes from 'prop-types';
import './index.scss';

const data = [
    {key: 'Thg 1', value: 50},
    {key: 'Thg 2', value: 70},
    {key: 'Thg 3', value: 82},
    {key: 'Thg 4', value: 90},
    {key: 'Thg 5', value: 35},
    {key: 'Thg 6', value: 40},
    {key: 'Thg 7', value: 150},
    {key: 'Thg 8', value: 200},
    {key: 'Thg 9', value: 250},
    {key: 'Thg 10', value: 420},
    {key: 'Thg 11', value: 111},
    {key: 'Thg 12', value: 99},
];

function Dashboard(props) {
    // console.log(props);
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
                    {/* {authentication.getCurrentUser()?.payload.employee_name} */}
                    Trương Quốc Bảo
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
                    <BarChart
                        title="Số lượng trung bình bệnh nhân đến khám"
                        height={250}
                        yAxis={[0, 50, 100, 150, 200, 250]}
                        data={data}
                        widthItem={38}
                    />
                </Grid>
                <Grid item lg={4}>
                    <RoomState />
                </Grid>
            </Grid>
            <div>
                <Appointment />
            </div>
            <RightBar
                sx={{
                    backgroundColor: theme =>
                        theme.palette.primary.main,
                }}
            >
                <div>Hoạt động gần đây</div>
                {/* <div>Bệnh nhân</div> */}
            </RightBar>
        </div>
    );
}

Dashboard.propTypes = {};

export default memo(Dashboard);
