import {
    createSlice,
    createAsyncThunk,
} from '@reduxjs/toolkit';
import EmployeeServices from '_services/firebase/employee.service';

const initialState = {
    data: [],
    selected: [],
    isLoading: false,
    selectedEmployee: null,
};

export const setDataAsync = createAsyncThunk(
    'employees/setDataAsync',
    async () => {
        const data = await EmployeeServices.getDocsAll();
        return data;
    },
);

const EmployeeSlice = createSlice({
    name: 'employees',
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
        setSelectedEmployee: (state, action) => {
            if (action.payload) {
                state.selectedEmployee = state.data.find(
                    employee =>
                        employee.id === action.payload,
                );
            } else {
                state.selectedEmployee = null;
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
    },
});

const {reducer, actions} = EmployeeSlice;
export const {
    deleteData,
    select,
    setData,
    setSelectedEmployee,
} = actions;
export default reducer;
