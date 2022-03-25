import React, {useState, memo, useRef} from 'react';
import {Add} from '@mui/icons-material';
import {Button, Typography, Box} from '@mui/material';
import {CustomPaper} from '_components/shared/StyledComponent';
import {compare2Days} from '_helpers/handleDate';
import Form from '../AppointmentForm';
import NoResultDate from './assets/no-date-result.png';
// import Table from '_components/shared/Table';
// import {AppointmentHeadCells} from '_constants/headCell';
// import {
//     stateData,
//     // rows,
//     examineType,
// } from '_constants/FakeData/AppointmentRequest';
import Calendar from './_components/Calendar';
import TableContent from './_components/TableContent';
import './index.scss';
// import { Scrollbars } from 'react-custom-scrollbars-2';

function AppointmentTable(props) {
    const [openForm, setOpenForm] = useState(false);
    const dayActive = useRef(new Date()).current;
    const filteredData = props.data.filter(
        appointment =>
            compare2Days(
                new Date(appointment.TIMES),
                dayActive,
            ) === true,
    );
    const afterHandledData = filteredData.map(
        (data, index) => {
            return {
                id: Math.random()
                    .toString(32)
                    .substr(2, 10),
                orderNum: index + 1,
                patientName: data.PATIENT_NAME,
                checkIn: `${(
                    '0' +
                    new Date(
                        data.TIMES.toString().slice(0, 21),
                    ).getHours()
                ).slice(-2)}:${(
                    '0' +
                    new Date(
                        data.TIMES.toString().slice(0, 21),
                    ).getMinutes()
                ).slice(-2)}`,
                room: data.EMPLOYEE_NAME,
                state: 0,
                type: data.TYPE,
            };
        },
    );
    // console.log(filteredData);
    const [selectId, setSelectId] = useState(
        afterHandledData[0]?.id || '',
    );
    // SUBMIT DATA
    const handleSubmit = value => {
        console.log(value);
    };
    //
    const handleClose = e => {
        // console.log(e);
        setOpenForm(false);
    };

    return (
        <CustomPaper className="content-container">
            <Box className="content-header">
                <Typography variant="h5">
                    Lịch hẹn
                </Typography>
            </Box>
            <Calendar
                data={[
                    {TIMES: new Date()},
                    {
                        TIMES: new Date(
                            Date.now() - 86400000,
                        ),
                    },
                ]}
            />
            <Box className="appointment__addbtn">
                <Button
                    style={{
                        marginTop: '0rem',
                        marginLeft: '40%',
                        fontSize: 13,
                        color: '#2E3192',
                    }}
                    startIcon={<Add />}
                    onClick={() => {
                        setOpenForm(true);
                    }}
                >
                    Thêm
                </Button>
                <Form
                    open={openForm}
                    handleClose={handleClose}
                    handleSubmit={handleSubmit}
                />
            </Box>
            <Box className="appointment-wrapper">
                {1 ? (
                    <TableContent />
                ) : (
                    <Box className="appointment__no-data">
                        <img
                            src={NoResultDate}
                            className="appointment__no-data-img"
                            alt="No results"
                            width="512"
                        />
                    </Box>
                )}
            </Box>
        </CustomPaper>
    );
}

export default memo(AppointmentTable);
