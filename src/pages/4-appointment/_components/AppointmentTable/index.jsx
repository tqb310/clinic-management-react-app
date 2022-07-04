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
import AlertDialog from '_components/shared/AlertDialog';
import './index.scss';

function AppointmentTable({
    data = [],
    selectedAppointment = {},
    isOpenForm,
    dataByDate,
    isOpenAppointmentDetail,
    nextPatient,
}) {
    const dispatch = useDispatch();
    const [openToast, setOpenToast] = React.useState({
        isOpen: false,
        msg: '',
    });
    const [openAlertDialog, setOpenAlertDialog] =
        React.useState(false);

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
            setOpenToast({
                isOpen: true,
                msg: 'Tạo lịch hẹn thành công',
            });
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

        setOpenToast({isOpen: false, msg: ''});
    };
    const handleCancelAppointment = async () => {
        try {
            await appointmentService.update(
                selectedAppointment.id,
                '',
                {
                    appointment: {
                        status: 0,
                    },
                },
            );
        } catch (err) {
            throw err;
        }
    };
    return (
        <CustomPaper className="content-container">
            <Toast
                open={openToast.isOpen}
                handleClose={handleCloseToast}
                vertical="bottom"
                horizontal="left"
            >
                {openToast.msg}
            </Toast>
            <AlertDialog
                open={openAlertDialog}
                handleClose={setOpenAlertDialog.bind(
                    null,
                    false,
                )}
                handleWhenOk={handleCancelAppointment}
                msg="Bạn có thực sự muốn hủy không?"
                actionLabel={{
                    ok: 'Hủy',
                    refuse: 'Không',
                }}
                onSuccess={setOpenToast.bind(null, {
                    isOpen: true,
                    msg: 'Hủy lịch hẹn thành công',
                })}
            />
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
            </Box>
            <Box className="appointment-wrapper">
                {dataByDate && dataByDate.length ? (
                    <Fragment>
                        <TableContent
                            tableData={dataByDate}
                            openToast={setOpenToast}
                            openAlertDialog={
                                setOpenAlertDialog
                            }
                            nextPatient={nextPatient}
                            selectedAppointment={
                                selectedAppointment
                            }
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
