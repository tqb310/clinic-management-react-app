import React, {
    memo,
    useMemo,
    useEffect,
    useState,
} from 'react';
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
    filterData,
    switchDrawer,
    setDataAsync,
    deleteInvoiceBatch,
} from '_redux/slice/invoiceSlice';
import Drawer from '_components/shared/Drawer';
import DrawerContent from './_components/DrawerContent';
import invoiceServices from '_services/firebase/invoice.service';
import AlertDialog from '_components/shared/AlertDialog';
import Toast from '_components/shared/Toast';
import './index.scss';
// import PropTypes from 'prop-types'

let tabNames = [
    {title: 'Tất cả', number: 0},
    {title: 'Chưa thanh toán', number: 0},
    {title: 'Đã thanh toán', number: 0},
];

function Main(props) {
    const [openAlertDialog, setOpenAlertDialog] =
        useState(false);
    const [openToast, setOpenToast] = useState(false);
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

    //Invoking when delete all selected items
    const handleDeleteItem = _ => {
        setOpenAlertDialog(true);
    };

    //Invoking when click on next page
    const closeDrawer = _ => {
        dispatch(switchDrawer(false));
    };
    const handleCloseAlertDialog = _ => {
        setOpenAlertDialog(false);
    };
    const closeToast = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenToast(false);
    };
    const handlePaying = async (paid, change) => {
        try {
            await invoiceServices.updateInvoice(
                selectedPaidInvoice.id,
                {paying_customer: paid, change},
            );
        } catch (error) {
            throw error;
        }
    };
    const handleWhenOK = async () => {
        try {
            await dispatch(deleteInvoiceBatch()).unwrap();
        } catch (error) {
            throw error;
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
                <AlertDialog
                    open={openAlertDialog}
                    handleClose={handleCloseAlertDialog}
                    handleWhenOk={handleWhenOK}
                    msg="Bạn có thực sự muốn xóa không?"
                    actionLabel={{
                        ok: 'Xóa',
                        refuse: 'Không',
                    }}
                    onSuccess={setOpenToast.bind(
                        null,
                        true,
                    )}
                />
                <Toast
                    open={openToast}
                    handleClose={closeToast}
                    vertical="bottom"
                    horizontal="left"
                >
                    Đã xóa thành công
                </Toast>
                <Box className="table-container__toolbars">
                    <Box className="table-container__search">
                        <Search className="icon" />
                        <InputBase
                            className="input"
                            placeholder="Số thứ tự, tên, số điện thoại ..."
                        />
                    </Box>
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
                    selectedInvoiceId={
                        selectedPaidInvoice?.id
                    }
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
