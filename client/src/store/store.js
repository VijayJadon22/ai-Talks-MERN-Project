import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice.js";
import feedbackReducer from "../features/feedback/feedbackSlice.js";

const store = configureStore({
    reducer: {
        auth: authReducer,
        feedback: feedbackReducer
    }
})

export default store;