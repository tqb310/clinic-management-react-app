import React from 'react';
import {
    Button,
    Dialog,
    DialogTitle,
    // DialogContent,
    // DialogContentText,
    DialogActions,
} from '@mui/material';
import {LoadingButton} from '@mui/lab';

function AlertDialog({
    open,
    handleClose,
    handleWhenOk,
    msg,
    actionLabel,
    onSuccess,
}) {
    const [loading, setLoading] = React.useState(false);

    const handleClickOk = async e => {
        try {
            setLoading(true);
            await handleWhenOk();
            onSuccess();
        } catch (error) {
            throw error;
        } finally {
            setLoading(false);
            handleClose();
        }
    };
    return (
        <Dialog
            open={open}
            // onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {msg}
            </DialogTitle>
            {/* <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Let Google help apps determine location.
                    This means sending anonymous location
                    data to Google, even when no apps are
                    running.
                </DialogContentText>
            </DialogContent> */}
            <DialogActions>
                <LoadingButton
                    onClick={handleClickOk}
                    loading={loading}
                >
                    {actionLabel.ok}
                </LoadingButton>
                <Button
                    onClick={handleClose}
                    autoFocus
                    color="error"
                    disabled={loading}
                >
                    {actionLabel.refuse}
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default AlertDialog;
