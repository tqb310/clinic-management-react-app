import React, {memo} from 'react';
import {
    Box,
    List,
    ListItem,
    Typography,
} from '@mui/material';
import services from '_constants/services';
import handlePriceFormat from '_helpers/handlePriceFormat';
import './index.scss';
// import PropTypes from 'prop-types'

function ServiceInfo({data}) {
    return (
        <Box className="RCServiceInfo__table">
            <Box className="RCServiceInfo__table-head">
                <Box
                    sx={{
                        width: '60px',
                    }}
                >
                    STT
                </Box>
                <Box sx={{flex: 1}}>Dịch vụ</Box>
                <Box sx={{width: '100px'}}>Phí (VND)</Box>
            </Box>
            <Box className="RCServiceInfo__table-body">
                {data.services?.map((value, index) => (
                    <Box
                        key={index}
                        className="RCServiceInfo__table-body-row"
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
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                }}
            >
                <List>
                    <ListItem>
                        <Typography
                            variant="subtitle1"
                            sx={{
                                textAlign: 'right',
                                minWidth: '150px',
                                mr: 5,
                            }}
                        >
                            Tổng phí
                        </Typography>
                        <Typography variant="h5">
                            {handlePriceFormat(
                                data.total_fee,
                            )}{' '}
                            đ
                        </Typography>
                    </ListItem>
                    <ListItem>
                        <Typography
                            variant="subtitle1"
                            sx={{
                                textAlign: 'right',
                                minWidth: '150px',
                                mr: 5,
                            }}
                        >
                            Khách trả
                        </Typography>
                        <Typography variant="h5">
                            {handlePriceFormat(
                                data.paying_customer,
                            )}{' '}
                            đ
                        </Typography>
                    </ListItem>
                    <ListItem>
                        <Typography
                            variant="subtitle1"
                            sx={{
                                textAlign: 'right',
                                minWidth: '150px',
                                mr: 5,
                            }}
                        >
                            Tổng phí Tiền thừa
                        </Typography>
                        <Typography variant="h5">
                            {handlePriceFormat(data.change)}{' '}
                            đ
                        </Typography>
                    </ListItem>
                </List>
            </Box>
        </Box>
    );
}

// PatientInfo.propTypes = {};

export default memo(ServiceInfo);
