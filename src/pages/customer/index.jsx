import React from 'react';
import AppointmentForm from '_components/shared/AppointmentForm';
import {Typography, Container} from '@mui/material';
import LocationProvider from '_contexts/LocationContext';
import {
    patientModel,
    appointmentRequestModel,
} from '_models';
import appointmentRequestServices from '_services/firebase/appointment-request.service';
import './index.scss';

function AppointmentRequest() {
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
        } catch (error) {
            throw error;
        }
    };
    return (
        <Container
            sx={{width: {xs: '100%', md: 600}}}
            className="appointment-request"
        >
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
