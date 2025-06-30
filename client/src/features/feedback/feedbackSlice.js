import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axiosConfig.js";
import toast from "react-hot-toast";

const initialState = {
    response: null,
    history: [],
    isLoading: false,
    error: null
}

export const generateFeedback = createAsyncThunk("feedback/generate", async (prompt, thunkAPI) => {
    try {
        const response = await axios.post("/feedback/", prompt);
        toast.success("Feedback generated!");
        return response.data.response;
    } catch (error) {
        toast.error(error.response?.data?.message || "Generation failed");
        return thunkAPI.rejectWithValue(error.response?.data?.message);
    }
})

export const getHistory = createAsyncThunk("feedback/getHistory", async (_, thunkAPI) => {
    try {
        const res = await axios.get("/feedback/history");
        return res.data.feedbacks;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message);
    }
})


const feedbackSlice = createSlice({
    name: "feedback",
    initialState,
    reducers: {
        clearResponse: (state) => {
            state.response = null;
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // Feedback generation
            .addCase(generateFeedback.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(generateFeedback.fulfilled, (state, action) => {
                state.response = action.payload;
                state.isLoading = false;
                state.error = null;
            })
            .addCase(generateFeedback.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            // Fetch history
            .addCase(getHistory.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getHistory.fulfilled, (state, action) => {
                state.history = action.payload;
                state.isLoading = false;
            })
            .addCase(getHistory.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });

    }
})

export const { clearResponse } = feedbackSlice.actions;
export default feedbackSlice.reducer;