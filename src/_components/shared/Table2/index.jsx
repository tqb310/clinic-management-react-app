import React, {memo, useState} from 'react';
import {Box} from '@mui/material';
import './index.scss';
// import PropTypes from 'prop-types'

export const Table = memo(function ({
    data,
    renderDataRow,
    header: Header,
    hoverStyle = {},
    activeStyle = {},
    selected = [],
    isRenderEmptyRow = true,
    rowsPerPage = 8,
    rowHeight = '61.5px',
    ...rest
}) {
    const [selectedState, setSelectedState] =
        useState(selected);
    return (
        <Box className="table-content">
            <Box component="table" {...rest}>
                <Box component="thead">
                    <Header
                        data={data}
                        selectedState={selectedState}
                        setSelectedState={setSelectedState}
                    />
                </Box>
                <Box component="tbody">
                    {data &&
                        data.map((row, index) => {
                            return renderDataRow(
                                row,
                                index,
                                {
                                    hoverStyle,
                                    activeStyle,
                                    selectedState,
                                    setSelectedState,
                                },
                            );
                        })}
                    {isRenderEmptyRow &&
                        data.length < rowsPerPage &&
                        Array.from(
                            new Array(
                                rowsPerPage - data.length,
                            ),
                            _ => (
                                <TableRow
                                    sx={{height: rowHeight}}
                                />
                            ),
                        )}
                </Box>
            </Box>
        </Box>
    );
});

export const TableHead = memo(function ({children}) {
    return <Box component="thead">{children}</Box>;
});

export const TableRow = memo(function ({
    children,
    sx,
    ...rest
}) {
    return (
        <Box component="tr" sx={sx} {...rest}>
            {children}
        </Box>
    );
});

export const TableCell = memo(function ({
    children,
    type,
    property = '',
    action = '',
    order = '',
    orderBy = '',
    icon: Icon = null,
    handleClick = null,
    ...rest
}) {
    return type === 'th' ? (
        <Box
            component="th"
            onClick={handleClick}
            className={action ? 'shared-table__th' : ''}
            {...rest}
        >
            {children}
            {Icon && (
                <Icon
                    className={`shared-table__th-action-icon ${action} ${
                        orderBy === property ? 'active' : ''
                    } ${order}`}
                />
            )}
        </Box>
    ) : (
        <Box component="td" {...rest}>
            {children}
        </Box>
    );
});

Table.propTypes = {};
