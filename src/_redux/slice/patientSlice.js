import {
    createSlice,
    createAsyncThunk,
} from '@reduxjs/toolkit';
// import PatientData from '_constants/FakeData/patient.json';
import patientServices from '_services/firebase/patient.service';
import {
    compare2Days,
    formatDate,
} from '_helpers/handleDate';

const initialState = {
    data: [],
    selected: [],
    isLoading: false,
    selectedPatient: null,
};

export const setDataAsync = createAsyncThunk(
    'patients/setDataAsync',
    async () => {
        const data = await patientServices.getDocsAll();
        return data;
    },
);

export const setLatestInvoiceAsync = createAsyncThunk(
    'patients/setLatestInvoiceAsync',
    async id => {
        const data =
            await patientServices.getAllInvoicesOfAPatient(
                id,
            );
        const result = data.reduce((item1, item2) => {
            if (
                compare2Days(
                    new Date(formatDate(item1.create_at)),
                    new Date(formatDate(item2.create_at)),
                ) === 1
            )
                return item1;
            return item2;
        });
        return {
            create_at: result.create_at,
            follow_up_date: result.follow_up_date,
            follow_up_time: result.follow_up_time,
            blood_pressure: result.blood_pressure,
            breathing_rate: result.breathing_rate,
            heart_rate: result.heart_rate,
            temperature: result.temperature,
        };
    },
);

const patientSlice = createSlice({
    name: 'patients',
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
            if (action.payload) {
                state.selectedPatient = state.data.find(
                    patient =>
                        patient.id === action.payload,
                );
            } else {
                state.selectedPatient = null;
            }
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
        [setLatestInvoiceAsync.fulfilled]: (
            state,
            action,
        ) => {
            Object.assign(
                state.selectedPatient,
                action.payload,
            );
        },
    },
});

const {reducer, actions} = patientSlice;
export const {
    deleteData,
    select,
    setData,
    setSelectedPatient,
} = actions;
export default reducer;
