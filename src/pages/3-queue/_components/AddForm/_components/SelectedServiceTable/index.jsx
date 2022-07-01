import React, {memo, useMemo} from 'react';
import {IconButton, Box, Alert} from '@mui/material';
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
            <table className="add-form__service-table">
                <thead>
                    <tr>
                        {HeadCell &&
                            HeadCell.map(th => (
                                <th
                                    style={th.style}
                                    key={th.id}
                                >
                                    {th.label}
                                </th>
                            ))}
                    </tr>
                </thead>
                <tbody>
                    {SelectedServiceData &&
                        SelectedServiceData.map(
                            (row, index) => (
                                <tr key={row.id}>
                                    <td>{index + 1}</td>
                                    <td>
                                        {row.serviceName}
                                    </td>
                                    <td>
                                        {handlePrice(
                                            row.serviceFee,
                                        )}
                                    </td>
                                    <td>
                                        <IconButton
                                            onClick={handleDelete(
                                                row.id,
                                            )}
                                        >
                                            <Delete color="error" />
                                        </IconButton>
                                    </td>
                                </tr>
                            ),
                        )}
                </tbody>
            </table>
        </Box>
    );
}

SelectedServiceTable.propTypes = {};

export default memo(SelectedServiceTable);
