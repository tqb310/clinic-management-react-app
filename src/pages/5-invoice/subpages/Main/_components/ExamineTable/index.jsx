import React, {memo, useState, Fragment} from 'react';
import {useDispatch} from 'react-redux';
import {headCells} from '../../_constants/HeadCells';
import {cardType} from '_constants/general';
import {Table, TableCell} from '_components/shared/Table2';
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
import {tableHeadCellStyles} from '_constants/TableHeaderStyles';
import MenuPopup from '_components/shared/Menu';
import {MoreHoriz} from '@mui/icons-material';
import {
    selectData,
    setSelectedPaidInvoice,
    switchDrawer,
} from '_redux/slice/invoiceSlice';
import {styled} from '@mui/material/styles';
// import PropTypes from 'prop-types'

const BodyCell = styled(TableCell)`
    text-align: left;
    height: 60px;
    font-size: 1.5rem;
`;

function InvoiceTable({tableData, selected}) {
    const dispatch = useDispatch();
    const [anchor, setAnchor] = useState(null);
    //Handle when check a row
    const handleSelect = id => e => {
        if (e.target.checked) {
            dispatch(selectData([...selected, id]));
        } else {
            dispatch(
                selectData(
                    [...selected].filter(i => i !== id),
                ),
            );
        }
    };
    //Handle when check all rows
    const handleSelectAll = e => {
        if (e.target.checked) {
            dispatch(
                selectData(tableData.map(row => row.id)),
            );
        } else {
            dispatch(selectData([]));
        }
    };
    const openMenu = id => e => {
        setAnchor(e.currentTarget);
        dispatch(setSelectedPaidInvoice(id));
    };
    const closeMenu = _ => {
        setAnchor(null);
    };
    const openDrawer = _ => {
        dispatch(switchDrawer(true));
        setAnchor(null);
    };
    return (
        <Table
            sx={{
                borderCollapse: 'collapse',
                userSelect: 'none',
                width: '100%',
            }}
            data={tableData}
            hoverStyle={{
                backgroundColor: '#f8f8f8',
                '& svg': {opacity: 1},
            }}
            activeStyle={{
                backgroundColor: '#f8f8f8',
                '& svg': {opacity: 1},
            }}
            pagination
            rowsPerPage={8}
            selected={selected}
            header={() => {
                return (
                    <>
                        <TableCell
                            sx={{
                                width: '20px',
                                ...tableHeadCellStyles,
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
                                    ...rest
                                }) => (
                                    <TableCell
                                        key={id}
                                        type="th"
                                        sx={{
                                            ...style,
                                            ...tableHeadCellStyles,
                                        }}
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
                    </>
                );
            }}
            renderDataRow={row => (
                <>
                    <BodyCell
                        type="td"
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
                    </BodyCell>
                    <BodyCell
                        type="td"
                        sx={{
                            textAlign: 'center',
                        }}
                    >
                        {row.id}
                    </BodyCell>
                    <BodyCell
                        type="td"
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
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
                    </BodyCell>
                    <BodyCell type="td">
                        {row.create_at}
                    </BodyCell>
                    <BodyCell type="td">
                        {cardType[row.type]}
                    </BodyCell>
                    <BodyCell type="td">
                        <StatusPaper
                            fontSize="1.4rem"
                            status={
                                row.total_fee
                                    ? 'success'
                                    : 'error'
                            }
                        >
                            {row.total_fee ||
                                'Chưa thanh toán'}
                        </StatusPaper>
                    </BodyCell>
                    <BodyCell
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
                    </BodyCell>
                </>
            )}
        />
    );
}

InvoiceTable.propTypes = {};

export default memo(InvoiceTable);
