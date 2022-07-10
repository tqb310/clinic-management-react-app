import React, {memo, useMemo} from 'react';
import {
    IconButton,
    Box,
    Alert,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@mui/material';
import {Delete} from '@mui/icons-material';
import {HeadCell} from '../../_constants';
import handlePrice from '_helpers/handlePriceFormat';
import serviceData from '_constants/services';
import './index.scss';
// import PropTypes from 'prop-types'

function SelectedServiceTable({
    selectedServiceId,
    setFieldValue,
    errorMsg,
}) {
    const SelectedServiceData = useMemo(() => {
        return (
            selectedServiceId &&
            selectedServiceId.map(id =>
                serviceData.find(
                    service => service.id === id,
                ),
            )
        );
    }, [selectedServiceId]);
    const handleDelete = id => _ => {
        const newSelected = [...selectedServiceId];
        newSelected.splice(
            selectedServiceId.indexOf(id),
            1,
        );
        setFieldValue('invoice.services', newSelected);
    };
    return (
        <Box>
            {errorMsg && (
                <Alert severity="error">{errorMsg}</Alert>
            )}
            <Table className="add-form__service-table">
                <TableHead>
                    <TableRow>
                        {HeadCell &&
                            HeadCell.map(th => (
                                <TableCell
                                    style={th.style}
                                    key={th.id}
                                >
                                    {th.label}
                                </TableCell>
                            ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {SelectedServiceData &&
                        SelectedServiceData.map(
                            (row, index) => (
                                <TableRow key={row.id}>
                                    <TableCell>
                                        {index + 1}
                                    </TableCell>
                                    <TableCell>
                                        {row.serviceName}
                                    </TableCell>
                                    <TableCell>
                                        {handlePrice(
                                            row.serviceFee,
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        <IconButton
                                            onClick={handleDelete(
                                                row.id,
                                            )}
                                        >
                                            <Delete color="error" />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ),
                        )}
                </TableBody>
            </Table>
        </Box>
    );
}

SelectedServiceTable.propTypes = {};

export default memo(SelectedServiceTable);
