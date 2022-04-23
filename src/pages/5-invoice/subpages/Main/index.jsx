import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import TabTableWrapper from '_components/shared/TabTableWrapper';
// import {useRouteMatch, useHistory} from 'react-router-dom';
import {Box, InputBase, Button} from '@mui/material';
import {
    Search,
    Add,
    Delete,
    FilterList,
} from '@mui/icons-material';
import ExamineTable from './_components/ExamineTable';
import {
    deleteData,
    // selectData,
    switchDrawer,
} from '_redux/slice/invoiceSlice';
import Drawer from '_components/shared/Drawer';
import DrawerContent from './_components/DrawerContent';
import './index.scss';
// import PropTypes from 'prop-types'

const tabNames = [
    {title: 'Tất cả', number: 50},
    {title: 'Chưa thanh toán', number: 2},
    {title: 'Đã thanh toán', number: 4},
];

function Main(props) {
    const dispatch = useDispatch();
    const {
        data = [],
        selected = [],
        isOpenDrawer = false,
        selectedPaidInvoice = [],
    } = useSelector(state => state.invoices);
    // const history = useHistory();
    // const {path} = useRouteMatch();
    // const onClickItem = id => {
    //     history.push(`${path}${id}`);
    // };

    //Invoking when delete all selected items
    const handleDeleteItem = _ => {
        dispatch(
            deleteData(
                data.filter(
                    item => !selected.includes(item.id),
                ) || [],
            ),
        );
    };
    //Invoking when click on next page
    const closeDrawer = _ => {
        dispatch(switchDrawer(false));
    };
    return (
        <TabTableWrapper tabNameArr={tabNames}>
            {index => {
                return (
                    <Box className="table-container">
                        <Box className="table-container__toolbars">
                            <Box className="table-container__search">
                                <Search className="icon" />
                                <InputBase
                                    className="input"
                                    placeholder="Số thứ tự, tên, số điện thoại ..."
                                />
                            </Box>

                            <Button
                                variant="outlined"
                                startIcon={<FilterList />}
                                sx={{ml: 2}}
                                onClick={null}
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
                                    selected.length === 0
                                }
                                color="error"
                                onClick={handleDeleteItem}
                            >
                                Xóa
                            </Button>
                        </Box>
                        <ExamineTable
                            tableData={data}
                            selected={selected}
                        />
                        <Drawer
                            anchor="right"
                            open={isOpenDrawer}
                            onClose={closeDrawer}
                        >
                            <DrawerContent
                                id={
                                    selectedPaidInvoice.id ||
                                    NaN
                                }
                                patientName={
                                    selectedPaidInvoice.patientName ||
                                    ''
                                }
                                patientPhone={
                                    selectedPaidInvoice.phone ||
                                    ''
                                }
                                createAt={
                                    selectedPaidInvoice.createAt ||
                                    ''
                                }
                                note={
                                    selectedPaidInvoice.note ||
                                    ''
                                }
                            />
                        </Drawer>
                    </Box>
                );
            }}
        </TabTableWrapper>
    );
}

Main.propTypes = {};

export default Main;
