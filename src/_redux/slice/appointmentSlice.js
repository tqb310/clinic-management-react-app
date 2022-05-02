import {
    createSlice,
    createAsyncThunk,
} from '@reduxjs/toolkit';
// import InvoiceData from '_constants/FakeData/appointment.json';
import {compare2Days} from '_helpers/handleDate';
import appointmentServices from '_services/firebase/appointment.service';

const initialState = {
    data: [],
    selectedDate: new Date(),
    isOpenForm: false,
    isLoading: false,
    dataByDate: [],
};

export const setDataAsync = createAsyncThunk(
    'appointments/setDataAsync',
    async (_, thunkAPI) => {
        const {patients = {}} = thunkAPI.getState();
        const data = await appointmentServices.getDocsAll(
            patients.data,
        );
        return data;
    },
);

const appointmentSlice = createSlice({
    name: 'appointments',
    initialState,
    reducers: {
        setData: (state, action) => {
            state.data = action.payload;
        },
        selectDate: (state, action) => {
            state.selected = action.payload;
            state.dataByDate = state.data.filter(
                appointment => {
                    return !compare2Days(
                        new Date([
                            appointment.date.split('/')[1],
                            appointment.date.split('/')[0],
                            appointment.date.split('/')[2],
                        ]),
                        action.payload,
                    );
                },
            );
        },
        deleteData: (state, action) => {
            state.selected = [];
            state.data = action.payload;
        },
        setOpenForm: (state, action) => {
            state.isOpenForm = action.payload;
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
    selectDate,
    setData,
    setOpenForm,
} = actions;
export default reducer;
