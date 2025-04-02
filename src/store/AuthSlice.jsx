import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  signupData: null,
  loading: false,
  token: null,
  role: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setToken(state, value) {
      state.token = value.payload;
    },
    setRole(state, value) {
      state.role = value.payload;
    },
  },
});

export const { setToken, setRole } = authSlice.actions;
export default authSlice.reducer;