import {
    createSlice,
    createAsyncThunk,
} from '@reduxjs/toolkit';
import patientServices from '_services/firebase/patient.service';
import invoiceServices from '_services/firebase/invoice.service';
import {
    compare2Days,
    formatDate,
} from '_helpers/handleDate';

const initialState = {
    data: [],
    selected: [],
    isLoading: false,
    selectedPatient: null,
    malePatient: 0,
    femalePatient: 0,
    todayPatient: 0,
    error: '',
};

export const setDataAsync = createAsyncThunk(
    'patients/setDataAsync',
    async () => {
        const data = await patientServices.getDocsAll();
        const numberTodayPatient =
            await invoiceServices.getNumberOfTodayDocs();
        return {
            data,
            numberTodayPatient,
        };
    },
);

export const setLatestInvoiceAsync = createAsyncThunk(
    'patients/setLatestInvoiceAsync',
    async id => {
        try {
            const data =
                await patientServices.getAllInvoicesOfAPatient(
                    id,
                );
            let result = {};
            if (data && data.length) {
                result = data.reduce((item1, item2) => {
                    if (
                        compare2Days(
                            new Date(
                                formatDate(item1.create_at),
                            ),
                            new Date(
                                formatDate(item2.create_at),
                            ),
                        ) === 1
                    )
                        return item1;
                    return item2;
                });
            }
            return result;
        } catch (error) {
            throw error;
        }
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
            state.data = action.payload?.data || [];
            state.malePatient =
                action.payload?.data?.filter(
                    patient => patient.gender === 1,
                ).length || 0;
            state.femalePatient =
                action.payload?.data?.filter(
                    patient => patient.gender === 0,
                ).length || 0;
            state.todayPatient =
                action.payload?.numberTodayPatient || 0;
            state.isLoading = false;
        },
        [setLatestInvoiceAsync.rejected]: (
            state,
            action,
        ) => {
            state.error = action.error;
        },
        [setLatestInvoiceAsync.fulfilled]: (
            state,
            action,
        ) => {
            state.selectedPatient = {
                ...action.payload,
                ...state.selectedPatient,
            };
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
