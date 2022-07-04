import React, {useEffect, useState} from 'react';
import {CustomPaper} from '_components/shared/StyledComponent';
import {Typography, Button, Box} from '@mui/material';
import {Add} from '@mui/icons-material';
import {useDispatch, useSelector} from 'react-redux';
import EmployeeTable from './components/EmployeeTable';
import {
    setSelectedEmployee,
    setDataAsync,
} from '_redux/slice/employeeSlice';
import employeeServices from '_services/firebase/employee.service';
import {RightBar} from '_components/shared/StyledComponent';
import RightBarContent from './components/RightBarContent';
import Toast from '_components/shared/Toast';
import {useFirestoreRealtime} from '_hooks';
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

    const onSubmit = async values => {
        try {
            await employeeServices.update(
                selectedEmployee.id,
                values,
            );
        } catch (error) {
            throw error;
        }
    };

    const firestoreRealtime = useFirestoreRealtime({
        collectionName: 'users',
        eventHandler: () => {
            dispatch(setDataAsync());
        },
    });

    useEffect(() => {
        const unsub = firestoreRealtime();
        return unsub;
    }, []);

    return (
        <>
            <CustomPaper sx={{px: 3, py: 2}}>
                <Toast
                    open={open}
                    handleClose={handleClose}
                    status="info"
                >
                    TÍNH NĂNG ĐANG PHÁT TRIỂN
                </Toast>
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
                    onSubmit={onSubmit}
                />
            </RightBar>
        </>
    );
}

Employee.propTypes = {};

export default Employee;
