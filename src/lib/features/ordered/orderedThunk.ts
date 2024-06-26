import baseURL from "@/constants/baseURL";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const addToOrdered = createAsyncThunk(
  "ordered/fetchPaid",
  async ({ dataOrdered, token }: { dataOrdered: any; token: string }) => {
    const response = await axios.post(
      baseURL + "ordered/addToOrdered",
      {
        dataOrdered,
      },
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.data;
    return data;
  }
);
