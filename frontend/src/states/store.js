import {configureStore} from "@reduxjs/toolkit"

// slices
import token from "./token_slice"
import profile_slice  from "./userInfo_slice"

// store
export default configureStore({
    reducer : {
        token : token,
        profile : profile_slice,
    }
})