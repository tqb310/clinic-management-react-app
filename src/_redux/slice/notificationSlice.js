import {
    createSlice,
    createAsyncThunk,
} from '@reduxjs/toolkit';
import notificationServices from '_services/firebase/notification.service';
import {formatDate} from '_helpers/handleDate';
import getDateTimeComparator from '_helpers/getDateTimeComparator';

const initialState = {
    data: [],
    selected: [],
    isLoading: false,
    selectedPatient: null,
};

export const setDataAsync = createAsyncThunk(
    'notification/setDataAsync',
    async () => {
        const data =
            await notificationServices.getDocsAll();
        return data.sort(
            (item1, item2) =>
                -getDateTimeComparator(
                    formatDate(
                        item1.create_at_date,
                        item1.create_at_time,
                    ),
                    formatDate(
                        item2.create_at_date,
                        item2.create_at_time,
                    ),
                ),
        );
    },
);

const notificationSlice = createSlice({
    name: 'notification',
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

const {reducer, actions} = notificationSlice;
export const {deleteData, select, setData} = actions;
export default reducer;
