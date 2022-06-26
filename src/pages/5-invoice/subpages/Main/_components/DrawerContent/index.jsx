import React, {memo, useState} from 'react';
import {
    Box,
    Typography,
    Divider,
    Button,
    TextField,
    InputAdornment,
} from '@mui/material';
import Paid from '_assets/images/paid.jpg';
import services from '_constants/services';
import handlePriceFormat from '_helpers/handlePriceFormat';
import './index.scss';
// import PropTypes from 'prop-types'

function DrawerContent({data = {}, handlePaying}) {
    const [paid, setPaid] = useState('');
    const [change, setChange] = useState('');
    const [paidError, setPaidError] = useState(false);

    const handlePaymentForm = e => {
        handlePaying(paid, change);
    };
    const handleReset = e => {
        setPaid(pre => '');
        setChange(pre => '');
    };
    const handleChangePaid = e => {
        if (e.target.value) setPaidError(pre => false);
        setPaid(pre => e.target.value);
        if (parseInt(e.target.value) >= data.total_fee)
            setChange(
                pre =>
                    parseInt(e.target.value) -
                    data.total_fee,
            );
        else setChange(pre => 0);
    };
    const handleBlurPaid = e => {
        if (!e.target.value) setPaidError(true);
    };

    return (
        <Box className="drawer-content">
            {data.paying_customer && (
                <img src={Paid} alt="paid" width={128} />
            )}
            <Typography variant="h6" gutterBottom>
                Thanh toán
            </Typography>
            <Box className="drawer-content__title">
                <Typography variant="h5" gutterBottom>
                    {`${data.id ? '#' + data.id : ''}`}
                </Typography>
            </Box>
            <Box className="drawer-content__info-group">
                <Typography variant="body1" color="#888">
                    Bệnh nhân
                </Typography>
                <Typography variant="h6">
                    {data.last_name
                        ? data.last_name +
                          ' ' +
                          data.first_name
                        : ''}
                </Typography>
            </Box>
            <Box className="drawer-content__info-group">
                <Typography variant="body1" color="#888">
                    Ngày thanh toán
                </Typography>
                <Typography variant="h6">
                    {data.create_at || ''}
                </Typography>
            </Box>
            <Divider
                sx={{
                    width: '60%',
                    my: '20px',
                }}
            />
            <Box className="drawer-content__table">
                <Box className="drawer-content__table-head">
                    <Box
                        sx={{
                            width: '60px',
                        }}
                    >
                        STT
                    </Box>
                    <Box sx={{flex: 1}}>Dịch vụ</Box>
                    <Box sx={{width: '100px'}}>
                        Phí (VND)
                    </Box>
                </Box>
                <Box className="drawer-content__table-body">
                    {data.services?.map((value, index) => (
                        <Box
                            key={index}
                            className="drawer-content__table-body-row"
                        >
                            <Box
                                sx={{
                                    width: '60px',
                                }}
                            >
                                {index + 1}
                            </Box>
                            <Box sx={{flex: 1}}>
                                {
                                    services[value - 1]
                                        .serviceName
                                }
                            </Box>
                            <Box sx={{width: '100px'}}>
                                {handlePriceFormat(
                                    services[value - 1]
                                        .serviceFee,
                                )}
                            </Box>
                        </Box>
                    ))}
                </Box>
            </Box>
            <Typography sx={{textAlign: 'right'}}>
                <span style={{marginRight: '10px'}}>
                    Tổng cộng
                </span>
                <Typography component="span" variant="h5">
                    {handlePriceFormat(data.total_fee)} đ
                </Typography>
            </Typography>
            <Box className="drawer-content__info-group">
                <Typography>Khách trả</Typography>
                <TextField
                    size="small"
                    fullWidth
                    required
                    error={paidError}
                    disabled={Boolean(data.paying_customer)}
                    value={
                        handlePriceFormat(
                            data.paying_customer,
                        ) || paid
                    }
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                đ
                            </InputAdornment>
                        ),
                    }}
                    onChange={handleChangePaid}
                    onBlur={handleBlurPaid}
                    helperText={
                        paidError
                            ? 'Chưa nhập số tiền khách trả'
                            : ''
                    }
                />
            </Box>
            <Box className="drawer-content__info-group">
                <Typography>Tiền thừa</Typography>
                <TextField
                    size="small"
                    fullWidth
                    disabled
                    value={
                        handlePriceFormat(data.change) ||
                        change
                    }
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                đ
                            </InputAdornment>
                        ),
                    }}
                />
            </Box>
            <Box className="drawer-content__info-group">
                <Typography>Ghi chú</Typography>
                <TextField
                    fullWidth
                    multiline
                    rows={2}
                    value={data.note}
                    size="small"
                />
            </Box>
            <Box className="drawer-content__actions">
                <Button variant="outlined">In</Button>
                <Button
                    variant="outlined"
                    color="error"
                    sx={{ml: 'auto !important', mr: 2}}
                    disabled={data.paying_customer}
                    onClick={handleReset}
                >
                    Hủy
                </Button>
                <Button
                    variant="contained"
                    disabled={data.paying_customer}
                    onClick={handlePaymentForm}
                >
                    Xác nhận
                </Button>
            </Box>
        </Box>
    );
}

DrawerContent.propTypes = {};

export default memo(DrawerContent);
