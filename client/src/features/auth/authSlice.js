import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axiosConfig.js";
import toast from "react-hot-toast";


const initialState = {
    user: null,
    isAuthenticated: false,
    isLoading: false,
    error: null
}

export const registerUser = createAsyncThunk("auth/register", async (userData, thunkAPI) => {
    try {
        const response = await axios.post("/auth/signup", userData);
        toast.success("Sign up successfull!");
        return response.data.user;
    } catch (error) {
        toast.error(error.response?.message || "Internal server error");
        return thunkAPI.rejectWithValue(error.message);
    }

});

console.log(initialState);

export const loginUser = createAsyncThunk("auth/login", async (userData, thunkAPI) => {
    try {
        const response = await axios.post("/auth/login", userData);
        return response.data.user;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message);
    }
})

export const getUser = createAsyncThunk("auth/getUser", async (thunkAPI) => {
    try {
        const response = await axios.get("auth/");
        return response.data.user;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message);
    }
})

const authSlice = createSlice({
    name: "auth",
    initialState,

    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, loginUser.pending, getUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, loginUser.fulfilled, getUser.fulfilled, (state, action) => {
                state.user = action.payload;
                state.isAuthenticated = true;
                state.isLoading = false;
            })
            .addCase(registerUser.rejected, loginUser.rejected, getUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload
            })
    }

})

export default authSlice.reducer;