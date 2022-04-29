import {
    createSlice,
    createAsyncThunk,
} from '@reduxjs/toolkit';
// import PatientData from '_constants/FakeData/patient.json';
import patientServices from '_services/firebase/patient.service';

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
            state.selectedPatient = state.data.find(
                patient => patient.id === action.payload,
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

const {reducer, actions} = patientSlice;
export const {
    deleteData,
    select,
    setData,
    setSelectedPatient,
} = actions;
export default reducer;
