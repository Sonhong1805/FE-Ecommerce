import { createSlice } from "@reduxjs/toolkit";
import { addToFavourites, deleteOne } from "./favouritesThunk";

const initialState = {
  favouritesItems: [],
} as any;

const favouritesSlice = createSlice({
  name: "favourites",
  initialState,
  reducers: {
    handleInitialFavourites: (state, action) => {
      state.favouritesItems = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addToFavourites.fulfilled, (state, action) => {
      state.favouritesItems.unshift(action.payload.dataFavourites);
    });
    builder.addCase(deleteOne.fulfilled, (state, action) => {
      state.favouritesItems = action.payload.response;
    });
  },
});

export const { handleInitialFavourites } = favouritesSlice.actions;

export default favouritesSlice.reducer;
