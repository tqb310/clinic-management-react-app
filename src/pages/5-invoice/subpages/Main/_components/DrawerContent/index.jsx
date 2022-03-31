import React, {memo} from 'react';
import {
    Box,
    Typography,
    Divider,
    Button,
    TextField,
    InputAdornment,
} from '@mui/material';
import {
    Table,
    TableRow,
    TableCell,
} from '_components/shared/Table2';
import {serviceHeadCells} from '../../_constants/HeadCells';
import Paid from '_assets/images/paid.jpg';
import './index.scss';
// import PropTypes from 'prop-types'
const serviceList = [
    {
        id: 1,
        itemName: 'Khám thường',
        itemQuantity: 1,
        itemUnitPrice: '50,000đ',
        itemAmount: '50,000đ',
    },
    {
        id: 2,
        itemName: 'Khám thường',
        itemQuantity: 1,
        itemUnitPrice: '50,000đ',
        itemAmount: '50,000đ',
    },
];

function DrawerContent({
    id = NaN,
    patientName = '',
    createAt = '',
    isPaid = false,
}) {
    return (
        <Box className="drawer-content">
            {isPaid && (
                <img src={Paid} alt="paid" width={128} />
            )}
            <Typography variant="h6" gutterBottom>
                Thanh toán
            </Typography>
            <Box className="drawer-content__title">
                <Typography variant="h5" gutterBottom>
                    #{id}
                </Typography>
            </Box>
            <Box className="drawer-content__info-group">
                <Typography variant="body1" color="#888">
                    Bệnh nhân
                </Typography>
                <Typography variant="h6">
                    {patientName}
                </Typography>
            </Box>
            <Box className="drawer-content__info-group">
                <Typography variant="body1" color="#888">
                    Ngày thanh toán
                </Typography>
                <Typography variant="h6">
                    {createAt}
                </Typography>
            </Box>
            <Divider
                sx={{
                    width: '60%',
                    my: '20px',
                }}
            />
            <Table
                sx={{
                    width: '100%',
                }}
                data={serviceList}
                rowHeight="35px"
                rowsPerPage={5}
                header={() => {
                    return (
                        <TableRow>
                            {serviceHeadCells &&
                                serviceHeadCells.map(
                                    cell => (
                                        <TableCell
                                            key={cell.id}
                                            sx={{
                                                ...cell.style,
                                            }}
                                            type="th"
                                        >
                                            <Typography
                                                sx={{
                                                    fontSize:
                                                        '1.4rem',
                                                    color: '#888',
                                                }}
                                            >
                                                {cell.label}
                                            </Typography>
                                        </TableCell>
                                    ),
                                )}
                        </TableRow>
                    );
                }}
                renderDataRow={row => {
                    return (
                        <TableRow
                            key={row.id}
                            sx={{
                                height: '35px',
                                '& td': {
                                    fontSize: '1.4rem',
                                },
                            }}
                        >
                            <TableCell>
                                {row.itemName}
                            </TableCell>
                            <TableCell>
                                {row.itemQuantity}
                            </TableCell>
                            <TableCell>
                                {row.itemUnitPrice}
                            </TableCell>
                            <TableCell>
                                {row.itemAmount}
                            </TableCell>
                        </TableRow>
                    );
                }}
            />
            <Typography sx={{textAlign: 'right'}}>
                Tổng cộng{' '}
                <Typography
                    component="span"
                    variant="h5"
                    sx={{mx: 2}}
                >
                    100.000 đ
                </Typography>
            </Typography>
            <Box className="drawer-content__info-group">
                <Typography>Khách trả</Typography>
                <TextField
                    size="small"
                    fullWidth
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
                <Typography>Tiền thừa</Typography>
                <TextField
                    size="small"
                    value="20.000"
                    fullWidth
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
                    size="small"
                />
            </Box>
            <Box className="drawer-content__actions">
                <Button variant="outlined">In</Button>
                <Button
                    variant="outlined"
                    color="error"
                    sx={{ml: 'auto !important', mr: 2}}
                >
                    Hủy
                </Button>
                <Button variant="contained">
                    Xác nhận
                </Button>
            </Box>
        </Box>
    );
}

DrawerContent.propTypes = {};

export default memo(DrawerContent);
