import React, {useReducer, useRef} from 'react';
import TabTableWrapper from '_components/shared/TabTableWrapper';
// import diagnosticService from '_services/diagnostic.service';
// import {useRouteMatch, useHistory} from 'react-router-dom';
// import {createData} from '_constants/FakeData/QueryTable';
import {Box, InputBase, Button} from '@mui/material';
import {
    Search,
    Add,
    Delete,
    RestartAlt,
    FilterList,
} from '@mui/icons-material';
import Pagination from '_components/shared/Pagination';
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

const tabNames = [
    {title: 'Tất cả', number: 50},
    {title: 'Chưa thanh toán', number: 2},
    {title: 'Đã thanh toán', number: 4},
];

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
                            <Button
                                startIcon={<Add />}
                                variant="outlined"
                                sx={{ml: 'auto'}}
                            >
                                Tạo
                            </Button>
                            <Button
                                variant="outlined"
                                startIcon={<Delete />}
                                sx={{ml: 1}}
                                disabled={
                                    state.selected
                                        .length === 0
                                }
                                color="error"
                                onClick={handleDeleteItem}
                            >
                                Xóa
                            </Button>
                        </Box>
                        <ExamineTable
                            tableData={state.data}
                            rowsPerPage={state.rowsPerPage}
                            page={state.page}
                            selected={state.selected}
                            dispatchTable={dispatchTable}
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
