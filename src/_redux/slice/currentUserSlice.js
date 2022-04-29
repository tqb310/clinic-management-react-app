import {
    createSlice,
    createAsyncThunk,
} from '@reduxjs/toolkit';
import authentication from '_services/firebase/authentication.service';

const initialState = {
    current: null,
    isLoading: false,
    error: '',
};

export const setMeAsync = createAsyncThunk(
    'currentUser/setMeAsync',
    async payload => {
        const data = await authentication.getMe(payload);
        localStorage.setItem('role', data.role);
        return data;
    },
);

const currentUserSlice = createSlice({
    name: 'currentUser',
    initialState,
    reducers: {
        removeMe: state => {
            state.current = null;
        },
        setMe: (state, action) => {
            state.current = action.payload;
        },
    },
    extraReducers: {
        [setMeAsync.pending]: (state, action) => {
            state.isLoading = true;
        },
        [setMeAsync.rejected]: (state, action) => {
            state.isLoading = action.error;
            state.error = action.payload;
        },
        [setMeAsync.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.current = action.payload;
        },
    },
});

const {actions, reducer} = currentUserSlice;

export const {removeMe, setMe} = actions;

export default reducer;
