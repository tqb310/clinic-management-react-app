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
    selected: [],
    isOpenDrawer: false,
    selectedPaidInvoice: null,
    isLoading: false,
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
        if (invoices.data.length) {
            result = invoices.data.find(
                item => item.id === id,
            );
        } else {
            result = await invoiceServices.getDocById(id);
        }

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
    },
    extraReducers: {
        [setDataAsync.pending]: state => {
            state.isLoading = true;
        },
        [setDataAsync.fulfilled]: (state, action) => {
            state.data = action.payload;
            state.isLoading = false;
        },
        [setSelectedPaidInvoiceAsync.fulfilled]: (
            state,
            action,
        ) => {
            state.selectedPaidInvoice = action.payload;
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
} = actions;
export default reducer;
