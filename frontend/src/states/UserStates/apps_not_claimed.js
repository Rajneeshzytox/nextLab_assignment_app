import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"

import {get_apps_not_claimed} from "../../api/User_api/not_claimed_apps"

// func to get not claimed data 
export const fetch_not_claimed_apps = createAsyncThunk("not_claimed_apps_fetch", async ()=>{
    const res = await get_apps_not_claimed();
    return res
})

const not_claimed_apps = {
    isLoad: false,
    isError: false,
    data: [],
    message: null,
}

const not_claimed_apps_slice = createSlice({
    name:"not_claimed_apps",
    initialState : not_claimed_apps,
    reducers: {
    
    },
    extraReducers: (builder) => {
        builder.addCase(fetch_not_claimed_apps.pending, (state, action)=>{
            state.isLoad = true;
            state.isError = false;

        })
        builder.addCase(fetch_not_claimed_apps.rejected, (state, action)=>{
            state.isLoad = false;
            state.isError = true;

        })
        builder.addCase(fetch_not_claimed_apps.fulfilled, (state, action)=>{
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


// export const {} = not_claimed_apps_slice.actions;
export default not_claimed_apps_slice.reducer
