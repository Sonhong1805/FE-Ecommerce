import { createSlice } from "@reduxjs/toolkit";
import { filtersCategories } from "./filtersThunk";

const initialState = {
  objFilter: {},
} as any;

const filtersSlice = createSlice({
  name: "filtersCategory",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(filtersCategories.fulfilled, (state, action) => {
      state.objFilter = action.payload;
    });
  },
});

export default filtersSlice.reducer;
