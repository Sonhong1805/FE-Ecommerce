import baseURL from "@/constants/baseURL";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUserMe = createAsyncThunk(
  "user/fetchUserMe",
  async (token: string) => {
    const response = await axios.get(baseURL + "users/me", {
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

export const addToAddress = createAsyncThunk(
  "user/addToAddress",
  async ({
    dataAddress,
    token,
  }: {
    dataAddress: TUserAddress;
    token: string;
  }) => {
    const response = await axios.post(
      baseURL + "users/addToAddress",
      {
        dataAddress,
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

export const changePassword = createAsyncThunk(
  "user/changePassword",
  async ({ password, token }: { password: string; token: string }) => {
    const response = await axios.patch(
      baseURL + "users/changePassword",
      {
        password,
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

export const fetchAddressDetail = createAsyncThunk(
  "user/fetchAddressDetail",
  async ({ id, token }: { id: number; token: string }) => {
    const response = await axios.post(
      baseURL + "users/addressDetail",
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
export const editAddress = createAsyncThunk(
  "user/editAddress",
  async ({
    dataAddress,
    token,
  }: {
    dataAddress: TUserAddress;
    token: string;
  }) => {
    const response = await axios.patch(
      baseURL + "users/editAddress",
      {
        dataAddress,
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

export const updateMeWithAvatar = createAsyncThunk(
  "user/updateMeWithAvatar",
  async ({
    dataInfo,
    file,
    token,
  }: {
    dataInfo: TInfoUser;
    file: File;
    token: string;
  }) => {
    const fd = new FormData();
    fd.append("avatar", file);
    fd.append("dataInfo", JSON.stringify(dataInfo));
    const response = await axios.patch(
      baseURL + "users/updateMeWithAvatar",
      fd,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    const data = await response.data;
    return data;
  }
);
export const updateMeWithoutAvatar = createAsyncThunk(
  "user/updateMeWithoutAvatar",
  async ({ dataInfo, token }: { dataInfo: TInfoUser; token: string }) => {
    const response = await axios.patch(
      baseURL + "users/updateMeWithoutAvatar",
      {
        dataInfo,
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

export const changeDefaultAddress = createAsyncThunk(
  "user/changeDefaultAddress",
  async ({ id, token }: { id: number; token: string }) => {
    const response = await axios.post(
      baseURL + "users/changeDefaultAddress",
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

export const addToEvaluates = createAsyncThunk(
  "user/addToEvaluates",
  async ({
    dataEvaluates,
    token,
  }: {
    dataEvaluates: TEvaluates;
    token: string;
  }) => {
    const response = await axios.post(
      baseURL + "users/addToEvaluates",
      {
        dataEvaluates,
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
