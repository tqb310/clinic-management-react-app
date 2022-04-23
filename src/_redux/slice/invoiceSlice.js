import {createSlice} from '@reduxjs/toolkit';
import InvoiceData from '_constants/FakeData/invoice.json';

const initialState = {
    data: InvoiceData,
    selected: [],
    isOpenDrawer: false,
    selectedPaidInvoice: '',
};

const patientSlice = createSlice({
    name: 'invoices',
    initialState,
    reducers: {
        setData: (state, action) => {
            // return {
            //     ...state,
            //     data: [...action.payload],
            // };
            state.data = action.payload;
        },
        resetTable: (state, action) => {
            return {
                ...state,
                selected: [],
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
        setSelectedPaidInvoice: (state, action) => {
            state.selectedPaidInvoice =
                state.data.find(
                    item => item.id === action.payload,
                ) || null;
        },
    },
});

const {reducer, actions} = patientSlice;
export const {
    deleteData,
    resetTable,
    selectData,
    setData,
    switchDrawer,
    setSelectedPaidInvoice,
} = actions;
export default reducer;
