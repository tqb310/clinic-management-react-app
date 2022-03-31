import React, {memo, useState, Fragment} from 'react';
import {headCells} from '../../_constants/HeadCells';
import {
    tableCellStyles,
    tableHeadCellStyles,
    tableHeadRowStyles,
} from '_constants/TableHeaderStyles';
import {cardType} from '_constants/general';
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
    MenuItem,
    ListItemText,
    ListItemIcon,
} from '@mui/material';
import MalePatient from '_assets/images/male-patient.png';
import FemalePatient from '_assets/images/female-patient.png';
import {StatusPaper} from '_components/shared/StyledComponent';
import menuItems from '../../_constants/Menu';
import MenuPopup from '_components/shared/Menu';
import {MoreHoriz} from '@mui/icons-material';
import {
    selectAction,
    sortAction,
    switchDrawer,
    setSelectedPaidInvoice,
} from '../../_localReducers/tableReducer';
// import PropTypes from 'prop-types'

function InvoiceTable({
    tableData,
    selected,
    dispatchTable,
    rowsPerPage,
    page,
    order,
    orderBy,
}) {
    const [anchor, setAnchor] = useState(null);
    //Handle when check a row
    const handleSelect = id => e => {
        if (e.target.checked) {
            dispatchTable(selectAction([...selected, id]));
        } else {
            dispatchTable(
                selectAction(
                    [...selected].filter(i => i !== id),
                ),
            );
        }
    };
    //Handle when check all rows
    const handleSelectAll = e => {
        if (e.target.checked) {
            dispatchTable(
                selectAction(tableData.map(row => row.id)),
            );
        } else {
            dispatchTable(selectAction([]));
        }
    };
    const handleActions =
        (action, key = '') =>
        e => {
            switch (action) {
                case 'sort':
                    dispatchTable(sortAction(key));
                    break;
                case 'filter':
                    return;
                default:
                    return;
            }
        };
    const openMenu = id => e => {
        setAnchor(e.currentTarget);
        dispatchTable(setSelectedPaidInvoice(id));
    };
    const closeMenu = _ => {
        setAnchor(null);
    };
    const openDrawer = _ => {
        dispatchTable(switchDrawer(true));
        setAnchor(null);
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
                                width: '20px',
                            }}
                            type="th"
                            align="right"
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
                            <p>{row.patientName}</p>
                            <Typography color="#888">
                                {row.phone}
                            </Typography>
                        </Box>
                    </TableCell>
                    <TableCell type="td">
                        {row.createAt}
                    </TableCell>
                    <TableCell type="td">
                        {cardType[row.type]}
                    </TableCell>
                    <TableCell type="td">
                        {row.doctor}
                    </TableCell>
                    <TableCell type="td">
                        <StatusPaper
                            fontSize="1.4rem"
                            status={
                                row.expense
                                    ? 'success'
                                    : 'error'
                            }
                        >
                            {row.expense ||
                                'Chưa thanh toán'}
                        </StatusPaper>
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
                        <IconButton
                            onClick={openMenu(row.id)}
                        >
                            {' '}
                            <MoreHoriz
                                sx={{fontSize: '1.6rem'}}
                            />
                        </IconButton>
                        <MenuPopup
                            anchor={anchor}
                            closeMenu={closeMenu}
                            menuItems={menuItems}
                            renderItem={({
                                id,
                                icon: Icon = null,
                                label = '',
                                style = {},
                            }) => (
                                <MenuItem
                                    key={id}
                                    onClick={openDrawer}
                                >
                                    {Icon && (
                                        <ListItemIcon>
                                            <Icon
                                                sx={{
                                                    ...style,
                                                }}
                                            />
                                        </ListItemIcon>
                                    )}
                                    <ListItemText
                                        sx={{...style}}
                                    >
                                        {label}
                                    </ListItemText>
                                </MenuItem>
                            )}
                        />
                    </TableCell>
                </TableRow>
            )}
        />
    );
}

InvoiceTable.propTypes = {};

export default memo(InvoiceTable);
