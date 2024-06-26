import { createSlice } from "@reduxjs/toolkit";
import { addToCancelled } from "./cancellationsThunk";

const initialState = {
  cancelItems: {},
  cancelledItems: [],
} as any;

const cancellationsSlice = createSlice({
  name: "cancellations",
  initialState,
  reducers: {
    handleAddItemToCancelation: (state, action) => {
      state.cancelItems = action.payload;
    },
    handleInitialCancelled: (state, action) => {
      state.cancelledItems = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addToCancelled.fulfilled, (state, action) => {
      state.cancelledItems.unshift(action.payload.dataCancellations);
    });
  },
});

export const { handleAddItemToCancelation, handleInitialCancelled } =
  cancellationsSlice.actions;

export default cancellationsSlice.reducer;
