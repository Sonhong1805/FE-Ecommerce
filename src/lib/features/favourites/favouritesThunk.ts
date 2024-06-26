import baseURL from "@/constants/baseURL";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const addToFavourites = createAsyncThunk(
  "favourites/fetchPaid",
  async ({ dataFavourites, token }: { dataFavourites: any; token: string }) => {
    const response = await axios.post(
      baseURL + "favourites/addToFavourites",
      {
        dataFavourites,
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

export const deleteOne = createAsyncThunk(
  "favourites/deleteOne",
  async ({ id, token }: { id: number; token: string }) => {
    const response = await axios.delete(baseURL + "favourites/deleteOne", {
      data: { id },
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.data;
    return data;
  }
);
