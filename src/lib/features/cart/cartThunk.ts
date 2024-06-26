import baseURL from "@/constants/baseURL";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async ({ dataCart, token }: { dataCart: TDataCart; token: string }) => {
    const response = await axios.post(
      baseURL + "cart",
      {
        dataCart,
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

export const increaseQuantity = createAsyncThunk(
  "cart/increaseQuantity",
  async ({ id, token }: { id: number; token: string }) => {
    const response = await axios.post(
      baseURL + "cart/increaseQuantity",
      {
        id,
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

export const decreaseQuantity = createAsyncThunk(
  "cart/decreaseQuantity",
  async ({ id, token }: { id: number; token: string }) => {
    const response = await axios.post(
      baseURL + "cart/decreaseQuantity",
      {
        id,
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

export const changeQuantity = createAsyncThunk(
  "cart/changeQuantity",
  async ({
    id,
    token,
    quantity,
  }: {
    id: number;
    token: string;
    quantity: number;
  }) => {
    const response = await axios.post(
      baseURL + "cart/changeQuantity",
      {
        id,
        quantity,
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

export const changeInputsChecked = createAsyncThunk(
  "cart/changeInputsChecked",
  async ({
    inputsChecked,
    token,
  }: {
    inputsChecked: number[];
    token: string;
  }) => {
    const response = await axios.post(
      baseURL + "cart/changeInputsChecked",
      {
        inputsChecked,
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

export const deleteInputsChecked = createAsyncThunk(
  "cart/deleteInputsChecked",
  async ({
    inputsChecked,
    token,
  }: {
    inputsChecked: number[];
    token: string;
  }) => {
    const response = await axios.delete(baseURL + "cart/delete", {
      data: { inputsChecked },
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

export const deleteOne = createAsyncThunk(
  "cart/deleteOne",
  async ({ id, token }: { id: number; token: string }) => {
    const response = await axios.delete(baseURL + "cart/deleteOne", {
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

export const addAllToCart = createAsyncThunk(
  "cart/addAllToCart",
  async ({ arrItems, token }: { arrItems: TDataCart[]; token: string }) => {
    const response = await axios.post(
      baseURL + "cart/addAllToCart",
      {
        arrItems,
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
