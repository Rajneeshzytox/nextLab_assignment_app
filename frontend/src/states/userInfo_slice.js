import {createSlice} from "@reduxjs/toolkit"
import { data } from "react-router-dom"


const profile = {
    isLoad: false,
    isError: false,
    data: {
        "username": "temp",
        "first_name": "",
        "last_name": "",
        "email": "",
        "role": "admin",
        "points": 125
    }
}

const userSlice = createSlice({
    name : "UserInfo",
    initialState: profile,
})

export default userSlice.reducer