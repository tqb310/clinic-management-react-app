import React, {memo, useState} from 'react';
import {
    CustomPaper,
    StatusPaper,
} from '_components/shared/StyledComponent';
import {
    Typography,
    Avatar,
    IconButton,
    Box,
    Tooltip,
} from '@mui/material';
import MalePatient from '_assets/images/male-patient.png';
import FemalePatient from '_assets/images/female-patient.png';
import {Table, TableCell} from '_components/shared/Table';
import {headCells} from './headCells';
import {styled} from '@mui/material/styles';
import {tableHeadCellStyles} from '_constants/TableHeaderStyles';
import {statusText} from '_constants/general';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import queueService from '_services/firebase/queue.service';
import Toast from '_components/shared/Toast';
import './index.scss';
// import PropTypes from 'prop-types'

const BodyCell = styled(TableCell)`
    text-align: left;
    height: 60px;
    font-size: 1.5rem;
`;

function Appointment({
    todayAppointments,
    nextPatient,
    loading,
}) {
    const [openToast, setOpenToast] = useState(false);

    const addToQueue =
        (patientId, appointmentId, type) => async e => {
            try {
                await queueService.addToQueueWithAppointment(
                    {
                        patientId,
                        appointmentId,
                        type,
                    },
                );
                setOpenToast(_ => true);
            } catch (err) {
                throw err;
            }
        };

    const closeToast = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenToast(false);
    };
    return (
        <CustomPaper className="Appointment">
            <Toast
                open={openToast}
                handleClose={closeToast}
                vertical="bottom"
                horizontal="left"
            >
                Đưa vào hàng đợi thành công
            </Toast>
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
                data={todayAppointments.filter(item =>
                    parseInt(item?.status),
                )}
                loading={loading}
                pagination
                rowsPerPage={7}
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
                renderDataRow={(row, index) => (
                    <>
                        <BodyCell
                            type="td"
                            sx={{
                                textAlign: 'center',
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
                            {row.status === 1 &&
                                row.id === nextPatient && (
                                    <Tooltip
                                        title="Đưa vào hàng đợi"
                                        followCursor
                                    >
                                        <IconButton
                                            onClick={addToQueue(
                                                row.patient_id,
                                                row.id,
                                                row.type,
                                            )}
                                        >
                                            <AddCircleIcon
                                                sx={{
                                                    fontSize:
                                                        '1.8rem',
                                                }}
                                            />
                                        </IconButton>
                                    </Tooltip>
                                )}
                        </BodyCell>
                    </>
                )}
            />
        </CustomPaper>
    );
}

Appointment.propTypes = {};

export default memo(Appointment);
