import React, {
    memo,
    createContext,
    useReducer,
    useEffect,
    useContext,
    useRef,
} from 'react';
import {Box, Button} from '@mui/material';
import {RestartAlt} from '@mui/icons-material';
import Pagination from '_components/shared/Pagination';
import {
    reducer,
    initState,
    nextPageAction,
    backPageAction,
    setDataAction,
    sortAction,
    resetTableAction,
} from './reducer';
import NoData from 'pages/4-appointment/_components/AppointmentTable/_assets/no-date-result.png';
import {Skeleton} from '@mui/material';
import './index.scss';
// import PropTypes from 'prop-types'

export const TableContext = createContext();

export const Table = function ({
    data,
    renderDataRow,
    header: Header,
    hoverStyle = {},
    activeStyle = {},
    selected = [],
    isRenderEmptyRow = true,
    rowsPerPage = 0,
    rowHeight = '61.5px',
    pagination = false,
    loading,
    columnNumber = 1,
    ...rest
}) {
    const preservedData = useRef(data).current;
    // console.log(preservedData);
    const [tableState, dispatchTable] = useReducer(
        reducer,
        {...initState, data},
    );

    const {data: localData, page} = tableState;

    useEffect(() => {
        dispatchTable(resetTableAction(data));
        dispatchTable(setDataAction(data));
    }, [data]);

    const handleNextPage = _ => {
        dispatchTable(nextPageAction());
    };
    //Invoking when click on next page
    const handleBackPage = _ => {
        dispatchTable(backPageAction());
    };

    const handleResetData = _ => {
        dispatchTable(resetTableAction([...preservedData]));
    };
    return (
        <TableContext.Provider
            value={{tableState, dispatchTable}}
        >
            <Box component="table" {...rest}>
                <Box component="thead">
                    <TableRow>
                        <Header
                            tableState={tableState}
                            dispatchTable={dispatchTable}
                        />
                    </TableRow>
                </Box>
                {loading ? (
                    <Box component="tbody">
                        {Array.from(
                            new Array(rowsPerPage),
                            (_, index) => (
                                <TableRow key={index}>
                                    {Array.from(
                                        new Array(
                                            columnNumber,
                                        ),
                                        (_, index) => (
                                            <TableCell
                                                key={index}
                                                type="td"
                                            >
                                                <Skeleton
                                                    sx={{
                                                        mr: 2,
                                                        py: 1,
                                                    }}
                                                />
                                            </TableCell>
                                        ),
                                    )}
                                </TableRow>
                            ),
                        )}
                    </Box>
                ) : (
                    <Box component="tbody">
                        {localData && localData.length ? (
                            <>
                                {localData
                                    .slice(
                                        page * rowsPerPage,
                                        (page + 1) *
                                            rowsPerPage,
                                    )
                                    .map((row, index) => {
                                        return (
                                            <TableRow
                                                key={index}
                                                sx={Object.assign(
                                                    {
                                                        borderBottom:
                                                            '1px solid #ddd',
                                                        transition:
                                                            'background-color .3s',
                                                        '&:hover':
                                                            {
                                                                ...hoverStyle,
                                                            },
                                                    },
                                                    selected.includes(
                                                        row.id,
                                                    )
                                                        ? {
                                                              ...activeStyle,
                                                          }
                                                        : {},
                                                )}
                                            >
                                                {renderDataRow(
                                                    row,
                                                    index,
                                                    tableState,
                                                    dispatchTable,
                                                )}
                                            </TableRow>
                                        );
                                    })}
                                {isRenderEmptyRow &&
                                    localData.length -
                                        page * rowsPerPage <
                                        rowsPerPage &&
                                    Array.from(
                                        new Array(
                                            rowsPerPage -
                                                (localData.length -
                                                    page *
                                                        rowsPerPage),
                                        ),
                                        _ => (
                                            <TableRow
                                                sx={{
                                                    height: rowHeight,
                                                }}
                                            />
                                        ),
                                    )}
                            </>
                        ) : (
                            <TableRow>
                                <TableCell
                                    type="td"
                                    colSpan={columnNumber}
                                >
                                    <img
                                        src={NoData}
                                        alt="empty logo"
                                        width={408}
                                        style={{
                                            margin: '60px auto 0',
                                            display:
                                                'block',
                                        }}
                                    />
                                </TableCell>
                            </TableRow>
                        )}
                    </Box>
                )}
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '0.8rem 0',
                }}
            >
                <Button
                    variant="outlined"
                    startIcon={<RestartAlt />}
                    sx={{ml: 2}}
                    onClick={handleResetData}
                >
                    Tái thiết
                </Button>
                {pagination && (
                    <Pagination
                        handleNextPage={handleNextPage}
                        handleBackPage={handleBackPage}
                        pageTotal={localData.length || 0}
                        currentPage={page}
                        rowsPerPage={rowsPerPage}
                    />
                )}
            </Box>
        </TableContext.Provider>
    );
};

export const TableHead = memo(function ({children}) {
    return <Box component="thead">{children}</Box>;
});

export const TableRow = memo(function ({
    children,
    ...rest
}) {
    return (
        <Box component="tr" {...rest}>
            {children}
        </Box>
    );
});

export const TableCell = memo(function ({
    children,
    type,
    property = '',
    action = '',
    icon: Icon = null,
    ...rest
}) {
    const {tableState, dispatchTable} =
        useContext(TableContext);
    const {order, orderBy} = tableState;
    const handleActions =
        (action, key = '') =>
        e => {
            switch (action) {
                case 'sort':
                    dispatchTable(sortAction(key));
                    break;
                case 'filter':
                    return;
                default:
                    return;
            }
        };

    return type === 'th' ? (
        <Box
            component={type}
            onClick={
                action
                    ? handleActions(action, property)
                    : null
            }
            className={
                action === 'sort' ? 'shared-table__th' : ''
            }
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
        <Box component={type} {...rest}>
            {children}
        </Box>
    );
});

Table.propTypes = {};
