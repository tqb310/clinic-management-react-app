import React from 'react';
import PaperImage from '_assets/images/paper.png';
import {Edit} from '@mui/icons-material';
import {Typography, Box} from '@mui/material';
import EmployeeForm from '../EmployeeForm';

function RightBarContent({selectedEmployee, onSubmit}) {
    return (
        <Box sx={{p: 2}}>
            {' '}
            {selectedEmployee ? (
                <>
                    <Typography variant="h5" sx={{mb: 3}}>
                        Thông tin nhân viên
                    </Typography>
                    <EmployeeForm
                        selectedEmployee={selectedEmployee}
                        onSubmit={onSubmit}
                    />
                </>
            ) : (
                <>
                    <img
                        src={PaperImage}
                        alt="empty logo"
                        width={256}
                        style={{
                            marginTop: '160px',
                            opacity: 0.4,
                        }}
                    />
                    <p style={{marginTop: '100px'}}>
                        {' '}
                        Chọn{' '}
                        <Edit
                            sx={{
                                fontSize: '1.6rem',
                                mx: '5px',
                                transform:
                                    'translateY(3px)',
                                color: '#555',
                            }}
                        />{' '}
                        để xem & sửa thông tin nhân viên
                    </p>
                </>
            )}
        </Box>
    );
}

export default RightBarContent;
