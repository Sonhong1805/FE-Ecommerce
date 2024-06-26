import { createSlice } from "@reduxjs/toolkit";
import { fetchProductsDetail } from "./productDetailThunk";

const initialState = {
  detail: {},
} as any;

const productDetailSlice = createSlice({
  name: "productDetail",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProductsDetail.fulfilled, (state, action) => {
      state.detail = action.payload.objDetail;
    });
  },
});

export default productDetailSlice.reducer;
