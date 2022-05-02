import {
    createSlice,
    createAsyncThunk,
} from '@reduxjs/toolkit';
// import PatientData from '_constants/FakeData/appointmentRequest.json';
import appointmentRequestServices from '_services/firebase/appointment-request.service';

const initialState = {
    data: [],
    selected: [],
    isLoading: false,
    selectedPatient: null,
};

export const setDataAsync = createAsyncThunk(
    'appointmentRequests/setDataAsync',
    async () => {
        const data =
            await appointmentRequestServices.getDocsAll();
        return data;
    },
);

const appointmentRequestSlice = createSlice({
    name: 'appointmentRequests',
    initialState,
    reducers: {
        setData: (state, action) => {
            state.data = action.payload;
        },
        select: (state, action) => {
            state.selected = action.payload;
        },
        deleteData: (state, action) => {
            state.selected = [];
            state.data = action.payload;
        },
        setSelectedPatient: (state, action) => {
            state.selectedPatient = state.data.find(
                appointmentRequest =>
                    appointmentRequest.id ===
                    action.payload,
            );
        },
    },
    extraReducers: {
        [setDataAsync.isLoading]: state => {
            state.isLoading = true;
        },
        [setDataAsync.fulfilled]: (state, action) => {
            state.data = action.payload;
            state.isLoading = false;
        },
    },
});

const {reducer, actions} = appointmentRequestSlice;
export const {
    deleteData,
    select,
    setData,
    setSelectedPatient,
} = actions;
export default reducer;
