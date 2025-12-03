import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: false, // track login status
  userData: null, // store user info
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    //stores actual userData directly
    login: (state, action) => {
      state.status = true;
      state.userData = action.payload; // fixed nesting issue
    },
    logout: (state) => {
      state.status = false;
      state.userData = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
