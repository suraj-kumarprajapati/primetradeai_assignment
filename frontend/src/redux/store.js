import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./api/auth.api";
import userSliceReducer from "./features/userSlice.js";
import { userApi } from "./api/user.api.js";
import { taskApi } from "./api/task.api.js";


export const store = configureStore({
    reducer : {
        auth : userSliceReducer,
        [authApi.reducerPath] : authApi.reducer,
        [userApi.reducerPath] : userApi.reducer,
        [taskApi.reducerPath] : taskApi.reducer,
    },

    middleware : (getDefaultMiddleware) => getDefaultMiddleware().concat([
        authApi.middleware,
        userApi.middleware,
        taskApi.middleware,
    ])
})