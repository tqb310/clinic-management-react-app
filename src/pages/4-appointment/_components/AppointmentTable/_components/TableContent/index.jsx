import React, {memo, useState} from 'react';
import {Table, TableCell} from '_components/shared/Table';
import {headCells} from '../../_constants/HeadCells';
import menuItems from '../../_constants/Menu';
import {tableHeadCellStyles} from '_constants/TableHeaderStyles';
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
import {StatusPaper} from '_components/shared/StyledComponent';
import {styled} from '@mui/material/styles';
import {setSelectedAppointment} from '_redux/slice/appointmentSlice';
import {useDispatch} from 'react-redux';
import {
    compare2Days,
    formatDate,
} from '_helpers/handleDate';
// import PropTypes from 'prop-types'

const BodyCell = styled(TableCell)`
    text-align: left;
    height: 60px;
    font-size: 1.5rem;
`;
const getCancelledStyle = status =>
    status
        ? {opacity: 1}
        : {
              opacity: 0.6,
              '&::after': {
                  position: 'absolute',
                  content: '""',
                  width: '100%',
                  height: '1.5px',
                  backgroundColor: '#bbb',
                  top: '52%',
                  left: 0,
              },
          };

function TableContent({
    tableData = [],
    openToast,
    openAlertDialog,
    nextPatient,
    selectedAppointment = {},
    loading = {loading},
}) {
    const dispatch = useDispatch();
    const [anchor, setAnchor] = useState(null);
    const openMenu = id => e => {
        dispatch(setSelectedAppointment(id));
        setAnchor(e.currentTarget);
    };
    const closeMenu = e => {
        setAnchor(null);
    };

    // const handleOpenAppointmentDetail = e => {
    //     dispatch(openAppointmentDetail(true));
    // };
    return (
        <Table
            sx={{
                borderCollapse: 'collapse',
                userSelect: 'none',
                fontSize: '1.5rem',
                width: '100%',
                height: '100%',
            }}
            data={tableData}
            pagination
            loading={loading}
            rowsPerPage={5}
            columnNumber={headCells.length}
            header={() => {
                return (
                    <>
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
                                            ...tableHeadCellStyles,
                                            ...style,
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
                            position: 'relative',
                            ...getCancelledStyle(
                                row.status,
                            ),
                        }}
                    >
                        {row.id
                            ?.slice(0, 4)
                            .padStart(4, '0')}
                    </BodyCell>
                    <BodyCell
                        type="td"
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            ...getCancelledStyle(
                                row.status,
                            ),
                            position: 'relative',
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
                            <p>
                                {row.last_name +
                                    ' ' +
                                    row.first_name}
                            </p>
                            <Typography color="#888">
                                {row.phone}
                            </Typography>
                        </Box>
                    </BodyCell>
                    <BodyCell
                        type="td"
                        sx={{
                            ...getCancelledStyle(
                                row.status,
                            ),
                            position: 'relative',
                        }}
                    >
                        {row.type ? 'Tái khám' : 'Khám mới'}
                    </BodyCell>
                    <BodyCell
                        type="td"
                        sx={{
                            ...getCancelledStyle(
                                row.status,
                            ),
                            position: 'relative',
                        }}
                    >
                        {row.time}
                    </BodyCell>
                    <BodyCell
                        type="td"
                        sx={{
                            ...getCancelledStyle(
                                row.status,
                            ),
                            position: 'relative',
                        }}
                    >
                        <StatusPaper
                            status={
                                statusText[row.status]
                                    ?.style
                            }
                        >
                            {statusText[row.status]?.text}
                        </StatusPaper>
                    </BodyCell>
                    <BodyCell
                        type="td"
                        sx={{
                            width: '45px',
                            ...getCancelledStyle(
                                row.status,
                            ),
                            position: 'relative',
                            '& svg': {
                                opacity: 0.5,
                                transition: 'opacity .3s',
                            },
                        }}
                    >
                        <IconButton
                            onClick={openMenu(row.id)}
                        >
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
                                onClick = _ => {},
                            }) => (
                                <MenuItem
                                    key={id}
                                    disabled={
                                        (id === 1 &&
                                            (selectedAppointment?.status !==
                                                1 ||
                                                selectedAppointment?.id !==
                                                    nextPatient ||
                                                compare2Days(
                                                    new Date(),
                                                    new Date(
                                                        formatDate(
                                                            selectedAppointment?.date,
                                                        ),
                                                    ),
                                                ) !== 0)) ||
                                        (id === 2 &&
                                            selectedAppointment?.status !==
                                                1)
                                    }
                                    onClick={onClick(
                                        dispatch,
                                        closeMenu,
                                        {
                                            patient_id:
                                                row.patient_id,
                                            appointment_id:
                                                row.id,
                                            type: row.type,
                                        },
                                        {
                                            openAlertDialog,
                                            openToast,
                                        },
                                    )}
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

TableContent.propTypes = {};

export default memo(TableContent);
