import React from 'react';
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    IconButton,
    // Button,
    TextField,
    Grid,
} from '@mui/material';
import {Close} from '@mui/icons-material';
import handlePriceFormat from '_helpers/handlePriceFormat.js';
import './index.scss';

function ProfileForm({open, handleClose}) {
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
                Thông tin cá nhân
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
                className="ProfileForm"
                sx={{boxSizing: 'border-box', width: 600}}
            >
                <Grid container columnSpacing={2}>
                    <Grid item xs={6}>
                        <TextField
                            style={{
                                width: '100%',
                                margin: '1rem 0',
                            }}
                            label="Mã nhân viên"
                            size="small"
                            value="18520501"
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            style={{
                                width: '100%',
                                margin: '1rem 0',
                            }}
                            label="Tên nhân viên"
                            size="small"
                            value="Đặng Ngọc Liêm"
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            style={{
                                width: '100%',
                                margin: '1rem 0',
                            }}
                            label="CMND/CCCD"
                            size="small"
                            value="261612345"
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            style={{
                                width: '100%',
                                margin: '1rem 0',
                            }}
                            label="Điện thoại"
                            size="small"
                            value="0123456789"
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            style={{
                                width: '100%',
                                margin: '1rem 0',
                            }}
                            label="Ngày sinh"
                            size="small"
                            value="01/02/1998"
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <TextField
                            style={{
                                width: '100%',
                                margin: '1rem 0',
                            }}
                            label="Giới tính"
                            size="small"
                            value="Nam"
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <TextField
                            style={{
                                width: '100%',
                                margin: '1rem 0',
                            }}
                            label="Bộ phận"
                            size="small"
                            value="Tiếp tân"
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            style={{
                                width: '100%',
                                margin: '1rem 0',
                            }}
                            label="Ngày vào làm"
                            size="small"
                            value="01/01/2018"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            style={{
                                width: '100%',
                                margin: '1rem 0',
                            }}
                            label="Lương"
                            size="small"
                            value={handlePriceFormat(
                                10000000,
                            )}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            style={{
                                width: '100%',
                                margin: '1rem 0',
                            }}
                            label="Địa chỉ"
                            size="small"
                            value="Quận 9 - TP.HCM"
                        />
                    </Grid>
                </Grid>
            </DialogContent>
        </Dialog>
    );
}

export default ProfileForm;
