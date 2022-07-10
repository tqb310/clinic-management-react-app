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
import role from '_constants/role';
import './index.scss';

function ProfileForm({open, handleClose, data}) {
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
                sx={{
                    boxSizing: 'border-box',
                    width: {xs: '100%', md: 600},
                }}
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
                            value={data.id}
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
                            value={data.name}
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
                            value={data.phone}
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
                            value={data.dob}
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
                            value={
                                data.gender ? 'Nam' : 'Nữ'
                            }
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
                            value={role.get(data.role).name}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            style={{
                                width: '100%',
                                margin: '1rem 0',
                            }}
                            label="Lương"
                            size="small"
                            value={handlePriceFormat(
                                data.salary,
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
                            value={data.address}
                            multiline
                            rows={3}
                        />
                    </Grid>
                </Grid>
            </DialogContent>
        </Dialog>
    );
}

export default ProfileForm;
