import React, {useEffect} from 'react';
import {CustomPaper} from '_components/shared/StyledComponent';
import {Typography, Button, Box} from '@mui/material';
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
    useEffect(() => {
        dispatch(setDataAsync());
    }, []);

    return (
        <>
            <CustomPaper sx={{px: 3, py: 2}}>
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
