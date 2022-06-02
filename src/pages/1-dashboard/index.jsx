import React, {memo, useEffect} from 'react';
import CardContainer from './_components/CardContainer';
import BarChart from '_components/shared/BarChart';
import RoomState from './_components/RoomState';
import Appointment from './_components/Appointment';
import {RightBar} from '_components/shared/StyledComponent';
import {Grid, Typography} from '@mui/material';
import Doctor from '_assets/images/doctor2.png';
import {useSelector, useDispatch} from 'react-redux';
import {setDataByDateAsync} from '_redux/slice/appointmentSlice';
import {useFirestoreRealtime} from '_hooks';
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
    const dispatch = useDispatch();
    const name = useSelector(
        state => state.user.current.name,
    );
    const todayAppointments = useSelector(
        state => state.appointments.data,
    );
    const firestoreRealtime = useFirestoreRealtime({
        collectionName: 'appointments',
        eventHandler: () => {
            dispatch(setDataByDateAsync());
        },
    });
    useEffect(() => {
        // dispatch(setPatients());
        // dispatch(setInvoices());
        const unsub = firestoreRealtime();
        return unsub;
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
                    <BarChart
                        title="Số lượt khám trong năm nay"
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
