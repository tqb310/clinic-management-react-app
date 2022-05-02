import {
    createSlice,
    createAsyncThunk,
} from '@reduxjs/toolkit';
// import queueServices from '_services/firebase/queue.service';
// import {
//     compare2Days,
//     formatDate,
// } from '_helpers/handleDate';

const initialState = {
    data: [],
    selected: null,
    isLoading: false,
    isOpenHint: false,
    patientHint: [],
};

// export const setDataAsync = createAsyncThunk(
//     'queues/setDataAsync',
//     async () => {
//         const data = await queueServices.getDocsAll();
//         return data;
//     },
// );

export const setPatientHint = createAsyncThunk(
    'queues/setPatientHint',
    async (phone, thunkAPI) => {
        if (phone) {
            const patients =
                thunkAPI.getState().patients.data;
            const filteredPatient = patients.filter(value =>
                value.phone.startsWith(phone),
            );
            return {filteredPatient, isOpenHint: true};
        }
        return {filteredPatient: [], isOpenHint: false};
    },
);

const queueSlice = createSlice({
    name: 'queues',
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
                state.selected = action.payload;
                state.isOpenHint = false;
            } else {
                state.selected = null;
            }
        },
    },
    extraReducers: {
        // [setDataAsync.isLoading]: state => {
        //     state.isLoading = true;
        // },
        // [setDataAsync.fulfilled]: (state, action) => {
        //     state.data = action.payload;
        //     state.isLoading = false;
        // },
        [setPatientHint.fulfilled]: (state, action) => {
            state.patientHint =
                action.payload.filteredPatient;
            state.isOpenHint = action.payload.isOpenHint;
        },
    },
});

const {reducer, actions} = queueSlice;
export const {
    deleteData,
    select,
    setData,
    setSelectedPatient,
    setOpenHint,
} = actions;
export default reducer;
