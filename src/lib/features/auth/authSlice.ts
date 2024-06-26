import { createSlice } from "@reduxjs/toolkit";
import { forgotPassword, login, loginWithNextAuth, signup } from "./authThunk";

const initialState = {
  signupResult: {},
  loginResult: {},
  forgotPasswordResult: {},
} as any;

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(signup.fulfilled, (state, action) => {
      state.signupResult = action.payload;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.loginResult = action.payload;
    });
    builder.addCase(forgotPassword.fulfilled, (state, action) => {
      state.forgotPasswordResult = action.payload;
    });
    builder.addCase(loginWithNextAuth.fulfilled, (state, action) => {
      state.signupResult = action.payload;
    });
  },
});

export default authSlice.reducer;
