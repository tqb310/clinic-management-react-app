import React, {
    useEffect,
    useState,
    useCallback,
} from 'react';
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
import Toast from '_components/shared/Toast';
import './index.scss';
// import PropTypes from 'prop-types'

function Examine(props) {
    const dispatch = useDispatch();
    const [openToast, setOpenToast] = useState(false);

    const queueData = useSelector(
        state => state.queues.data,
    );
    const numberEachStatus = useSelector(
        state => state.queues.numberEachStatus,
    );
    const selectedCard = useSelector(
        state => state.queues.selectedCard,
    );

    const firestoreRealtime = useFirestoreRealtime({
        collectionName: 'queue',
        eventHandler: async () => {
            await dispatch(setDataAsync());
            await dispatch(setNumberEachStatusAsync());
        },
    });

    const handleCloseToast = useCallback(
        (event, reason) => {
            if (reason === 'clickaway') {
                return;
            }

            setOpenToast(false);
        },
        [],
    );

    useEffect(() => {
        const unsub = firestoreRealtime();
        return unsub;
    }, []);

    const handleSubmit = async (values, actions) => {
        try {
            actions.setSubmitting(true);
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
            setOpenToast(true);
        } catch (error) {
            console.log(error);
        } finally {
            actions.setSubmitting(false);
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
            <Toast
                open={openToast}
                handleClose={handleCloseToast}
                vertical="bottom"
                horizontal="left"
            >
                Thao tác thành công
            </Toast>
        </div>
    );
}

// Examine.propTypes = {};

export default Examine;
