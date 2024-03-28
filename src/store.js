import { configureStore } from "@reduxjs/toolkit";
import numberReducer from "./features/numberSlice";
import userReducer from "./features/userSlice";
import { apiSlice } from "./features/api/apiSlice";
import authReducer from "./features/authSlice";

// agrupar los estados en una sola ubicacion
const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    number: numberReducer,
    users: userReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(apiSlice.middleware),
})

export default store;
