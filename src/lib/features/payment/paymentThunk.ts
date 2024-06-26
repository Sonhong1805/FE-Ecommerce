import baseURL from "@/constants/baseURL";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

type TUnpaid = {
  array: TCart[];
  token: string;
};
type TPaid = {
  paymentIds: TCart[];
  token: string;
};

export const fetchUnpaid = createAsyncThunk(
  "payment/fetchUnpaid",
  async ({ array, token }: TUnpaid) => {
    const response = await axios.post(
      baseURL + "payment/unpaid",
      {
        array,
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

export const fetchPaid = createAsyncThunk(
  "payment/fetchPaid",
  async ({ paymentIds, token }: TPaid) => {
    const response = await axios.post(
      baseURL + "payment/paid",
      {
        paymentIds,
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
  "payment/deleteOne",
  async ({ id, token }: { id: number; token: string }) => {
    const response = await axios.delete(baseURL + "payment/deleteOne", {
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
