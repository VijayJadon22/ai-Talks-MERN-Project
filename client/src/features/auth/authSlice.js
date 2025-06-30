import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axiosConfig.js";


const initalState = {
    user: null,
    isAuthenticated: false,
    isLoading: false,
    error: null
}

export const registerUser = createAsyncThunk("auth/register", async (userData, thunkAPI) => {
    try {
        const response = await axios.post("/auth/signup", userData);
        return response.data.user;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message);
    }

})

const authSlice = createSlice({
    name: "auth",
    initalState,

    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.user = action.payload;
                state.isAuthenticated = true;
                state.isLoading = false;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload
            })
    }

})

export default authSlice.reducer;