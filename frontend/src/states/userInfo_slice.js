import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"


// fetch user 
import { fetchProfile } from "../api/user_profile"

export const fetchUserProfile = createAsyncThunk('fetchUserProfile', async ({token})=>{
    return fetchProfile(token)
} )

export const local_profile = localStorage.getItem('profile')



const profile = {
    isLoad: false,
    isError: false,
    message: "",
    data: {
        "username": local_profile?.username || "",
        "first_name": local_profile?.first_name || "",
        "last_name": local_profile?.last_name ||"",
        "email": local_profile?.email || "",
        "role": local_profile?.role || "",
        "points": local_profile?.points || null
    }
}

const userSlice = createSlice({
    name : "UserInfo",
    initialState: profile,
    reducers: {
        clearProfile: (state, action)=>{
            // clear state
            // // clear profile from local 
            localStorage.clear('profile')

            return {
                isLoad: false,
                isError: false,
                message: "",
                data: {
                    "username": "",
                    "first_name":  "",
                    "last_name": "",
                    "email": "",
                    "role": "",
                    "points": null,
                }
            }

            
        }
    },
    extraReducers: (builder) =>{
        builder.addCase(fetchUserProfile.pending, (state, action)=>{
            state.isLoad = true
            state.isError = false
        })
        builder.addCase(fetchUserProfile.rejected, (state, action)=>{
            state.isLoad = false
            state.isError = true
            state.message = action.message
        })
        builder.addCase(fetchUserProfile.fulfilled, (state, action)=>{
            state.isLoad = false
            state.message = action.payload.message

            if(action.payload.status == 200){
                state.data = action.payload.data
                state.isError = false

                // storing personal data to local stg
                localStorage.setItem('profile', action.payload.data)

            }

            if(action.payload.status == 400){
                state.isError = true
                state.data = {
                    "username": "",
                    "first_name": "",
                    "last_name": "",
                    "email": "",
                    "role": "",
                    "points": null
                }
            }
        })
    }
})


export const {clearProfile} = userSlice.actions;
export default userSlice.reducer