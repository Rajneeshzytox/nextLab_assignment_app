import {configureStore} from "@reduxjs/toolkit"

// AUTH slices
import token from "./token_slice"
import profile_slice  from "./userInfo_slice"

// user slices
import not_claimed_apps from "./UserStates/apps_not_claimed"

// store
export default configureStore({
    reducer : {
        token : token,
        profile : profile_slice,
        pending_apps : not_claimed_apps,
    }
})