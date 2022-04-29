import {
    createSlice,
    createAsyncThunk,
} from '@reduxjs/toolkit';
// import InvoiceData from '_constants/FakeData/invoice.json';
import invoiceServices from '_services/firebase/invoice.service';

const initialState = {
    data: [],
    selected: [],
    isOpenDrawer: false,
    selectedPaidInvoice: '',
    isLoading: false,
};

export const setDataAsync = createAsyncThunk(
    'invoices/setDataAsync',
    async (_, thunkAPI) => {
        const {patients = {}} = thunkAPI.getState();
        const data = await invoiceServices.getDocsAll(
            patients.data,
        );
        return data;
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
        setSelectedPaidInvoice: (state, action) => {
            state.selectedPaidInvoice =
                state.data.find(
                    item => item.id === action.payload,
                ) || null;
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
