import React, {memo, useState} from 'react';
import {
    Table,
    TableRow,
    TableCell,
} from '_components/shared/Table2';
import {headCells} from '../../_constants/HeadCells';
import menuItems from '../../_constants/Menu';
import {
    tableCellStyles,
    tableHeadCellStyles,
    tableHeadRowStyles,
    tableRowStyles,
} from '_constants/TableHeaderStyles';
import {
    Avatar,
    Box,
    Typography,
    IconButton,
    MenuItem,
    ListItemText,
    ListItemIcon,
} from '@mui/material';
import {MoreHoriz} from '@mui/icons-material';
import MalePatient from '_assets/images/male-patient.png';
import FemalePatient from '_assets/images/female-patient.png';
import MenuPopup from '_components/shared/Menu';
import {statusText} from '_constants/general';
import {sortAction} from '../../_localReducers/appointmentTableReducer';
import {StatusPaper} from '_components/shared/StyledComponent';
// import PropTypes from 'prop-types'

function TableContent({
    tableData = [],
    localDispatch = null,
    rowsPerPage = 8,
    page = 0,
    order = '',
    orderBy = '',
}) {
    const [anchor, setAnchor] = useState(null);
    const handleActions =
        (action, key = '') =>
        e => {
            switch (action) {
                case 'sort':
                    localDispatch(sortAction(key));
                    break;
                case 'filter':
                    return;
                default:
                    return;
            }
        };
    const openMenu = e => {
        setAnchor(e.currentTarget);
    };
    const closeMenu = e => {
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
                opacity: 1,
                '& svg': {opacity: 1},
            }}
            header={() => {
                return (
                    <TableRow sx={tableHeadRowStyles}>
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
            renderDataRow={(row, index, {hoverStyle}) => (
                <TableRow
                    key={index}
                    sx={{
                        opacity: !row.status ? 0.2 : 1,
                        ...tableRowStyles,
                        '&:hover': {
                            ...hoverStyle,
                        },
                    }}
                >
                    <TableCell
                        type="td"
                        sx={{
                            pl: '1rem',
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
                        {row.time}
                    </TableCell>
                    <TableCell type="td">
                        {row.doctor}
                    </TableCell>
                    <TableCell type="td">
                        <StatusPaper
                            status={
                                statusText[row.status]
                                    ?.style
                            }
                        >
                            {statusText[row.status]?.text}
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
                        <IconButton onClick={openMenu}>
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
                                <MenuItem key={id}>
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

TableContent.propTypes = {};

export default memo(TableContent);
