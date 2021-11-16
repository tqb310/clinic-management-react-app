import {createSlice} from '@reduxjs/toolkit';


const initialState = [];

const querySlice = createSlice({
    name: "query",
    initialState,
    reducers: {
        sendQuery(state, action) {
            state.push(action.payload)
        },
        receiveQuery(state){

        },
        swapQuery(){

        }
    }
})

