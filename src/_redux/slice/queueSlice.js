import {
    createSlice,
    createAsyncThunk,
} from '@reduxjs/toolkit';
import queueServices from '_services/firebase/queue.service';
import getDateTimeComparator from '../../_helpers/getDateTimeComparator';
import {formatDate} from '_helpers/handleDate';

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
    numberEachStatus: {
        serving: 0,
        waiting: 0,
        missed: 0,
    },
};

export const setDataAsync = createAsyncThunk(
    'queues/setDataAsync',
    async () => {
        const data = await queueServices.getDocsAll();
        return data;
    },
);

export const setDataByStatusAsync = createAsyncThunk(
    'queues/setDataByStatusAsync',
    async status => {
        const data = await queueServices.getDocsByStatus(
            status,
        );

        return data.sort((item1, item2) =>
            getDateTimeComparator(
                formatDate(item1.date, item1.time),
                formatDate(item2.date, item2.time),
            ),
        );
    },
);

export const setNumberEachStatusAsync = createAsyncThunk(
    'queues/setNumberEachStatusAsync',
    async () => {
        return await queueServices.getNumberEachStatus();
    },
);

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
        [setDataAsync.pending]: state => {
            state.isLoading = true;
        },
        [setDataAsync.fulfilled]: (state, action) => {
            state.data = action.payload;
            state.isLoading = false;
        },
        [setDataByStatusAsync.pending]: state => {
            state.isLoading = true;
        },
        [setDataByStatusAsync.fulfilled]: (
            state,
            action,
        ) => {
            state.data = action.payload;
            state.isLoading = false;
        },
        [setNumberEachStatusAsync.pending]: state => {
            state.isLoading = true;
        },
        [setNumberEachStatusAsync.fulfilled]: (
            state,
            action,
        ) => {
            state.numberEachStatus = action.payload;
            state.isLoading = false;
        },
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
