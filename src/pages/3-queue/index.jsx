import React, {useEffect} from 'react';
// import {Box} from '@mui/material';
import {CustomPaper} from '_components/shared/StyledComponent';
import {QueueList, AddForm} from './_components';
import Doctor from '_assets/images/doctor2.png';
import {RightBar} from '_components/shared/StyledComponent';
import LocationProvider from '_contexts/LocationContext';
import {useDispatch, useSelector} from 'react-redux';
import {setDataAsync as setPatientDataAsync} from '_redux/slice/patientSlice';
import patientServices from '_services/firebase/patient.service';
import invoiceServices from '_services/firebase/invoice.service';
import queueServices from '_services/firebase/queue.service';
import {
    setDataByStatusAsync,
    setNumberEachStatusAsync,
} from '_redux/slice/queueSlice';
import {
    patientModel,
    invoiceModel,
    queueModel,
} from '_models';
import './index.scss';
// import PropTypes from 'prop-types';

function Queue(props) {
    const activeQueueData = useSelector(
        state => state.queues.data,
    );
    const loading = useSelector(
        state => state.queues.isLoading,
    );
    const numberEachStatus = useSelector(
        state => state.queues.numberEachStatus,
    );

    const dispatch = useDispatch();
    useEffect(() => {
        const fetchData = async () => {
            await dispatch(setDataByStatusAsync(2));
            await dispatch(setNumberEachStatusAsync());
            await dispatch(setPatientDataAsync());
        };
        fetchData();
    }, []);

    const handleSubmit = async (
        values,
        actions,
        isExistedPatient,
    ) => {
        if (!values) return;

        try {
            const payload = {
                patient: patientModel(values.patient),
                invoice: invoiceModel(values.invoice),
                queue: queueModel(),
            };
            if (!isExistedPatient) {
                //Case of add a existed patient
                const patientRes =
                    await patientServices.addPatient(
                        payload.patient,
                    );
                payload.invoice.patient_id = patientRes.id;
            } else {
                //Case of add a not existed patient

                //Get id of newly created patient
                payload.invoice.patient_id =
                    isExistedPatient;
            }
            //Add an invoice
            const invoiceRes =
                await invoiceServices.addInvoice(
                    payload.invoice,
                );
            //Get id of newly created invoice and patient
            payload.queue.invoice_id = invoiceRes.id;
            payload.queue.patient_id =
                payload.invoice.patient_id;
            //Add to queue
            await queueServices.addToQueue(payload.queue);
        } catch (error) {
            throw error;
        }
    };

    return (
        <>
            <CustomPaper className="queue-container">
                <QueueList
                    queueData={activeQueueData}
                    numberEachStatus={numberEachStatus}
                    loading={loading}
                />
                <LocationProvider>
                    <AddForm handleSubmit={handleSubmit} />
                </LocationProvider>
            </CustomPaper>
            <RightBar>
                <img
                    src={Doctor}
                    alt="doctor"
                    width={'100%'}
                    height={'100%'}
                    style={{objectFit: 'cover'}}
                />
            </RightBar>
        </>
    );
}

Queue.propTypes = {};

export default Queue;
