import {
    createSlice,
    createAsyncThunk,
} from '@reduxjs/toolkit';
import queueServices from '_services/firebase/queue.service';
// import invoiceServices from '_services/firebase/invoice.service';
// import getDateTimeComparator from '../../_helpers/getDateTimeComparator';
// import {formatDate} from '_helpers/handleDate';

// import {
//     compare2Days,
//     formatDate,
// } from '_helpers/handleDate';

const initialState = {
    data: [],
    selected: null,
    isLoading: true,
    isOpenHint: false,
    patientHint: [],
    numberEachStatus: {
        serving: 0,
        waiting: 0,
        missed: 0,
    },
    selectedCard: null,
    error: '',
};

export const setDataAsync = createAsyncThunk(
    'queues/setDataAsync',
    async () => {
        const data = await queueServices.getDocsAll();
        return data.sort((item1, item2) => {
            return (
                item1.numerical_order -
                item2.numerical_order
            );
        });
    },
);

export const setCardDataAsync = createAsyncThunk(
    'queues/setCardDataAsync',
    async (_, thunkAPI) => {
        const {queues} = thunkAPI.getState();

        const pendingQueue = queues.data?.filter(
            item => item.status === 1,
        );
        const currentCardIndex = pendingQueue.findIndex(
            item => item.id === queues.selectedCard?.id,
        );

        let data;
        if (currentCardIndex === -1) {
            await queueServices.updateQueue(
                pendingQueue[0].id,
                {status: 2},
            );
            data = {...pendingQueue[0], status: 2};
        } else {
            await queueServices.updateQueue(
                pendingQueue[currentCardIndex + 1].id,
                {status: 2},
            );
            data = {
                ...pendingQueue[currentCardIndex + 1],
                status: 2,
            };
        }
        return data;
    },
);

export const setDataByStatusAsync = createAsyncThunk(
    'queues/setDataByStatusAsync',
    async status => {
        const data = await queueServices.getDocsByStatus(
            status,
        );

        return data.sort((item1, item2) => {
            return (
                item1.numerical_order -
                item2.numerical_order
            );
        });
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
        [setDataAsync.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.error;
        },
        [setDataAsync.fulfilled]: (state, action) => {
            state.data = action.payload;
            const activePatient = action.payload.find(
                item => item.status === 2,
            );
            if (activePatient)
                state.selectedCard = activePatient;
            else state.selectedCard = null;
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
        [setDataByStatusAsync.rejected]: (
            state,
            action,
        ) => {
            state.isLoading = false;
            state.error = action.error;
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
        [setNumberEachStatusAsync.rejected]: (
            state,
            action,
        ) => {
            state.isLoading = false;
            state.error = action.error;
        },
        [setPatientHint.fulfilled]: (state, action) => {
            state.patientHint =
                action.payload.filteredPatient;
            state.isOpenHint = action.payload.isOpenHint;
        },
        [setPatientHint.rejected]: (state, action) => {
            state.error = action.error;
        },
        [setCardDataAsync.pending]: state => {
            state.isLoading = true;
        },
        [setCardDataAsync.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.error;
        },
        [setCardDataAsync.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.selectedCard = action.payload;
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
