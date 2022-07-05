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
import getDateTimeComparator from '../../_helpers/getDateTimeComparator';

const initialState = {
    data: [],
    number: 0,
    nextPatient: '',
    cancelledNumber: 0,
    visitedNumber: 0,
    notVisitedNumber: 0,
    anchorDay: new Date(),
    selectedDate: new Date(),
    isOpenForm: false,
    isLoading: true,
    dataByDate: [],
    selectedAppointment: null,
    isOpenAppointmentDetail: false,
    err: '',
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

export const setDataByDateAsync = createAsyncThunk(
    'appointments/setDataByDateAsync',
    async (_, thunkAPI) => {
        const {patients = {}} = thunkAPI.getState();
        const data = await appointmentServices.getDocByDate(
            formatDate(
                new Date().toLocaleDateString(),
                '',
                'm/d/y',
                true,
            ),
            patients,
        );
        return data.sort((item1, item2) =>
            getDateTimeComparator(
                formatDate(item1.date, item1.time),
                formatDate(item2.date, item2.time),
            ),
        );
    },
);

export const setDataNumberAsync = createAsyncThunk(
    'appointments/setDataNumberAsync',
    async () => {
        const number =
            await appointmentServices.getDataSize();

        return number;
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
            state.selectedDate =
                action.payload || state.selectedDate;
            const tempData =
                state.data &&
                state.data
                    .filter(appointment => {
                        return !compare2Days(
                            new Date(
                                formatDate(
                                    appointment.date,
                                ),
                            ),
                            action.payload ||
                                state.selectedDate,
                        );
                    })
                    .sort((item1, item2) =>
                        getDateTimeComparator(
                            formatDate(
                                item1.date,
                                item1.time,
                            ),
                            formatDate(
                                item2.date,
                                item2.time,
                            ),
                        ),
                    );
            state.dataByDate = tempData;
            state.nextPatient =
                tempData.find(a => a.status === 1)?.id ||
                '';
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
        setAnchorDay: (state, action) => {
            state.anchorDay = action.payload;
        },
    },
    extraReducers: {
        [setDataAsync.pending]: state => {
            state.isLoading = true;
        },
        [setDataAsync.fulfilled]: (state, action) => {
            state.data = action.payload;
            state.number = action.payload.length;
            const tempData = {
                notVisited: 0,
                visited: 0,
                cancelled: 0,
            };
            action.payload?.forEach(appointment => {
                if (appointment.status === 2)
                    tempData['visited']++;
                else if (appointment.status === 1)
                    tempData['notVisited']++;
                else tempData['cancelled']++;
            });

            state.cancelledNumber = tempData.cancelled;
            state.notVisitedNumber = tempData.notVisited;
            state.visitedNumber = tempData.visited;
            state.isLoading = false;
        },
        [setDataAsync.rejected]: (state, action) => {
            state.err = action.error;
            state.isLoading = false;
        },
        [setDataByDateAsync.pending]: state => {
            state.isLoading = true;
        },
        [setDataByDateAsync.rejected]: (state, action) => {
            state.isLoading = false;
            state.err = action.error;
        },
        [setDataByDateAsync.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
            state.nextPatient =
                action.payload.find(a => a.status === 1)
                    ?.id || '';
        },
        [setDataNumberAsync.fulfilled]: (state, action) => {
            state.number = action.payload;
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
    setAnchorDay,
} = actions;
export default reducer;
