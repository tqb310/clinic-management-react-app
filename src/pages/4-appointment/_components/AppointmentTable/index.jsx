import React, {
    memo,
    useRef,
    Fragment,
    useReducer,
} from 'react';
import {
    Add,
    Search,
    FilterList,
    RestartAltOutlined,
} from '@mui/icons-material';
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
import Pagination from '_components/shared/Pagination';
import {
    reducer,
    initState,
    nextPageAction,
    backPageAction,
    switchForm,
    resetTableAction,
} from './_localReducers/appointmentTableReducer';
import './index.scss';

function AppointmentTable({data}) {
    const [state, localDispatch] = useReducer(reducer, {
        ...initState,
        data,
    });
    const preservedData = useRef([...data]).current;

    const handleSubmit = value => {
        // console.log(value);
    };
    const handleOpen = e => {
        localDispatch(switchForm(true));
    };
    const handleClose = e => {
        localDispatch(switchForm(false));
    };
    const handleNextPage = e => {
        localDispatch(nextPageAction());
    };
    const handleBackPage = e => {
        localDispatch(backPageAction());
    };
    const handleResetData = e => {
        localDispatch(resetTableAction([...preservedData]));
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
            <Box className="appointment__actions">
                <Box className="table-container__search">
                    <Search className="icon" />
                    <InputBase
                        className="input"
                        placeholder="Tên, số điện thoại ..."
                    />
                </Box>
                <Button
                    sx={{ml: 'auto'}}
                    variant="outlined"
                    startIcon={<RestartAltOutlined />}
                    onClick={handleResetData}
                >
                    Tái thiết
                </Button>
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
                    open={state.isOpen}
                    handleClose={handleClose}
                    handleSubmit={handleSubmit}
                />
            </Box>
            <Box className="appointment-wrapper">
                {1 ? (
                    <Fragment>
                        <TableContent
                            tableData={state.data}
                            rowsPerPage={state.rowsPerPage}
                            page={state.page}
                            selected={state.selected}
                            localDispatch={localDispatch}
                            order={state.order}
                            orderBy={state.orderBy}
                        />
                        <Pagination
                            handleNextPage={handleNextPage}
                            handleBackPage={handleBackPage}
                            pageTotal={state.data.length}
                            currentPage={state.page}
                            rowsPerPage={state.rowsPerPage}
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
