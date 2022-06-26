import React, {useEffect, useState} from 'react';
import {CustomPaper} from '_components/shared/StyledComponent';
import {
    Typography,
    Button,
    Box,
    Alert,
    Snackbar,
} from '@mui/material';
import {Add} from '@mui/icons-material';
import {useDispatch, useSelector} from 'react-redux';
import EmployeeTable from './components/EmployeeTable';
import {
    setSelectedEmployee,
    setDataAsync,
} from '_redux/slice/employeeSlice';
import {RightBar} from '_components/shared/StyledComponent';
import RightBarContent from './components/RightBarContent';
import './index.scss';
// import PropTypes from 'prop-types';

function Employee(props) {
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();
    const employeeData = useSelector(
        state => state.employees.data,
    );
    const selectedEmployee = useSelector(
        state => state.employees.selectedEmployee,
    );

    const handleSelectEmployee = employeeId => e => {
        dispatch(setSelectedEmployee(employeeId));
    };
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };
    useEffect(() => {
        dispatch(setDataAsync());
    }, []);

    return (
        <>
            <CustomPaper sx={{px: 3, py: 2}}>
                <Snackbar
                    open={open}
                    autoHideDuration={3000}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                >
                    <Alert
                        onClose={handleClose}
                        severity="info"
                        sx={{width: '100%'}}
                    >
                        TÍNH NĂNG ĐANG PHÁT TRIỂN
                    </Alert>
                </Snackbar>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        pb: 2,
                    }}
                >
                    <Typography variant="h5">
                        Danh sách nhân viên
                    </Typography>
                    <Button
                        variant="outlined"
                        startIcon={<Add />}
                        onClick={setOpen.bind(null, true)}
                    >
                        Thêm
                    </Button>
                </Box>
                <EmployeeTable
                    tableData={employeeData}
                    selectedEmployee={selectedEmployee}
                    handleSelectEmployee={
                        handleSelectEmployee
                    }
                    setOpenToast={setOpen}
                />
            </CustomPaper>
            <RightBar>
                <RightBarContent
                    selectedEmployee={selectedEmployee}
                />
            </RightBar>
        </>
    );
}

Employee.propTypes = {};

export default Employee;
