import React, {memo, Fragment} from 'react';
import {Add, Search, FilterList} from '@mui/icons-material';
import {
    Button,
    Typography,
    Box,
    InputBase,
} from '@mui/material';
import {CustomPaper} from '_components/shared/StyledComponent';
// import {compare2Days} from '_helpers/handleDate';
import Form from '../AppointmentForm';
import NoResultDate from './_assets/no-date-result.png';
import Calendar from './_components/Calendar';
import TableContent from './_components/TableContent';
import {useDispatch} from 'react-redux';
import {setOpenForm} from '_redux/slice/appointmentSlice';

// import {
//     reducer,
//     initState,
//     nextPageAction,
//     backPageAction,
//     switchForm,
//     resetTableAction,
// } from './_localReducers/appointmentTableReducer';
import './index.scss';

function AppointmentTable({data = {}}) {
    const dispatch = useDispatch();
    const handleSubmit = value => {
        // console.log(value);
    };
    const handleOpen = e => {
        dispatch(setOpenForm(true));
    };
    const handleClose = e => {
        dispatch(setOpenForm(false));
    };

    return (
        <CustomPaper className="content-container">
            <Box className="content-header">
                <Typography variant="h5">
                    Lịch hẹn
                </Typography>
            </Box>
            <Calendar data={data.data} />
            <Box className="appointment__actions">
                <Box className="table-container__search">
                    <Search className="icon" />
                    <InputBase
                        className="input"
                        placeholder="Tên, số điện thoại ..."
                    />
                </Box>
                <Button
                    sx={{ml: 1}}
                    variant="outlined"
                    startIcon={<FilterList />}
                >
                    Lọc
                </Button>
                <Button
                    sx={{ml: 1}}
                    variant="outlined"
                    startIcon={<Add />}
                    onClick={handleOpen}
                >
                    Tạo
                </Button>
                <Form
                    open={data.isOpenForm}
                    handleClose={handleClose}
                    handleSubmit={handleSubmit}
                />
            </Box>
            <Box className="appointment-wrapper">
                {data.dataByDate &&
                data.dataByDate.length ? (
                    <Fragment>
                        <TableContent
                            tableData={data.dataByDate}
                            selected={data.selected}
                        />
                    </Fragment>
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
