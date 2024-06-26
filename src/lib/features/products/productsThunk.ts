import baseURL from "@/constants/baseURL";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (queryString?: string) => {
    const response = await axios.get(baseURL + "products?" + queryString);
    const data = await response.data;
    return data;
  }
);

export const fetchAllProduct = createAsyncThunk(
  "products/fetchAllProduct",
  async () => {
    const response = await axios.get(baseURL + "products/all");
    const data = await response.data;
    return data;
  }
);
