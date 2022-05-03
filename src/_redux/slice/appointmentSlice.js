import {
    createSlice,
    createAsyncThunk,
} from '@reduxjs/toolkit';
// import InvoiceData from '_constants/FakeData/appointment.json';
import {
    compare2Days,
    formatDate,
} from '_helpers/handleDate';
import appointmentServices from '_services/firebase/appointment.service';

const initialState = {
    data: [],
    selectedDate: new Date(),
    isOpenForm: false,
    isLoading: false,
    dataByDate: [],
    selectedAppointment: null,
    isOpenAppointmentDetail: false,
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
                        new Date(
                            formatDate(appointment.date),
                        ),
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
        setSelectedAppointment: (state, action) => {
            state.selectedAppointment =
                state.dataByDate.find(
                    appointment =>
                        appointment.id === action.payload,
                );
        },
        openAppointmentDetail: (state, action) => {
            state.isOpenAppointmentDetail = action.payload;
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
    openAppointmentDetail,
    setSelectedAppointment,
} = actions;
export default reducer;
