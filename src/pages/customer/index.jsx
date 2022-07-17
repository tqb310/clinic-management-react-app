import React, {useState} from 'react';
import AppointmentForm from '_components/shared/AppointmentForm';
import {Typography, Container} from '@mui/material';
import LocationProvider from '_contexts/LocationContext';
import {
    patientModel,
    appointmentRequestModel,
} from '_models';
import appointmentRequestServices from '_services/firebase/appointment-request.service';
import Toast from '_components/shared/Toast';
import './index.scss';

function AppointmentRequest() {
    const [isOpenToast, setOpenToast] = useState(false);
    const handleSubmit = async (values, actions) => {
        try {
            const payload = {
                ...patientModel(values.patient),
                ...appointmentRequestModel(
                    values.appointment,
                ),
            };
            await appointmentRequestServices.addAppointmentRequest(
                payload,
            );
            setOpenToast(true);
        } catch (error) {
            throw error;
        }
    };
    const handleCloseToast = (e, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenToast(false);
    };
    return (
        <Container
            sx={{width: {xs: '100%', md: 600}}}
            className="appointment-request"
        >
            <Toast
                open={isOpenToast}
                handleClose={handleCloseToast}
                vertical="bottom"
                horizontal="left"
            >
                Tạo lịch hẹn thành công
            </Toast>
            <Typography
                align="center"
                variant="h3"
                marginBottom={3}
            >
                Đặt lịch hẹn
            </Typography>
            <LocationProvider>
                <AppointmentForm
                    handleSubmit={handleSubmit}
                />
            </LocationProvider>
        </Container>
    );
}

export default AppointmentRequest;
