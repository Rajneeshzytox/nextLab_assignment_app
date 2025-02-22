import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fetchCategories, updateCategory, deleteCategory, createCategory } from '../../api/Admin_api/categoriesAPI'

// fetch cateegoried
export const fetchALLCategories = createAsyncThunk('fetchCategories', async () => {
        const res = await fetchCategories()
        return res
    }
)

// call create categories api 
export const createCategoryThunk = createAsyncThunk( 'createCategory', async (categoryData) => {
        const res = await createCategory(categoryData)
        return res
    }
)

// call update categories api
export const updateCategoryThunk = createAsyncThunk( 'updateCategory', async ({ id, data }) => {
    // console.log("update category thunk running... data is ", id, data)
        const res = await updateCategory(id, data)
        return res
    }
)

// call delete categories api
export const deleteCategoryThunk = createAsyncThunk( 'deleteCategory', async (id) => {
        const res = await deleteCategory(id)
        return res
    }
)

const initialState = {
    isLoad: false,
    isError: false,
    message: '',
    data: [],
}

// categoriesSlice 
const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    extraReducers: (builder) => {
        builder
            // GET 
            .addCase(fetchALLCategories.pending, (state) => {
                state.isLoad = true
                state.isError = false
            })
            .addCase(fetchALLCategories.fulfilled, (state, action) => {
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
            .addCase(fetchALLCategories.rejected, (state, action) => {
                state.isLoad = false
                state.isError = true
                state.message = action.error.message
            })

            // create
            .addCase(createCategoryThunk.pending, (state) => {
                state.isLoad = true
                state.isError = false
            })
            .addCase(createCategoryThunk.fulfilled, (state, action) => {
                state.isLoad = false
                state.data.push(action.payload.data)
            })
            .addCase(createCategoryThunk.rejected, (state, action) => {
                state.isLoad = false
                state.isError = true
                state.message = action.error.message
            })

            // update
            .addCase(updateCategoryThunk.pending, (state) => {
                state.isLoad = true
                state.isError = false
            })
            .addCase(updateCategoryThunk.fulfilled, (state, action) => {
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
            .addCase(updateCategoryThunk.rejected, (state, action) => {
                state.isLoad = false
                state.isError = true
                state.message = action.error.message
            })

            // delete 
            .addCase(deleteCategoryThunk.pending, (state) => {
                state.isLoad = true
                state.isError = false
            })
            .addCase(deleteCategoryThunk.fulfilled, (state, action) => {
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
            .addCase(deleteCategoryThunk.rejected, (state, action) => {
                state.isLoad = false
                state.isError = true
                state.message = action.error.message
            })
    },
})


export default categoriesSlice.reducer
