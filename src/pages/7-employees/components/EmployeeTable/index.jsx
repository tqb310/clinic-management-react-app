import React from 'react';
import headCells from '../../constants/headCells';
import {Table, TableCell} from '_components/shared/Table2';
import {tableHeadCellStyles} from '_constants/TableHeaderStyles';
import {
    Typography,
    Avatar,
    Box,
    IconButton,
} from '@mui/material';
import MalePatient from '_assets/images/male-patient.png';
import FemalePatient from '_assets/images/female-patient.png';
import {Edit, Delete} from '@mui/icons-material';
import {styled} from '@mui/material/styles';

const BodyCell = styled(TableCell)`
    text-align: left;
    height: 60px;
    font-size: 1.5rem;
`;

function EmployeeTable({
    tableData,
    selectedEmployee,
    handleSelectEmployee,
    setOpenToast,
}) {
    return (
        <Table
            sx={{
                borderCollapse: 'collapse',
                userSelect: 'none',
                width: '100%',
            }}
            data={tableData}
            hoverStyle={{
                backgroundColor: '#f8f8f8',
                '& svg': {opacity: 1},
            }}
            activeStyle={{
                backgroundColor: '#f8f8f8',
                '& svg': {opacity: 1},
            }}
            pagination
            rowsPerPage={8}
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
                        {row.id
                            .slice(0, 4)
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
                            <p>{row.name}</p>
                            <Typography color="#888">
                                {row.phone}
                            </Typography>
                        </Box>
                    </BodyCell>
                    <BodyCell type="td">{row.dob}</BodyCell>
                    <BodyCell type="td">
                        {row.gender ? 'Nam' : 'Nữ'}
                    </BodyCell>
                    <BodyCell type="td">
                        {row.address}
                    </BodyCell>
                    <BodyCell
                        type="td"
                        sx={{
                            width: '45px',
                        }}
                    >
                        <IconButton
                            onClick={handleSelectEmployee(
                                row.id,
                            )}
                            sx={{
                                opacity:
                                    selectedEmployee &&
                                    selectedEmployee.id ===
                                        row.id
                                        ? 1
                                        : 0.2,
                                transition:
                                    'opacity .3s ease',
                                '&:hover': {
                                    opacity: 1,
                                },
                            }}
                        >
                            <Edit color="primary" />
                        </IconButton>
                    </BodyCell>
                    <BodyCell
                        type="td"
                        sx={{
                            width: '45px',
                        }}
                    >
                        <IconButton
                            onClick={setOpenToast.bind(
                                null,
                                true,
                            )}
                            sx={{
                                opacity: 0.2,
                                transition: 'opacity .3s',
                                '&:hover': {opacity: 1},
                            }}
                        >
                            <Delete color="error" />
                        </IconButton>
                    </BodyCell>
                </>
            )}
        />
    );
}

export default EmployeeTable;
