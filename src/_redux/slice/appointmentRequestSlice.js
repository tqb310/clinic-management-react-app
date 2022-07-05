import {
    createSlice,
    createAsyncThunk,
} from '@reduxjs/toolkit';
import appointmentRequestServices from '_services/firebase/appointment-request.service';

const initialState = {
    data: [],
    isOpenConfirmForm: false,
    isLoading: true,
    selectedRequest: null,
    err: '',
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
        deleteData: (state, action) => {
            state.selected = [];
            state.data = action.payload;
        },
        setSelectedRequest: (state, action) => {
            if (action.payload) {
                state.isOpenConfirmForm = true;
                state.selectedRequest = state.data.find(
                    appointmentRequest =>
                        appointmentRequest.id ===
                        action.payload,
                );
            } else {
                state.isOpenConfirmForm = false;
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
        [setDataAsync.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.error;
        },
    },
});

const {reducer, actions} = appointmentRequestSlice;
export const {
    deleteData,
    select,
    setData,
    setSelectedRequest,
} = actions;
export default reducer;
