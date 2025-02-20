import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"

import login from "../api/login"
import register from "../api/register"

// func to call api for token. 
export const fetchTokenID = createAsyncThunk("tokken_fetch", async ({data, isRegister})=>{
    
    if(isRegister){
        const response = await register(data)
        return response 
    }

    // login 
    const response = await login(data)
    return response

})

// local storage token
export const local_token = localStorage.getItem('TOKEN_NEXTLAB_ASSIGNMENT')

const token = {
    isLoad: false,
    isError: false,
    key: local_token? local_token : null,
    isLogin: local_token? true : false,
    message: null,
}

const tokenSlice = createSlice({
    name:"token",
    initialState : token,
    extraReducers: (builder) => {
        builder.addCase(fetchTokenID.pending, (state, action)=>{
            state.isLoad = true;
            state.isError = false;
            state.isLogin = false
        })
        builder.addCase(fetchTokenID.rejected, (state, action)=>{
            state.isLoad = false;
            state.isError = true;
            state.isLogin = false
        })
        builder.addCase(fetchTokenID.fulfilled, (state, action)=>{
            state.isLoad = false;
            state.message = action.payload.message

            if(action.payload.status == 200){
                localStorage.setItem('TOKEN_NEXTLAB_ASSIGNMENT', action.payload.key)
                state.key = action.payload.key
                state.isLogin = true
                state.isError = false;
            }

            else{
                state.isError = true
            }
        })
    }
})

export default tokenSlice.reducer


