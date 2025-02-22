import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {createApp, deleteApp, fetchApps, updateApp} from "../../api/Admin_api/apps_api"


// Fetch all apps thunk
export const fetchAllAppsThunk = createAsyncThunk('fetchAllApps', async () => {
    const res = await fetchApps();
    return res;
});

// Create thunk
export const createAppThunk = createAsyncThunk('createAppThunk', async (appData) => {

    console.log("from create app async thunk, data for create app is \n ", appData)
    
    const res = await createApp(appData);
    return res;
});

// Update thunk
export const updateAppThunk = createAsyncThunk('updateAppThunk', async ({ id, data }) => {
    
    console.log("from update app async thunk, data for update app is \n ", data)

    const res = await updateApp(id, data);
    return res;
});

// Delete thunk
export const deleteAppThunk = createAsyncThunk('deleteAppThunk', async (id) => {
    const res = await deleteApp(id);
    return res;
});

// initial
const initialState = {
    isLoad: false,
    isError: false,
    message: '',
    data: [],
};


// APP SLICE : ====>

const appsSlice = createSlice({
    name: 'apps',
    initialState,
    extraReducers: (builder) => {
        builder
            // Fetch All Apps
            .addCase(fetchAllAppsThunk.pending, (state) => {
                state.isLoad = true;
                state.isError = false;
            })
            .addCase(fetchAllAppsThunk.fulfilled, (state, action) => {
                state.isLoad = false;
                if (action.payload.status == 200) {
                    state.data = action.payload.data;
                    state.isError = false;
                } else {
                    state.isError = true;
                    state.message = action.payload.message;
                }
            })
            .addCase(fetchAllAppsThunk.rejected, (state, action) => {
                state.isLoad = false;
                state.isError = true;
                state.message = action.error.message;
            })


            // Create
            .addCase(createAppThunk.pending, (state) => {
                state.isLoad = true;
                state.isError = false;
            })
            .addCase(createAppThunk.fulfilled, (state, action) => {
                state.isLoad = false;

                if (action.payload.status == 200) {
                    state.isError = false;
                    state.data = [...state.data, action.payload.data]; 
                } else {
                    state.isError = true;
                    state.message = action.payload.message;
                }
            })
            .addCase(createAppThunk.rejected, (state, action) => {
                state.isLoad = false;
                state.isError = true;
                state.message = action.error.message;
            })


        // Update
            .addCase(updateAppThunk.pending, (state) => {
                state.isLoad = true;
                state.isError = false;
            })
            .addCase(updateAppThunk.fulfilled, (state, action) => {
                state.isLoad = false;

                if (action.payload.status == 200) {
                    state.isError = false;
                    
                    // get app data 
                    const updatedApp = action.payload.data;

                    // index of object where id == updatedApp.id
                    const index_of_object = state.data.findIndex((app) => app.id === updatedApp.id);

                    // if present 
                    if (index_of_object != -1) {
                        state.data[index_of_object] = updatedApp;  
                    }
                } else {
                    state.isError = true;
                    state.message = action.payload.message;
                }
            })
            .addCase(updateAppThunk.rejected, (state, action) => {
                state.isLoad = false;
                state.isError = true;
                state.message = action.error.message;
            })

            // Delete
            .addCase(deleteAppThunk.pending, (state) => {
                state.isLoad = true;
                state.isError = false;
            })
            .addCase(deleteAppThunk.fulfilled, (state, action) => {
                state.isLoad = false;

                if (action.payload.status == 200) {
                    state.isError = false;
                    state.data = state.data.filter(app=> app.id != action.payload.data.id);  
                }
                
                else {
                    state.isError = true;
                    state.message = action.payload.message;
                }
            })
            .addCase(deleteAppThunk.rejected, (state, action) => {
                state.isLoad = false;
                state.isError = true;
                state.message = action.error.message;
            });
    },
});

export default appsSlice.reducer;
