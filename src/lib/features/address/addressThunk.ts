import baseURL from "@/constants/baseURL";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProvinces = createAsyncThunk(
  "provinces/fetchProvinces",
  async () => {
    const response = await axios.get(baseURL + "address/provinces");
    const data = await response.data;
    return data;
  }
);

export const fetchDistricts = createAsyncThunk(
  "districts/fetchDistricts",
  async (parent_code: string) => {
    const response = await axios.get(
      baseURL + "address/districts?parent_code=" + parent_code
    );
    const data = await response.data;
    return data;
  }
);

export const fetchWards = createAsyncThunk(
  "wards/fetchWards",
  async (parent_code: string) => {
    const response = await axios.get(
      baseURL + "address/wards?parent_code=" + parent_code
    );
    const data = await response.data;
    return data;
  }
);
