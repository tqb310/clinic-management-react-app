import React, {memo, useMemo, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import TabTableWrapper from '_components/shared/TabTableWrapper';
// import {useRouteMatch, useHistory} from 'react-router-dom';
import {Box, InputBase, Button} from '@mui/material';
import {
    Search,
    Add,
    Delete,
    // FilterList,
} from '@mui/icons-material';
import ExamineTable from './_components/ExamineTable';
import {
    deleteData,
    filterData,
    switchDrawer,
    setDataAsync,
} from '_redux/slice/invoiceSlice';
import Drawer from '_components/shared/Drawer';
import DrawerContent from './_components/DrawerContent';
import invoiceServices from '_services/firebase/invoice.service';
import './index.scss';
// import PropTypes from 'prop-types'

let tabNames = [
    {title: 'Tất cả', number: 0},
    {title: 'Chưa thanh toán', number: 0},
    {title: 'Đã thanh toán', number: 0},
];

function Main(props) {
    const dispatch = useDispatch();
    const {
        data,
        filteredData,
        selected,
        isOpenDrawer,
        selectedPaidInvoice,
        numberNotPaid,
        numberPaid,
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

    const handlePaying = async (paid, change) => {
        try {
            await invoiceServices.updateInvoice(
                selectedPaidInvoice.id,
                {paying_customer: paid, change},
            );
        } catch (error) {
            console.log(error);
        }
    };
    const onSwitchTab = tabIndex => {
        dispatch(filterData(tabIndex));
    };

    useEffect(() => {
        dispatch(setDataAsync());
    }, []);

    tabNames = useMemo(() => {
        tabNames[0].number = data.length || 0;
        tabNames[1].number = numberNotPaid;
        tabNames[2].number = numberPaid;
        return tabNames;
    }, [data, numberNotPaid, numberPaid]);

    return (
        <TabTableWrapper
            tabNameArr={tabNames}
            onSwitchTab={onSwitchTab}
        >
            <Box className="table-container">
                <Box className="table-container__toolbars">
                    <Box className="table-container__search">
                        <Search className="icon" />
                        <InputBase
                            className="input"
                            placeholder="Số thứ tự, tên, số điện thoại ..."
                        />
                    </Box>

                    {/* <Button
                                variant="outlined"
                                startIcon={<FilterList />}
                                sx={{ml: 2}}
                                onClick={null}
                            >
                                Lọc
                            </Button> */}
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
                        disabled={selected.length === 0}
                        color="error"
                        onClick={handleDeleteItem}
                    >
                        Xóa
                    </Button>
                </Box>
                <ExamineTable
                    tableData={filteredData}
                    selected={selected}
                />
                <Drawer
                    anchor="right"
                    open={isOpenDrawer}
                    onClose={closeDrawer}
                >
                    <DrawerContent
                        data={selectedPaidInvoice || {}}
                        handlePaying={handlePaying}
                    />
                </Drawer>
            </Box>
        </TabTableWrapper>
    );
}

// Main.propTypes = {};

export default memo(Main);
