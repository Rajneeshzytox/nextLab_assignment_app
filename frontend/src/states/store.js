import {configureStore} from "@reduxjs/toolkit"

// AUTH slices
import token from "./token_slice"
import profile_slice  from "./userInfo_slice"

// user slices
import not_claimed_apps from "./UserStates/apps_not_claimed"
import history from "./UserStates/history_slice"

// admin slicess
import categories from "./AdminStates/categoriesSlice"
import subCategories from "./AdminStates/subCategoriesSlices"

// store
export default configureStore({
    reducer : {
        token : token,
        profile : profile_slice,
        pending_apps : not_claimed_apps,
        history: history,
        categories: categories,
        subCategories: subCategories,
    }
})