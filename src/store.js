import { configureStore } from "@reduxjs/toolkit";
import numberReducer from "./features/numberSlice";
import userReducer from "./features/userSlice";
import { apiSlice } from "./features/api/apiSlice";

// agrupar los estados en una sola ubicacion
const store = configureStore({
  reducer: {
    number: numberReducer,
    users: userReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaulMiddleware) => 
    getDefaulMiddleware().concat(apiSlice.middleware),
})

export default store;
