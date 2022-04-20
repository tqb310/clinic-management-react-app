import {createSlice} from '@reduxjs/toolkit';
import PatientData from '_constants/FakeData/patient.json';
import getComparator from '_helpers/getComparator';

const initialState = {
    rowsPerPage: 8,
    page: 0,
    data: PatientData,
    selected: [],
    orderBy: '',
    order: 'asc',
    filterdProperty: '',
};

const patientSlice = createSlice({
    name: 'patients',
    initialState,
    reducers: {
        setData: (state, action) => {
            // return {
            //     ...state,
            //     data: [...action.payload],
            // };
            state.data = action.payload;
        },
        resetTable: (state, action) => {
            return {
                ...state,
                page: 0,
                data: [...action.payload],
                selected: [],
                orderBy: '',
                order: 'asc',
                anchor: null,
            };
        },
        select: (state, action) => {
            state.selected = action.payload;
        },
        nextPage: (state, action) => {
            state.page++;
        },
        backPage: (state, action) => {
            state.page--;
        },
        deleteData: (state, action) => {
            // return {
            //     ...state,
            //     selected: [],
            //     data: [...action.payload],
            // };
            state.selected = [];
            state.data = action.payload;
        },
        sort: (state, action) => {
            const newOrder =
                state.orderBy === action.payload &&
                state.order === 'asc'
                    ? 'desc'
                    : 'asc';
            Object.assign(state, {
                order: newOrder,
                orderBy: action.payload,
                data: state.data.sort(
                    getComparator(newOrder, action.payload),
                ),
            });
        },
        setFilteredProperty: (state, action) => {
            // return {
            //     ...state,
            //     filterdProperty: action.payload,
            // };
            state.filterdProperty = action.payload;
        },
    },
});

const {reducer, actions} = patientSlice;
export const {
    backPage,
    deleteData,
    nextPage,
    resetTable,
    select,
    setData,
    setFilteredProperty,
    sort,
} = actions;
export default reducer;
