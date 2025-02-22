import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fetchSubCategories, createSubCategory, deleteSubCategory, updateSubCategory } from '../../api/Admin_api/subCategories'

// fetch cateegoried
export const fetchALLSubCategories = createAsyncThunk('fetchSubCategories', async () => {
        const res = await fetchSubCategories()
        return res
    }
)

// call create SubCategories api 
export const createSubCategoryThunk = createAsyncThunk( 'createSubCategory', async (data) => {
        const res = await createSubCategory(data)
        return res
    }
)

// call update SubCategories api
export const updateSubCategoryThunk = createAsyncThunk( 'updateSubCategory', async ({ id, data }) => {
        // console.log(data, " in update sub category thunk")
        const res = await updateSubCategory(id, data)
        return res
    }
)

// call delete SubCategories api
export const deleteSubCategoryThunk = createAsyncThunk( 'deleteSubCategory', async (id) => {
        const res = await deleteSubCategory(id)
        return res
    }
)

const initialState = {
    isLoad: false,
    isError: false,
    message: '',
    data: [],
}

// SubCategoriesSlice 
const SubCategoriesSlice = createSlice({
    name: 'SubCategories',
    initialState,
    extraReducers: (builder) => {
        builder
            // GET 
            .addCase(fetchALLSubCategories.pending, (state) => {
                state.isLoad = true
                state.isError = false
            })
            .addCase(fetchALLSubCategories.fulfilled, (state, action) => {
                state.isLoad = false

                if(action.payload.status == 200){
                    state.data = action.payload.data
                    state.isError = false
                }

                if(action.payload.status == 400){
                    state.isError = true
                    state.message = action.payload.message
                }

            })
            .addCase(fetchALLSubCategories.rejected, (state, action) => {
                state.isLoad = false
                state.isError = true
                state.message = action.error.message
            })

            // create
            .addCase(createSubCategoryThunk.pending, (state) => {
                state.isLoad = true
                state.isError = false
            })
            .addCase(createSubCategoryThunk.fulfilled, (state, action) => {
                state.isLoad = false
                state.data.push(action.payload.data)
            })
            .addCase(createSubCategoryThunk.rejected, (state, action) => {
                state.isLoad = false
                state.isError = true
                state.message = action.error.message
            })

            // update
            .addCase(updateSubCategoryThunk.pending, (state) => {
                state.isLoad = true
                state.isError = false
            })
            .addCase(updateSubCategoryThunk.fulfilled, (state, action) => {
                state.isLoad = false
                if(action.payload.status == 200){
                    state.isError = false
                    const updatedCategory = action.payload.data
                    const index = state.data.findIndex(category => category.id === updatedCategory.id)
                    // console.log(index)
                    if (index !== -1) {
                        state.data[index] = updatedCategory
                    }
                }
                if(action.payload.status == 400){
                    state.isError = true
                    state.message = action.payload.message
                }
            })
            .addCase(updateSubCategoryThunk.rejected, (state, action) => {
                state.isLoad = false
                state.isError = true
                state.message = action.error.message
            })

            // delete 
            .addCase(deleteSubCategoryThunk.pending, (state) => {
                state.isLoad = true
                state.isError = false
            })
            .addCase(deleteSubCategoryThunk.fulfilled, (state, action) => {
                state.isLoad = false

                if(action.payload.status == 200){
                    state.isError = false
                    const categoryId = action.payload.data.id
                    state.data = state.data.filter(category => category.id !== categoryId)
                }
                else{
                    state.isError = true
                    state.message = action.payload.message
                }
            })
            .addCase(deleteSubCategoryThunk.rejected, (state, action) => {
                state.isLoad = false
                state.isError = true
                state.message = action.error.message
            })
    },
})


export default SubCategoriesSlice.reducer
