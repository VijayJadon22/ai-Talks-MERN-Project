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
        toast.error(error.response?.data?.message || "Internal server error");
        return thunkAPI.rejectWithValue(error.message);
    }

});



export const loginUser = createAsyncThunk("auth/login", async (userData, thunkAPI) => {
    try {
        const response = await axios.post("/auth/login", userData);
        toast.success("Login successfull!");
        return response.data.user;
    } catch (error) {
        toast.error(error.response?.data?.message || "Internal server error");
        return thunkAPI.rejectWithValue(error.response?.data?.message);
    }
})

export const getUser = createAsyncThunk("auth/getUser", async (_, thunkAPI) => {
    try {
        const response = await axios.get("/auth/");
        return response.data.user;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message);
    }
})

export const logoutUser = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
    try {
        const response = await axios.post("/auth/logout");
        return response.data.message;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || "Logout failed");
    }
});



const authSlice = createSlice({
    name: "auth",
    initialState,

    extraReducers: (builder) => {
        builder
            //pending
            .addCase(registerUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })

            // Fulfilled
            .addCase(registerUser.fulfilled, (state, action) => {
                state.user = action.payload;
                state.isAuthenticated = true;
                state.isLoading = false;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.user = action.payload;
                state.isAuthenticated = true;
                state.isLoading = false;
            })
            .addCase(getUser.fulfilled, (state, action) => {
                state.user = action.payload;
                state.isAuthenticated = true;
                state.isLoading = false;
            })

            // Rejected
            .addCase(registerUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(getUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            //logout 
            .addCase(logoutUser.fulfilled, (state) => {
                state.user = null;
                state.isAuthenticated = false;
                state.isLoading = false;
            })

    }

})

export default authSlice.reducer;