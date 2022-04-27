import {
    createSlice,
    createAsyncThunk,
} from '@reduxjs/toolkit';
import {getMe} from '_services/firebase/authentication.service';

const initialState = {
    currentUser: null,
    isLoading: false,
};

export const setMeAsync = createAsyncThunk(
    'currentUser/setMe',
    async payload => {
        const data = await getMe(payload);
        return data;
    },
);

const currentUserSlice = createSlice({
    name: 'currentUser',
    initialState,
    reducers: {},
    extraReducers: {},
});

const {action, reducer} = currentUserSlice;

export const {setCurrentUser} = action;

export default reducer;
