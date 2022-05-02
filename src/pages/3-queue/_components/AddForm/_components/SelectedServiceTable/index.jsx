import React, {memo, useMemo} from 'react';
import {IconButton} from '@mui/material';
import {Delete} from '@mui/icons-material';
import {HeadCell} from '../../_constants';
import handlePrice from '_helpers/handlePriceFormat';
import './index.scss';
// import PropTypes from 'prop-types'

function SelectedServiceTable({
    selectedServiceId,
    serviceData,
    setFieldValue,
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
    }, [selectedServiceId, serviceData]);
    const handleDelete = id => _ => {
        const newSelected = [...selectedServiceId];
        newSelected.splice(
            selectedServiceId.indexOf(id),
            1,
        );
        setFieldValue('SERVICES', newSelected);
    };
    return (
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
                                <td>{row.serviceName}</td>
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
    );
}

SelectedServiceTable.propTypes = {};

export default memo(SelectedServiceTable);
