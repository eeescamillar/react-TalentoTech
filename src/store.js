import { configureStore } from "@reduxjs/toolkit";
import numberReducer from "./features/numberSlice";
import userReducer from "./features/userSlice";
import { apiSlice } from "./features/api/apiSlice";
import authReducer from "./features/authSlice";
import { apiHousesSlice } from "./features/api/apiHousesSlice";
import { apiColombiaSlice } from "./features/api/apiColombiaSlice";
import { apiMessageSlice } from "./features/api/apiMessageSlice";

// agrupar los estados en una sola ubicacion
const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    [apiHousesSlice.reducerPath]: apiHousesSlice.reducer,
    [apiColombiaSlice.reducerPath]: apiColombiaSlice.reducer,
    [apiMessageSlice.reducerPath]: apiMessageSlice.reducer,
    number: numberReducer,
    users: userReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(apiSlice.middleware)
      .concat(apiHousesSlice.middleware)
      .concat(apiColombiaSlice.middleware)
      .concat(apiMessageSlice.middleware),
})

export default store;
