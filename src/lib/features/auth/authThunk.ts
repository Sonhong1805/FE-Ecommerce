import baseURL from "@/constants/baseURL";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const signup = createAsyncThunk(
  "auth/signup",
  async ({ username, email, password }: ISignUpInputs) => {
    try {
      const response = await axios.post(baseURL + "auth/signup", {
        username,
        email,
        password,
      });
      const data = await response.data;
      return data;
    } catch (error) {}
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }: ILoginInputs) => {
    try {
      const response = await axios.post(baseURL + "auth/login", {
        email,
        password,
      });
      const data = await response.data;
      return data;
    } catch (error) {}
  }
);

export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async ({ email, password }: IForgotPasswordInputs) => {
    try {
      const response = await axios.post(baseURL + "auth/forgotPassword", {
        email,
        password,
      });
      const data = await response.data;
      return data;
    } catch (error) {}
  }
);

export const checkExitsEmail = createAsyncThunk(
  "auth/checkExitsEmail",
  async (email: string) => {
    try {
      const response = await axios.post(baseURL + "auth/checkExitsEmail", {
        email,
      });
      const data = await response.data;
      return data;
    } catch (error) {}
  }
);

export const loginWithNextAuth = createAsyncThunk(
  "auth/loginWithNextAuth",
  async ({ email, username, avatar }: ILoginWithNextAuth) => {
    try {
      const response = await axios.post(baseURL + "auth/loginWithNextAuth", {
        username,
        avatar,
        email,
      });
      const data = await response.data;
      return data;
    } catch (error) {}
  }
);
