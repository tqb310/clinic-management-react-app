import React, {useState, useEffect} from 'react';
import ExamineCard from './_components/ExamineCard';
import RightBarContent from './_components/RightBar';
import {data as fakeData} from '_constants/FakeData/Diagnostic';
import {useSelector, useDispatch} from 'react-redux';
import {
    setDataAsync,
    setNumberEachStatusAsync,
} from '_redux/slice/queueSlice';
import {useFirestoreRealtime} from '_hooks';
import './index.scss';
// import PropTypes from 'prop-types'

function Dashboard(props) {
    const dispatch = useDispatch();

    const queueData = useSelector(
        state => state.queues.data,
    );
    const numberEachStatus = useSelector(
        state => state.queues.numberEachStatus,
    );
    const selectedCard = useSelector(
        state => state.queues.selectCard,
    );

    const firestoreReadltime = useFirestoreRealtime({
        collectionName: 'queue',
        eventHandler: async () => {
            await dispatch(setDataAsync());
            await dispatch(setNumberEachStatusAsync());
        },
    });

    useEffect(() => {
        const unsub = firestoreReadltime();
        return unsub;
    }, []);

    const handleSubmit = async values => {
        console.log(values);
    };
    return (
        <div className="DoctorDashboard">
            <ExamineCard
                selectedCard={selectedCard}
                handleSubmit={handleSubmit}
            />
            <RightBarContent
                queue={queueData}
                numberEachStatus={numberEachStatus}
            />
        </div>
    );
}

Dashboard.propTypes = {};

export default Dashboard;
