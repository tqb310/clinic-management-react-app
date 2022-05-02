import React, {memo, useEffect, useState} from 'react';
import {
    CustomPaper,
    StatusPaper,
} from '_components/shared/StyledComponent';
import {
    Typography,
    Avatar,
    IconButton,
    Box,
} from '@mui/material';
import MalePatient from '_assets/images/male-patient.png';
import FemalePatient from '_assets/images/female-patient.png';
import {Table, TableCell} from '_components/shared/Table2';
import {headCells} from './headCells';
import {styled} from '@mui/material/styles';
import {tableHeadCellStyles} from '_constants/TableHeaderStyles';
import {statusText} from '_constants/general';
import {MoreHoriz} from '@mui/icons-material';
import {useSelector} from 'react-redux';
import {
    compare2Days,
    formatDate,
} from '_helpers/handleDate';
import './index.scss';
// import PropTypes from 'prop-types'

const BodyCell = styled(TableCell)`
    text-align: left;
    height: 60px;
    font-size: 1.5rem;
`;

function Appointment(props) {
    const appointments = useSelector(
        state => state.appointments.data,
    );
    const [todayAppointments, setTodayAppointments] =
        useState([]);
    useEffect(() => {
        if (appointments) {
            const tempAppointments = appointments.filter(
                item =>
                    !compare2Days(
                        new Date(formatDate(item.date)),
                        new Date(),
                    ),
            );
            setTodayAppointments(tempAppointments);
        }
    }, [appointments]);
    return (
        <CustomPaper className="Appointment">
            <div className="Appointment__title">
                <Typography variant="h5" sx={{mb: 2}}>
                    Lịch hẹn hôm nay
                </Typography>
            </div>
            <Table
                sx={{
                    borderCollapse: 'collapse',
                    userSelect: 'none',
                    fontSize: '1.5rem',
                    width: '100%',
                    height: '100%',
                }}
                data={todayAppointments}
                pagination
                rowsPerPage={7}
                hoverStyle={{
                    backgroundColor: '#f8f8f8',
                    opacity: 1,
                    '& svg': {opacity: 1},
                }}
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
                        <BodyCell type="td" sx={{}}>
                            {row.type
                                ? 'Tái khám'
                                : 'Khám mới'}
                        </BodyCell>
                        <BodyCell type="td" sx={{}}>
                            {row.time}
                        </BodyCell>
                        <BodyCell type="td" sx={{}}>
                            <StatusPaper
                                status={
                                    statusText[row.status]
                                        ?.style
                                }
                            >
                                {
                                    statusText[row.status]
                                        ?.text
                                }
                            </StatusPaper>
                        </BodyCell>
                        <BodyCell
                            type="td"
                            sx={{
                                width: '45px',
                                // opacity: getOpacity(row.status),
                                '& svg': {
                                    opacity: 0.5,
                                    transition:
                                        'opacity .3s',
                                },
                            }}
                        >
                            <IconButton onClick={null}>
                                <MoreHoriz
                                    sx={{
                                        fontSize: '1.6rem',
                                    }}
                                />
                            </IconButton>
                        </BodyCell>
                    </>
                )}
            />
        </CustomPaper>
    );
}

Appointment.propTypes = {};

export default memo(Appointment);
