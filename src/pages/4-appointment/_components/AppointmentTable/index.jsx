import React, {memo, Fragment} from 'react';
import {Add, Search} from '@mui/icons-material';
import {
    Button,
    Typography,
    Box,
    InputBase,
} from '@mui/material';
import {CustomPaper} from '_components/shared/StyledComponent';
import {formatDate} from '_helpers/handleDate';
import Form from '../AppointmentForm';
import NoResultDate from './_assets/no-date-result.png';
import Calendar from './_components/Calendar';
import TableContent from './_components/TableContent';
import {useDispatch} from 'react-redux';
import {
    setOpenForm,
    openAppointmentDetail,
} from '_redux/slice/appointmentSlice';
import LocationProvider from '_contexts/LocationContext';
import appointmentService from '_services/firebase/appointment.service';
import ConfirmRequest from '../ConfirmRequest';
import './index.scss';

function AppointmentTable({data = {}}) {
    const dispatch = useDispatch();
    const handleCreateSubmit = value => {
        console.log(value);
    };
    const handleUpdateSubmit = async value => {
        const {
            PATIENT_NAME,
            PATIENT_PHONE,
            HEIGHT,
            WEIGHT,
            DATE_OF_BIRTH,
            IDENTITY_NUMBER,
            OCCUPATION,
            PATIENT_GENDER,
            DATE,
            HOUR,
            MINUTE,
            NOTE,
            PATIENT_TYPE,
            STATUS,
        } = value;
        const tempName = PATIENT_NAME.split(' ');
        const payload = {
            patient: {
                first_name: tempName[tempName.length - 1],
                last_name: tempName
                    .slice(0, tempName.length - 1)
                    .join(' '),
                phone: PATIENT_PHONE,
                height: HEIGHT,
                weight: WEIGHT,
                dob: formatDate(DATE_OF_BIRTH, '', 'm/d/y'),
                identity_number: IDENTITY_NUMBER,
                occupation: OCCUPATION,
                gender: PATIENT_GENDER,
            },
            appointment: {
                date: formatDate(DATE, '', 'm/d/y'),
                time: HOUR + ':' + MINUTE,
                note: NOTE || '',
                type: PATIENT_TYPE,
                status: STATUS,
            },
        };
        try {
            await appointmentService.update(
                data.selectedAppointment.id.toString(),
                data.selectedAppointment.patient_id.toString(),
                payload,
            );
        } catch (error) {
            console.log(error.message);
        }
    };

    const handleOpen = e => {
        dispatch(setOpenForm(true));
    };
    const handleClose = e => {
        dispatch(setOpenForm(false));
    };
    const handleCloseAppointmentDetail = e => {
        dispatch(openAppointmentDetail(false));
    };
    return (
        <CustomPaper className="content-container">
            <Box className="content-header">
                <Typography variant="h5">
                    Lịch hẹn
                </Typography>
            </Box>
            <Calendar data={data.data} />
            <Box className="appointment__actions">
                <Box className="table-container__search">
                    <Search className="icon" />
                    <InputBase
                        className="input"
                        placeholder="Tên, số điện thoại ..."
                    />
                </Box>
                <Button
                    sx={{ml: 'auto'}}
                    variant="outlined"
                    startIcon={<Add />}
                    onClick={handleOpen}
                >
                    Tạo
                </Button>
                <Form
                    open={data.isOpenForm}
                    handleClose={handleClose}
                    handleSubmit={handleCreateSubmit}
                />
            </Box>
            <Box className="appointment-wrapper">
                {data.dataByDate &&
                data.dataByDate.length ? (
                    <Fragment>
                        <TableContent
                            tableData={data.dataByDate}
                            selected={data.selected}
                        />
                        <LocationProvider>
                            <ConfirmRequest
                                title="Chi tiết lịch hẹn"
                                open={
                                    data.isOpenAppointmentDetail
                                }
                                handleClose={
                                    handleCloseAppointmentDetail
                                }
                                data={
                                    data.selectedAppointment
                                }
                                handleSubmit={
                                    handleUpdateSubmit
                                }
                            />
                        </LocationProvider>
                    </Fragment>
                ) : (
                    <Box className="appointment__no-data">
                        <img
                            src={NoResultDate}
                            className="appointment__no-data-img"
                            alt="No results"
                            width="512"
                        />
                    </Box>
                )}
            </Box>
        </CustomPaper>
    );
}

export default memo(AppointmentTable);
