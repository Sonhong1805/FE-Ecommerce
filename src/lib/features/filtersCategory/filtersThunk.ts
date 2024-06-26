import baseURL from "@/constants/baseURL";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const filtersCategories = createAsyncThunk(
  "categories/filtersCategories",
  async (slug: string) => {
    const response = await axios.get(
      baseURL + "categories/filters?slug=" + slug
    );
    const data = await response.data;
    return data;
  }
);
