import React, {memo, useState} from 'react';
import {Table, TableCell} from '_components/shared/Table2';
import {headCells} from '../../_constants/HeadCells';
import menuItems from '../../_constants/Menu';
import {tableHeadCellStyles} from '_constants/TableHeaderStyles';
import {
    Avatar,
    Box,
    Typography,
    IconButton,
    MenuItem,
    ListItemText,
    ListItemIcon,
} from '@mui/material';
import {MoreHoriz} from '@mui/icons-material';
import MalePatient from '_assets/images/male-patient.png';
import FemalePatient from '_assets/images/female-patient.png';
import MenuPopup from '_components/shared/Menu';
import {statusText} from '_constants/general';
import {StatusPaper} from '_components/shared/StyledComponent';
import {styled} from '@mui/material/styles';
// import PropTypes from 'prop-types'

const BodyCell = styled(TableCell)`
    text-align: left;
    height: 60px;
    font-size: 1.5rem;
`;
const getOpacity = status => (status ? 1 : 0.5);

function TableContent({tableData = []}) {
    const [anchor, setAnchor] = useState(null);
    const openMenu = e => {
        setAnchor(e.currentTarget);
    };
    const closeMenu = e => {
        setAnchor(null);
    };
    return (
        <Table
            sx={{
                borderCollapse: 'collapse',
                userSelect: 'none',
                fontSize: '1.5rem',
                width: '100%',
                height: '100%',
            }}
            data={tableData}
            pagination
            rowsPerPage={8}
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
                            opacity: getOpacity(row.status),
                        }}
                    >
                        {row.id}
                    </BodyCell>
                    <BodyCell
                        type="td"
                        sx={{
                            opacity: getOpacity(row.status),
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
                    <BodyCell
                        type="td"
                        sx={{
                            opacity: getOpacity(row.status),
                        }}
                    >
                        {row.type ? 'Tái khám' : 'Khám mới'}
                    </BodyCell>
                    <BodyCell
                        type="td"
                        sx={{
                            opacity: getOpacity(row.status),
                        }}
                    >
                        {row.time}
                    </BodyCell>
                    <BodyCell
                        type="td"
                        sx={{
                            opacity: getOpacity(row.status),
                        }}
                    >
                        <StatusPaper
                            status={
                                statusText[row.status]
                                    ?.style
                            }
                        >
                            {statusText[row.status]?.text}
                        </StatusPaper>
                    </BodyCell>
                    <BodyCell
                        type="td"
                        sx={{
                            width: '45px',
                            opacity: getOpacity(row.status),
                            '& svg': {
                                opacity: 0.5,
                                transition: 'opacity .3s',
                            },
                        }}
                    >
                        <IconButton onClick={openMenu}>
                            <MoreHoriz
                                sx={{fontSize: '1.6rem'}}
                            />
                        </IconButton>
                        <MenuPopup
                            anchor={anchor}
                            closeMenu={closeMenu}
                            menuItems={menuItems}
                            renderItem={({
                                id,
                                icon: Icon = null,
                                label = '',
                                style = {},
                            }) => (
                                <MenuItem key={id}>
                                    {Icon && (
                                        <ListItemIcon>
                                            <Icon
                                                sx={{
                                                    ...style,
                                                }}
                                            />
                                        </ListItemIcon>
                                    )}
                                    <ListItemText
                                        sx={{...style}}
                                    >
                                        {label}
                                    </ListItemText>
                                </MenuItem>
                            )}
                        />
                    </BodyCell>
                </>
            )}
        />
    );
}

TableContent.propTypes = {};

export default memo(TableContent);
