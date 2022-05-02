import React from 'react';
// import {Box} from '@mui/material';
import {CustomPaper} from '_components/shared/StyledComponent';
import {QueueList, AddForm} from './_components';
import Doctor from '_assets/images/doctor2.png';
import {RightBar} from '_components/shared/StyledComponent';
import LocationProvider from '_contexts/LocationContext';
import {useDispatch} from 'react-redux';
import {setDataAsync} from '_redux/slice/patientSlice';
import './index.scss';
// import PropTypes from 'prop-types';

function Queue(props) {
    const dispatch = useDispatch();
    const handleSubmit = values => {
        console.log(values);
    };
    dispatch(setDataAsync());
    return (
        <>
            <CustomPaper className="queue-container">
                <QueueList />
                <LocationProvider>
                    <AddForm handleSubmit={handleSubmit} />
                </LocationProvider>
            </CustomPaper>
            <RightBar>
                <img
                    src={Doctor}
                    alt="doctor"
                    width={400}
                />
            </RightBar>
        </>
    );
}

Queue.propTypes = {};

export default Queue;
