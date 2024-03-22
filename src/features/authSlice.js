import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  token: null,
  isAutheticated: false
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.token = action.payload.token;
      state.isAutheticated = true;
    },
    logout: (state) => {
      state.token = null;
      state.isAutheticated = false;
    }
  }
})

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
