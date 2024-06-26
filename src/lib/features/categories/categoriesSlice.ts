import { createSlice } from "@reduxjs/toolkit";
import { fetchCategories } from "./categoriesThunk";

const initialState = {
  categoryList: [],
} as any;

const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.categoryList = action.payload;
    });
  },
});

export default categorySlice.reducer;
