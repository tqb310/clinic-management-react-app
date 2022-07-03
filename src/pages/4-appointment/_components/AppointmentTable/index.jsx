import React, {memo, Fragment} from 'react';
import {Add, Search} from '@mui/icons-material';
import {
    Button,
    Typography,
    Box,
    InputBase,
} from '@mui/material';
import {CustomPaper} from '_components/shared/StyledComponent';
import AddAppointmentForm from '../AddAppointmentForm';
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
import {appointmentModel, patientModel} from '_models';
import {formatDate} from '_helpers/handleDate';
import Toast from '_components/shared/Toast';
import './index.scss';

function AppointmentTable({
    data = [],
    selectedAppointment = {},
    isOpenForm,
    dataByDate,
    isOpenAppointmentDetail,
}) {
    const dispatch = useDispatch();
    const [openToast, setOpenToast] = React.useState(false);

    const handleCreateSubmit = async (values, actions) => {
        try {
            const payload = {
                patient: patientModel(values.patient),
                appointment: appointmentModel(
                    values.appointment,
                ),
            };
            payload.appointment.create_at = formatDate(
                new Date().toLocaleDateString(),
                '',
                'm/d/y',
                true,
            );
            await appointmentService.addAppointment(
                payload,
            );
            handleClose();
            setOpenToast(true);
        } catch (error) {
            throw error;
        }
    };

    const handleUpdateSubmit = async value => {
        const payload = {
            patient: patientModel(value.patient),
            appointment: appointmentModel(
                value.appointment,
            ),
        };
        //Overriding status property "status"
        payload.appointment.status =
            selectedAppointment.status;
        // console.log(payload);
        try {
            await appointmentService.update(
                selectedAppointment.id.toString(),
                selectedAppointment.patient_id.toString(),
                payload,
            );
            handleCloseAppointmentDetail();
        } catch (error) {
            throw error;
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
    const handleCloseToast = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenToast(false);
    };
    return (
        <CustomPaper className="content-container">
            <Box className="content-header">
                <Typography variant="h5">
                    Lịch hẹn
                </Typography>
            </Box>
            <Calendar data={data} />
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
                <AddAppointmentForm
                    title="Tạo lịch hẹn"
                    open={isOpenForm}
                    handleClose={handleClose}
                    handleSubmit={handleCreateSubmit}
                />
                <Toast
                    open={openToast}
                    handleClose={handleCloseToast}
                    vertical="bottom"
                    horizontal="left"
                >
                    Tạo lịch hẹn thành công
                </Toast>
            </Box>
            <Box className="appointment-wrapper">
                {dataByDate && dataByDate.length ? (
                    <Fragment>
                        <TableContent
                            tableData={dataByDate}
                        />
                        <LocationProvider>
                            <ConfirmRequest
                                title="Chi tiết lịch hẹn"
                                open={
                                    isOpenAppointmentDetail
                                }
                                handleClose={
                                    handleCloseAppointmentDetail
                                }
                                data={selectedAppointment}
                                handleSubmit={
                                    handleUpdateSubmit
                                }
                                submitLabel="Sửa"
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
