import React, {useState, useReducer, useRef} from 'react';
import TabTableWrapper from '_components/shared/TabTableWrapper';
// import diagnosticService from '_services/diagnostic.service';
// import {useRouteMatch, useHistory} from 'react-router-dom';
import {createData} from '_constants/FakeData/QueryTable';
import {
    Box,
    InputBase,
    ButtonGroup,
    Button,
    IconButton,
    Typography,
} from '@mui/material';
import {
    Search,
    Add,
    Delete,
    ArrowBackIos,
    ArrowForwardIos,
    RestartAlt,
    FilterList,
} from '@mui/icons-material';
import {tabNames} from './_constants/HeadCells';
import ExamineTable from './_components/ExamineTable';
import {
    initState,
    reducer,
    deleteAction,
    nextPageAction,
    backPageAction,
    resetTableAction,
} from './_reducers/tableReducer';
import './index.scss';
// import PropTypes from 'prop-types'

const newRows = queue => {
    const kq = queue.map((data, index) => {
        console.log(data);
        return createData(
            data.DIAGNOSTIC_ID,
            index + 1,
            data.PATIENT?.PATIENT_NAME,
            data.PATIENT?.PHONE,
            new Date(data.CREATE_AT).getDate() +
                '/' +
                (new Date(data.CREATE_AT).getMonth() + 1) +
                '/' +
                new Date(data.CREATE_AT).getFullYear(),
            1,
            data.STATUS,
        );
    });
    return kq;
};

function Main(props) {
    const preservedData = useRef(initState.data).current;
    const [state, dispatchTable] = useReducer(
        reducer,
        initState,
    );
    // const history = useHistory();
    // const {path} = useRouteMatch();
    // const onClickItem = id => {
    //     history.push(`${path}${id}`);
    // };
    const handleResetData = e => {
        dispatchTable(resetTableAction([...preservedData]));
    };
    //Invoking when delete all selected items
    const handleDeleteItem = e => {
        dispatchTable(
            deleteAction(
                [...state.data].filter(
                    item =>
                        !state.selected.includes(item.id),
                ),
            ),
        );
    };
    //Invoking when click on next page
    const handleNextPage = e => {
        dispatchTable(nextPageAction());
    };
    //Invoking when click on next page
    const handleBackPage = e => {
        dispatchTable(backPageAction());
    };
    return (
        <TabTableWrapper tabNameArr={tabNames}>
            {index => {
                return (
                    <Box className="table-container">
                        <Box className="table-container__actions">
                            <Box className="table-container__search">
                                <Search className="icon" />
                                <InputBase
                                    className="input"
                                    placeholder="Số thứ tự, tên, số điện thoại ..."
                                />
                            </Box>
                            <Button
                                variant="outlined"
                                startIcon={<RestartAlt />}
                                sx={{ml: 2}}
                                onClick={handleResetData}
                            >
                                Tái thiết
                            </Button>
                            <Button
                                variant="outlined"
                                startIcon={<FilterList />}
                                sx={{ml: 2}}
                                onClick={handleResetData}
                            >
                                Lọc
                            </Button>
                            <ButtonGroup className="table-container__button-group">
                                <Button startIcon={<Add />}>
                                    Tạo
                                </Button>
                                <Button
                                    startIcon={<Delete />}
                                    sx={{
                                        '&:hover': {
                                            borderColor:
                                                '#e74f48 !important',
                                        },
                                    }}
                                    disabled={
                                        state.selected
                                            .length === 0
                                    }
                                    color="error"
                                    onClick={
                                        handleDeleteItem
                                    }
                                >
                                    Xóa
                                </Button>
                            </ButtonGroup>
                        </Box>
                        <ExamineTable
                            tableData={[...state.data]}
                            rowsPerPage={state.rowsPerPage}
                            page={state.page}
                            selected={[...state.selected]}
                            dispatchTable={dispatchTable}
                            order={state.order}
                            orderBy={state.orderBy}
                            filteredProperty={
                                state.filteredProperty
                            }
                        />
                        <Box className="table-container__pagination">
                            <IconButton
                                className="icon-button"
                                disabled={state.page === 0}
                                onClick={handleBackPage}
                            >
                                <ArrowBackIos className="icon" />
                            </IconButton>
                            <Typography
                                variant="h6"
                                className="page-text"
                            >
                                {state.data.length
                                    ? state.page + 1
                                    : 0}
                            </Typography>
                            <Typography className="page-text">
                                &nbsp;/&nbsp;
                            </Typography>
                            <Typography
                                variant="h6"
                                className="page-text"
                            >
                                {Math.ceil(
                                    state.data.length /
                                        state.rowsPerPage,
                                )}
                            </Typography>
                            <IconButton
                                className="icon-button"
                                disabled={
                                    !state.data.length ||
                                    state.page + 1 ===
                                        Math.ceil(
                                            state.data
                                                .length /
                                                state.rowsPerPage,
                                        )
                                }
                                onClick={handleNextPage}
                            >
                                <ArrowForwardIos className="icon" />
                            </IconButton>
                        </Box>
                    </Box>
                );
            }}
        </TabTableWrapper>
    );
}

Main.propTypes = {};

export default Main;

// const [diagnostics, setDiagnostics] = useState([]);
// const [selectId, setSelectId] = useState('');
// useEffect(() => {
//   async function fetchData() {
//     let data = await diagnosticService.getAllDiagnostic()
//     setDiagnostics(data)
//   }
//   fetchData()
// }, [])
// console.log((diagnostics))
