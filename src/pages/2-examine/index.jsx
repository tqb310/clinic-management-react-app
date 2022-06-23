import React, {useEffect} from 'react';
import ExamineCard from './_components/ExamineCard';
import RightBarContent from './_components/RightBar';
import {useSelector, useDispatch} from 'react-redux';
import {
    setDataAsync,
    setNumberEachStatusAsync,
} from '_redux/slice/queueSlice';
import {useFirestoreRealtime} from '_hooks';
import invoiceServices from '_services/firebase/invoice.service';
import queueServices from '_services/firebase/queue.service';
import getNotificationModel from '_models/notification';
import notificationService from '_services/firebase/notification.service';
import computeServiceTotalFee from '_helpers/computeServiceTotalFee';
import './index.scss';
// import PropTypes from 'prop-types'

function Examine(props) {
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

    useEffect(() => {
        const unsub = firestoreReadltime();
        return unsub;
    }, []);

    const handleSubmit = async values => {
        try {
            //In case of scheduling a follow-up appointment
            if (
                values.follow_up_time.hour &&
                values.follow_up_time.minute
            ) {
                values.follow_up_time =
                    values.follow_up_time.hour +
                    ':' +
                    values.follow_up_time.minute;
            }

            //Setting total fee
            values.total_fee = computeServiceTotalFee(
                values.services,
            );

            //Submit data
            await invoiceServices.updateInvoice(
                selectedCard.invoice_id,
                values,
            );
            await queueServices.deleteQueue(
                selectedCard.id,
            );
            await notificationService.add(
                getNotificationModel(
                    selectedCard.invoice_id,
                ),
            );
        } catch (error) {
            console.log(error);
        }
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
                selectedCard={selectedCard}
            />
        </div>
    );
}

// Examine.propTypes = {};

export default Examine;
