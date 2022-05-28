import React, {useEffect} from 'react';
// import {Box} from '@mui/material';
import {CustomPaper} from '_components/shared/StyledComponent';
import {QueueList, AddForm} from './_components';
import Doctor from '_assets/images/doctor2.png';
import {RightBar} from '_components/shared/StyledComponent';
import LocationProvider from '_contexts/LocationContext';
import {useDispatch, useSelector} from 'react-redux';
import {setDataAsync} from '_redux/slice/patientSlice';
import patientServices from '_services/firebase/patient.service';
import invoiceServices from '_services/firebase/invoice.service';
import queueServices from '_services/firebase/queue.service';
import {getLocationName} from '_contexts/LocationContext';
import {formatDate} from '_helpers/handleDate';
import {
    setDataByStatusAsync,
    setNumberEachStatusAsync,
} from '_redux/slice/queueSlice';
import './index.scss';
// import PropTypes from 'prop-types';

function Queue(props) {
    const activeQueueData = useSelector(
        state => state.queues.data,
    );

    const numberEachStatus = useSelector(
        state => state.queues.numberEachStatus,
    );

    const dispatch = useDispatch();
    useEffect(() => {
        const fetchData = async () => {
            await dispatch(setDataByStatusAsync(2));
            await dispatch(setNumberEachStatusAsync());
        };
        fetchData();
    }, []);
    const handleSubmit = async (
        values,
        actions,
        isExistedPatient,
    ) => {
        if (!values) return;
        console.log(values);
        try {
            const tempName = values.PATIENT_NAME.split(' ');

            // Compute payload for a new record of patient, invoice and queue
            const data = {
                patient: {
                    first_name:
                        tempName[tempName.length - 1],
                    last_name: tempName
                        .slice(0, tempName.length - 1)
                        .join(' '),
                    phone: values.PATIENT_PHONE,
                    height: values.HEIGHT,
                    weight: values.WEIGHT,
                    dob:
                        typeof values.DATE_OF_BIRTH ===
                        'string'
                            ? values.DATE_OF_BIRTH
                            : formatDate(
                                  values.DATE_OF_BIRTH.toLocaleDateString(),
                                  '',
                                  'm/d/y',
                              ),
                    identity_number: values.IDENTITY_NUMBER,
                    occupation: values.OCCUPATION,
                    gender: values.PATIENT_GENDER,
                    province: getLocationName(
                        'province',
                        values.ADDRESS?.province,
                    ),
                    district: getLocationName(
                        'district',
                        values.ADDRESS?.district,
                    ),
                    ward: getLocationName(
                        'ward',
                        values.ADDRESS?.ward,
                    ),
                },
                invoice: {
                    create_at: formatDate(
                        new Date().toLocaleDateString(),
                        '',
                        'm/d/y',
                    ),
                    services: values.SERVICES,
                    status: 0,
                    type: 0,
                },
                queue: {
                    date: formatDate(
                        new Date().toLocaleDateString(),
                        '',
                        'm/d/y',
                    ),
                    time: new Date().toLocaleTimeString(
                        'vi',
                        {hour12: false},
                    ),
                    status: 1,
                },
            };
            if (!isExistedPatient) {
                //Case of add a existed patient
                const patientRes =
                    await patientServices.addPatient(
                        data.patient,
                    );
                data.invoice.patient_id = patientRes.id;
            } else {
                //Case of add a not existed patient

                //Get id of newly created patient
                data.invoice.patient_id = isExistedPatient;
            }
            //Add an invoice
            const invoiceRes =
                await invoiceServices.addInvoice(
                    data.invoice,
                );
            //Get id of newly created invoice and patient
            data.queue.invoice_id = invoiceRes.id;
            data.queue.patient_id = data.invoice.patient_id;
            //Add to queue
            await queueServices.addToQueue(data.queue);
        } catch (error) {
            throw error;
        }
    };
    dispatch(setDataAsync());
    return (
        <>
            <CustomPaper className="queue-container">
                <QueueList
                    queueData={activeQueueData}
                    numberEachStatus={numberEachStatus}
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
