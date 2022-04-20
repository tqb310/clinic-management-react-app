import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    data: [],
};

const appointmentSlice = createSlice({
    name: 'appointment',
    initialState,
    reducers: {
        setData: (state, action) => {
            return {
                ...state,
                data: action.payload,
            };
        },
    },
});

const {reducer, actions} = appointmentSlice;
export const {setData} = actions;
export default reducer;
