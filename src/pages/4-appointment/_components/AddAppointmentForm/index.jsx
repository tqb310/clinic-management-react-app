import React from 'react';
import AppointmentForm from '../../../../_components/shared/AppointmentForm';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    IconButton,
} from '@mui/material';
// import {Date} from '_components/shared/FormikField/DateTime';
import LocationProvider from '_contexts/LocationContext';
import {Close} from '@mui/icons-material';

function AddAppointment({
    open,
    handleClose,
    handleSubmit,
    title,
}) {
    return (
        <Dialog
            modal={true}
            open={open}
            onClose={handleClose}
        >
            <DialogTitle
                sx={{
                    position: 'relative',
                    padding: '.8rem 1.5rem .8rem 1.5rem',
                    fontSize: '15px',
                    fontWeight: 600,
                }}
            >
                {title}
                <IconButton
                    sx={{
                        position: 'absolute',
                        top: 3,
                        right: 15,
                    }}
                    onClick={handleClose}
                >
                    <Close />
                </IconButton>
            </DialogTitle>
            <DialogContent
                dividers
                sx={{
                    boxSizing: 'border-box',
                    width: {
                        xs: '100%',
                        md: 600,
                    },
                }}
            >
                <LocationProvider>
                    <AppointmentForm
                        handleSubmit={handleSubmit}
                    />
                </LocationProvider>
            </DialogContent>
        </Dialog>
    );
}

export default AddAppointment;
