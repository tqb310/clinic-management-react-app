import {
    createSlice,
    createAsyncThunk,
} from '@reduxjs/toolkit';
// import InvoiceData from '_constants/FakeData/invoice.json';
import invoiceServices from '_services/firebase/invoice.service';
import getDateTimeComparator from '../../_helpers/getDateTimeComparator';
import {formatDate} from '_helpers/handleDate';

const initialState = {
    data: [],
    revenue: 0,
    filteredData: [],
    numberNotPaid: 0,
    numberPaid: 0,
    selected: [],
    isOpenDrawer: false,
    selectedPaidInvoice: null,
    isLoading: true,
    visitsEachMonth: [],
    tabIndex: 0,
    error: '',
};

export const setDataAsync = createAsyncThunk(
    'invoices/setDataAsync',
    async (_, thunkAPI) => {
        const {patients} = thunkAPI.getState();
        const data = await invoiceServices.getDocsAll(
            patients.data,
        );
        return data.sort(
            (item1, item2) =>
                -getDateTimeComparator(
                    formatDate(item1.create_at),
                    formatDate(item2.create_at),
                ),
        );
    },
);

export const setSelectedPaidInvoiceAsync = createAsyncThunk(
    'invoices/setSelectedPaidInvoiceAsync',
    async (id, thunkAPI) => {
        const {invoices} = thunkAPI.getState();
        let result;
        let invoiceIndex = invoices.data.findIndex(
            invoice => invoice.id === id,
        );
        if (invoiceIndex !== -1) {
            result = invoices.data.find(
                item => item.id === id,
            );
        } else {
            result = await invoiceServices.getDocById(id);
        }

        return result;
    },
);

export const setRevenueDataAsync = createAsyncThunk(
    'invoices/setRevenueDataAsync',
    async () => {
        const result = await invoiceServices.getRevenue();
        return result;
    },
);

export const setVisitsEachMonthAsync = createAsyncThunk(
    'invoices/setVisitsEachMonthAsync',
    async () => {
        const result =
            await invoiceServices.getVisitsEachMonth();
        return result;
    },
);

export const deleteInvoiceBatch = createAsyncThunk(
    'invoices/deleteInvoiceBatch',
    async (_, thunkAPI) => {
        const {invoices} = thunkAPI.getState();
        const result =
            await invoiceServices.deleteInvoiceBatch(
                invoices.selected,
            );
        return result;
    },
);
const appointmentSlice = createSlice({
    name: 'invoices',
    initialState,
    reducers: {
        setData: (state, action) => {
            state.data = action.payload;
        },
        updateData: (state, action) => {
            state.selectedPaidInvoice = {
                ...state.selectedPaidInvoice,
                ...action.payload.data,
            };
        },
        selectData: (state, action) => {
            state.selected = action.payload;
        },
        deleteData: (state, action) => {
            state.selected = [];
            state.data = action.payload;
        },
        switchDrawer: (state, action) => {
            state.isOpenDrawer = action.payload;
        },
        filterData: (state, action) => {
            state.tabIndex = action.payload;
            if (action.payload === 0)
                state.filteredData = state.data;
            else {
                let flag = 0;
                if (action.payload === 2) flag = 1;

                state.filteredData = state.data.filter(
                    invoice => {
                        return (
                            Boolean(
                                invoice.paying_customer,
                            ) === Boolean(flag)
                        );
                    },
                );
            }
        },
    },
    extraReducers: {
        [setDataAsync.pending]: state => {
            state.isLoading = true;
        },
        [setDataAsync.fulfilled]: (state, action) => {
            state.data = action.payload;
            if (state.tabIndex === 0)
                state.filteredData = action.payload;
            else {
                let flag = 0;
                if (state.tabIndex === 2) flag = 1;
                state.filteredData = action.payload.filter(
                    invoice => {
                        return (
                            Boolean(
                                invoice.paying_customer,
                            ) === Boolean(flag)
                        );
                    },
                );
            }
            // state.filteredData = action.payload;
            state.numberNotPaid = action.payload?.filter(
                invoice => !invoice.paying_customer,
            ).length;
            state.numberPaid = action.payload?.filter(
                invoice => invoice.paying_customer,
            ).length;
            state.isLoading = false;
        },
        [setDataAsync.rejected]: (state, action) => {
            state.error = action.error;
            state.isLoading = false;
        },
        [setSelectedPaidInvoiceAsync.fulfilled]: (
            state,
            action,
        ) => {
            state.selectedPaidInvoice = action.payload;
        },
        [setRevenueDataAsync.fulfilled]: (
            state,
            action,
        ) => {
            state.revenue = action.payload;
        },
        [setVisitsEachMonthAsync.fulfilled]: (
            state,
            action,
        ) => {
            state.visitsEachMonth = action.payload;
        },
        [deleteInvoiceBatch.rejected]: (state, action) => {
            state.error = action.error;
        },
        [deleteInvoiceBatch.fulfilled]: (state, action) => {
            state.numberNotPaid = state.data.filter(
                invoice =>
                    !invoice.paying_customer &&
                    !state.selected.includes(invoice.id),
            ).length;
            state.numberPaid = action.payload?.filter(
                invoice =>
                    invoice.paying_customer &&
                    !state.selected.includes(invoice.id),
            ).length;
            state.data = state.data.filter(
                item => !state.selected.includes(item.id),
            );
            state.filteredData = state.filteredData.filter(
                item => !state.selected.includes(item.id),
            );
            state.selected = [];
        },
    },
});

const {reducer, actions} = appointmentSlice;
export const {
    deleteData,
    selectData,
    setData,
    switchDrawer,
    setSelectedPaidInvoice,
    filterData,
    updateData,
} = actions;
export default reducer;
