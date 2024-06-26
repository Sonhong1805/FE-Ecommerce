import baseURL from "@/constants/baseURL";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const addToCancelled = createAsyncThunk(
  "cancellations/addToCancelled",
  async ({
    dataCancellations,
    token,
  }: {
    dataCancellations: TCancellations;
    token: string;
  }) => {
    const response = await axios.post(
      baseURL + "cancellations/addToCancelled",
      {
        dataCancellations,
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
