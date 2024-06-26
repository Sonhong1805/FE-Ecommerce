import { createSlice } from "@reduxjs/toolkit";
import { fetchDistricts, fetchProvinces, fetchWards } from "./addressThunk";

const initialState = {
  provinces: [],
  districts: [],
  wards: [],
} as any;

const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProvinces.fulfilled, (state, action) => {
      state.provinces = action.payload;
    });
    builder.addCase(fetchDistricts.fulfilled, (state, action) => {
      state.districts = action.payload;
    });
    builder.addCase(fetchWards.fulfilled, (state, action) => {
      state.wards = action.payload;
    });
  },
});

export default addressSlice.reducer;
