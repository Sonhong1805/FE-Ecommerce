import { createSlice } from "@reduxjs/toolkit";
import { deleteOne, fetchPaid, fetchUnpaid } from "./paymentThunk";

const initialState = {
  paymentItems: [],
  unpaidItems: [],
  paidItems: [],
  deleteOne: {},
} as any;

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    handleInitialPayment: (state, action) => {
      state.paymentItems = action.payload;
    },
    handleDeleteOne: (state, action) => {
      const index = state.paymentItems.findIndex(
        (item: TCart) => item.id === action.payload.id
      );
      if (index !== -1) {
        state.paymentItems.splice(index, 1);
      }
    },
    handleDeleteItems: (state, action) => {
      const filterItems = state.paymentItems.filter(
        (item: TCart) => !action.payload.includes(item.id)
      );
      state.paymentItems = filterItems;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUnpaid.fulfilled, (state, action) => {
      state.unpaidItems = action.payload;
    });
    builder.addCase(fetchPaid.fulfilled, (state, action) => {
      state.paidItems = action.payload;
    });
    builder.addCase(deleteOne.fulfilled, (state, action) => {
      state.deleteOne = action.payload;
    });
  },
});

export const { handleInitialPayment, handleDeleteOne, handleDeleteItems } =
  paymentSlice.actions;

export default paymentSlice.reducer;
