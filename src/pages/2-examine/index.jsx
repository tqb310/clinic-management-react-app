import React, {useState, useEffect} from 'react';
import ExamineCard from './_components/ExamineCard';
import RightBarContent from './_components/RightBar';
import {useSelector, useDispatch} from 'react-redux';
import {
    setDataAsync,
    setNumberEachStatusAsync,
} from '_redux/slice/queueSlice';
import {useFirestoreRealtime} from '_hooks';
import invoiceServices from '_services/firebase/invoice.service';
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
        state => state.queues.selectedCard,
    );

    const firestoreReadltime = useFirestoreRealtime({
        collectionName: 'queue',
        eventHandler: async () => {
            await dispatch(setDataAsync());
            await dispatch(setNumberEachStatusAsync());
        },
    });

    const handleSubmit = async values => {
        try {
            if (
                values.follow_up_time.hour &&
                values.follow_up_time.minute
            ) {
                values.follow_up_time =
                    values.follow_up_time.hour +
                    ':' +
                    values.follow_up_time.minute;
            }
            await invoiceServices.updateInvoice(
                selectedCard.invoice_id,
                values,
            );
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const unsub = firestoreReadltime();
        return unsub;
    }, []);

    return (
        <div className="DoctorDashboard">
            <ExamineCard
                selectedCard={selectedCard}
                handleSubmit={handleSubmit}
            />
            <RightBarContent
                queue={queueData}
                numberEachStatus={numberEachStatus}
                selectedCard={selectedCard}
            />
        </div>
    );
}

Dashboard.propTypes = {};

export default Dashboard;
