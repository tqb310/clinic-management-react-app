import {createSlice} from '@reduxjs/toolkit';

const initialState = [];

const appointmentSlice = createSlice({
    name: 'query',
    initialState,
    reducers: {
        sendQuery(state, action) {
            state.push(action.payload);
        },
        receiveQuery(state) {},
        swapQuery() {},
    },
});
