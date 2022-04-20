import React, {memo} from 'react';
import {headCells} from '../../_constants/HeadCells';
import {
    tableCellStyles,
    tableHeadCellStyles,
    tableHeadRowStyles,
} from '_constants/TableHeaderStyles';
import {gender} from '_constants/general';
import {
    Table,
    TableRow,
    TableCell,
} from '_components/shared/Table2';
import {
    Checkbox,
    Avatar,
    Box,
    Typography,
    IconButton,
} from '@mui/material';
import MalePatient from '_assets/images/male-patient.png';
import FemalePatient from '_assets/images/female-patient.png';
// import {StatusPaper} from '_components/shared/StyledComponent';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {useDispatch} from 'react-redux';
import {select, sort} from '_redux/slice/patientSlice';
// import PropTypes from 'prop-types'

function PatientTable({
    tableData,
    selected,
    rowsPerPage,
    page,
    order,
    orderBy,
}) {
    const dispatch = useDispatch();
    //Handle when check a row
    const handleSelect = id => e => {
        if (e.target.checked) {
            dispatch(select([...selected, id]));
        } else {
            dispatch(
                select([...selected].filter(i => i !== id)),
            );
        }
    };
    //Handle when check all rows
    const handleSelectAll = e => {
        if (e.target.checked) {
            dispatch(select(tableData.map(row => row.id)));
        } else {
            dispatch(select([]));
        }
    };
    const handleActions =
        (action, key = '') =>
        e => {
            switch (action) {
                case 'sort':
                    dispatch(sort(key));
                    break;
                case 'filter':
                    return;
                default:
                    return;
            }
        };
    return (
        <Table
            sx={{
                borderCollapse: 'collapse',
                userSelect: 'none',
                fontSize: '1.5rem',
                width: '100%',
                height: '100%',
            }}
            data={[...tableData].slice(
                page * rowsPerPage,
                (page + 1) * rowsPerPage,
            )}
            hoverStyle={{
                backgroundColor: '#f8f8f8',
                '& svg': {opacity: 1},
            }}
            activeStyle={{
                backgroundColor: '#f8f8f8',
                '& svg': {opacity: 1},
            }}
            header={() => {
                return (
                    <TableRow sx={tableHeadRowStyles}>
                        <TableCell
                            sx={{
                                width: '50px',
                            }}
                            type="th"
                            align="center"
                        >
                            <Checkbox
                                indeterminate={
                                    selected.length > 0 &&
                                    selected.length <
                                        tableData.length
                                }
                                checked={
                                    tableData.length &&
                                    selected.length ===
                                        tableData.length
                                }
                                onChange={handleSelectAll}
                            />
                        </TableCell>
                        {headCells &&
                            headCells.map(
                                ({
                                    id,
                                    label,
                                    style,
                                    property,
                                    action,
                                    ...rest
                                }) => (
                                    <TableCell
                                        key={id}
                                        type="th"
                                        sx={{
                                            ...tableHeadCellStyles,
                                            ...style,
                                        }}
                                        handleClick={handleActions(
                                            action,
                                            property,
                                        )}
                                        orderBy={orderBy}
                                        order={order}
                                        action={action}
                                        property={property}
                                        {...rest}
                                    >
                                        <Typography
                                            variant="subtitle2"
                                            component="span"
                                        >
                                            {label}
                                        </Typography>
                                    </TableCell>
                                ),
                            )}
                    </TableRow>
                );
            }}
            renderDataRow={(
                row,
                index,
                {hoverStyle, activeStyle},
            ) => (
                <TableRow
                    key={index}
                    sx={Object.assign(
                        {
                            borderBottom: '1px solid #ddd',
                            transition:
                                'background-color .3s',
                            '&:hover': {
                                ...hoverStyle,
                            },
                        },
                        selected.includes(row.id)
                            ? {...activeStyle}
                            : {},
                    )}
                >
                    <TableCell
                        sx={{
                            textAlign: 'center',
                            width: '20px',
                        }}
                    >
                        <Checkbox
                            checked={selected.includes(
                                row.id,
                            )}
                            onChange={handleSelect(row.id)}
                        />
                    </TableCell>
                    <TableCell
                        type="td"
                        sx={{
                            ...tableCellStyles,
                            textAlign: 'center',
                        }}
                    >
                        {row.id}
                    </TableCell>
                    <TableCell
                        type="td"
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            height: '100%',
                            ...tableCellStyles,
                        }}
                    >
                        <Avatar
                            src={
                                row.gender
                                    ? MalePatient
                                    : FemalePatient
                            }
                            sx={{
                                width: 32,
                                height: 32,
                                mr: 1,
                            }}
                        />
                        <Box>
                            <p>{`${row.last_name} ${row.first_name}`}</p>
                            <Typography color="#888">
                                {row.phone}
                            </Typography>
                        </Box>
                    </TableCell>
                    <TableCell type="td">
                        {row.dob}
                    </TableCell>
                    <TableCell type="td">
                        {gender[row.gender].key}
                    </TableCell>
                    <TableCell type="td">
                        {`${row.district} - ${row.province}`}
                    </TableCell>
                    <TableCell
                        type="td"
                        sx={{
                            width: '45px',
                            '& svg': {
                                opacity: 0.5,
                                transition: 'opacity .3s',
                            },
                        }}
                    >
                        <IconButton>
                            {' '}
                            <FontAwesomeIcon
                                icon="edit"
                                color="#aaa"
                                style={{
                                    fontSize: '1.5rem',
                                }}
                            />
                        </IconButton>
                    </TableCell>
                    <TableCell
                        type="td"
                        sx={{
                            width: '45px',
                            '& svg': {
                                opacity: 0.5,
                                transition: 'opacity .3s',
                            },
                        }}
                    >
                        <IconButton>
                            {' '}
                            <FontAwesomeIcon
                                icon="edit"
                                color="#aaa"
                                style={{
                                    fontSize: '1.5rem',
                                }}
                            />
                        </IconButton>
                    </TableCell>
                </TableRow>
            )}
        />
    );
}

PatientTable.propTypes = {};

export default memo(PatientTable);
