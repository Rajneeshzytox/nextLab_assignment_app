import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"

// api urls, 
import { getAppUser } from "../../api/Admin_api/getAppUser"

// fetch all user: 
export const fetchUserByApp = createAsyncThunk('fetchUserByApp', async ({appId, urlParameter})=>{
    const res = await getAppUser(appId, urlParameter)
    return res;
})


const initalState = {
    isLoad: false,
    isError: false,
    data: [],
}

const usersByAppSlice = createSlice({
    name:"userByApp",
    initialState: initalState,
    extraReducers: (builder) => {
        builder.addCase(fetchUserByApp.pending, (state, actions)=>{
            state.isLoad = true
            state.isError = false
        })
        builder.addCase(fetchUserByApp.rejected, (state, actions)=>{
            state.isLoad = false
            state.isError = true
        })
        builder.addCase(fetchUserByApp.fulfilled, (state, actions)=>{
            state.isLoad = false
            
            if(actions.payload.status == 200){
                state.data = actions.payload.data
                state.isError = false;
            }
            else{
                state.isError = true;
            }
            
        })
    }
})

export default usersByAppSlice.reducer;




/**
 *  RESPONSE SAMPLE
{
  "status": "ok",
  "data": [
    {
      "id": 1,
      "appID": 1,
      "appImg": null,
      "appName": "app1",
      "userID": "4",
      "username": "temp",
      "date": "2025-02-22T08:40:59.116277Z",
      "points_earned": 10,
      "is_verified": false,
      "user_screenshot": "https://google.com/"
    }
  ]
}

 */