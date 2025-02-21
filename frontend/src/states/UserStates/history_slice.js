import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"

import { history } from "../../api/User_api/history";

// func to get history
export const fetchHistory = createAsyncThunk("history_fetch", async ()=>{
    const res = await history();
    return res
})

const history_state = {
    isLoad: false,
    isError: false,
    data: [],
    message: null,
}

const historySlice = createSlice({
    name:"history_state",
    initialState : history_state,
    reducers: {
    
    },
    extraReducers: (builder) => {
        builder.addCase(fetchHistory.pending, (state, action)=>{
            state.isLoad = true;
            state.isError = false;

        })
        builder.addCase(fetchHistory.rejected, (state, action)=>{
            state.isLoad = false;
            state.isError = true;

        })
        builder.addCase(fetchHistory.fulfilled, (state, action)=>{
            state.isLoad = false;
            if(action.payload.status == 200){
                state.data = action.payload.data
                state.isError = false;
            }
            
            else{
                state.isError = true
                state.message = action.payload.message
            }
        })
    }
})


// export const {} = historySlice.actions;
export default historySlice.reducer
