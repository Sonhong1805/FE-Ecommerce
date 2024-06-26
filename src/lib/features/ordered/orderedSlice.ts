import { createSlice } from "@reduxjs/toolkit";
import { addToOrdered } from "./orderedThunk";

const initialState = {
  addToOrdered: {},
  orderedItems: [],
  orderedDetail: {},
} as any;

const orderedSlice = createSlice({
  name: "ordered",
  initialState,
  reducers: {
    handleInitialOrdered: (state, action) => {
      state.orderedItems = action.payload;
    },
    handleAddItemToOrdered: (state, action) => {
      state.orderedItems.unshift(...action.payload);
    },
    handleOrderedDetail: (state, action) => {
      state.orderedDetail = action.payload;
    },
    handleUpdateOrdered: (state, action) => {
      const { items, idOrdered } = action.payload;
      const idItems = items.map((item: TCart) => item.id);

      const userOrdered = [...state.orderedItems] || [];

      const currentUserOrdered = userOrdered?.find(
        (item: TOrdered) => item.id === idOrdered
      );

      const updateStatusArr = currentUserOrdered.items.map((item: TCart) => {
        if (idItems.includes(item.id)) {
          return { ...item, status: true };
        } else return item;
      });

      currentUserOrdered.items = updateStatusArr;
      state.orderedItems = userOrdered;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addToOrdered.fulfilled, (state, action) => {
      state.addToOrdered = action.payload;
    });
  },
});

export const {
  handleInitialOrdered,
  handleAddItemToOrdered,
  handleOrderedDetail,
  handleUpdateOrdered,
} = orderedSlice.actions;

export default orderedSlice.reducer;
