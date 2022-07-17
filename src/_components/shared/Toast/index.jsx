import React, {memo} from 'react';
import {Snackbar, Alert} from '@mui/material';

function Toast({
    open,
    handleClose,
    duration = 4000,
    children,
    status = 'success',
    vertical = 'top',
    horizontal = 'center',
    sx = {},
}) {
    return (
        <Snackbar
            open={open}
            autoHideDuration={duration}
            onClose={handleClose}
            anchorOrigin={{
                vertical,
                horizontal,
            }}
        >
            <Alert
                onClose={handleClose}
                severity={status}
                sx={{width: '100%', px: 3, py: 1, ...sx}}
            >
                {children}
            </Alert>
        </Snackbar>
    );
}

export default memo(Toast);
