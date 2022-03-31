import React, {memo} from 'react';
import {
    IconButton,
    Dialog,
    DialogTitle,
    List,
    ListItem,
    Icon,
} from '@mui/material';
import {Close} from '@mui/icons-material';
import './index.scss';
// import PropTypes from 'prop-types'

function ServiceDialog({
    open,
    onClose,
    serviceData,
    selectedServiceId,
    setFieldValue,
}) {
    const handleSelect = id => _ => {
        onClose();
        setFieldValue('SERVICES', [
            ...selectedServiceId,
            id,
        ]);
    };
    return (
        <Dialog
            open={open}
            onClose={onClose}
            sx={{'& .MuiPaper-root': {width: '500px'}}}
        >
            <DialogTitle
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    py: '1rem',
                }}
            >
                Chọn dịch vụ{' '}
                <IconButton onClick={onClose}>
                    <Close sx={{fontSize: '1.8rem'}} />
                </IconButton>
            </DialogTitle>
            <List
                sx={{
                    pt: 0,
                }}
            >
                {serviceData &&
                    serviceData.map(service => (
                        <ListItem
                            button
                            disabled={selectedServiceId.includes(
                                service.id,
                            )}
                            key={service.id}
                            sx={{
                                px: '2.2rem',
                                textDecoration:
                                    selectedServiceId.includes(
                                        service.id,
                                    )
                                        ? 'line-through'
                                        : '',
                            }}
                            onClick={handleSelect(
                                service.id,
                            )}
                        >
                            {service.serviceName} ( Phí:{' '}
                            {service.serviceFee})
                        </ListItem>
                    ))}
            </List>
        </Dialog>
    );
}

ServiceDialog.propTypes = {};

export default memo(ServiceDialog);
