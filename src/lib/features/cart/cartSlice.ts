import { createSlice } from "@reduxjs/toolkit";
import {
  addAllToCart,
  changeInputsChecked,
  changeQuantity,
  decreaseQuantity,
  deleteInputsChecked,
  deleteOne,
  fetchCart,
  increaseQuantity,
} from "./cartThunk";

const initialState = {
  increaseQuantity: {},
  decreaseQuantity: {},
  changeQuantity: {},
  changeInputsChecked: {},
  deleteInputsChecked: {},
  deleteOne: {},
  cartItems: [],
  inputsChecked: [],
} as any;

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    handleInitialCart: (state, action) => {
      state.cartItems = action.payload;
      state.inputsChecked = action.payload
        .filter((item: TCart) => item.status)
        .map((item: TCart) => item.id);
    },
    handleResetCart: (state) => {
      state.cartItems = [];
    },
    handleAddToCart: (state, action) => {
      state.cartItems.unshift(action.payload);
    },
    changedInputsChecked: (state, action) => {
      const isIdExits = state.inputsChecked.includes(action.payload.id);
      if (isIdExits) {
        const index = state.inputsChecked.findIndex(
          (item: number) => item === action.payload.id
        );
        if (index !== -1) {
          state.inputsChecked.splice(index, 1);
        }
      } else {
        state.inputsChecked.push(action.payload.id);
      }
    },
    updateInputCheckedAll: (state) => {
      const cartItems = state.cartItems;
      const filterIds = cartItems.map((item: TCart) => item.id);
      state.inputsChecked = filterIds;
    },
    handleUpdateStatusCart: (state, action) => {
      const cartItems = state.cartItems;
      const updateStatusArr = cartItems.map((item: TCart) => ({
        ...item,
        status: action.payload.includes(item.id),
      }));
      state.cartItems = updateStatusArr;
    },
    resetInputsChecked: (state) => {
      state.inputsChecked = [];
      const cartItems = state.cartItems;
      const updateStatusArr = cartItems.map((item: TCart) => ({
        ...item,
        status: false,
      }));
      state.cartItems = updateStatusArr;
    },
    removeIdsInputChecked: (state, action) => {
      const inputsChecked = state.inputsChecked;
      state.inputsChecked = inputsChecked.filter(
        (item: number) => !action.payload.includes(item)
      );
    },
    removeItemsCart: (state, action) => {
      const filterItems = state.cartItems.filter(
        (item: TCart) => !action.payload.includes(item.id)
      );
      state.cartItems = filterItems;
    },
    removeOneItem: (state, action) => {
      const index = state.cartItems.findIndex(
        (item: TCart) => item.id === action.payload.id
      );
      if (index !== -1) {
        state.cartItems.splice(index, 1);
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCart.fulfilled, (state, action) => {
      const {
        id,
        name,
        image,
        slug,
        slugCategoryChildren,
        price,
        discount,
        quantity,
        firstChoice,
        secondChoice,
        status,
      } = action.payload.dataCart;
      const cartItems = state.cartItems;
      const isCartExits = cartItems.some(
        (item: TDataCart) =>
          item.name === name &&
          item.firstChoice === firstChoice &&
          item.secondChoice === secondChoice
      );

      if (isCartExits) {
        const currentCart = cartItems.find(
          (item: TDataCart) =>
            item.name === name &&
            item.firstChoice === firstChoice &&
            item.secondChoice === secondChoice
        );
        currentCart.quantity = currentCart.quantity += quantity;
        currentCart.newPrice = currentCart.newPrice * currentCart.quantity;
        currentCart.status = status;
        state.inputsChecked = cartItems.map((item: TDataCart) => {
          if (isCartExits) {
            return item.id;
          }
        });
      } else {
        const newPrice = Math.round(price - (price * discount) / 100);
        const cart = {
          id,
          name,
          image,
          slug,
          discount,
          slugCategoryChildren,
          currentPrice: price,
          newPrice,
          quantity,
          firstChoice,
          secondChoice,
          status,
        };
        cartItems.unshift(cart);
        state.cartItems = cartItems;
      }
    });
    builder.addCase(increaseQuantity.fulfilled, (state, action) => {
      const index = state.cartItems.findIndex(
        (item: TCart) => item.id === action.payload.id
      );
      if (index !== -1) {
        state.cartItems[index].quantity += 1;
        const { quantity, currentPrice, discount } = state.cartItems[index];
        const discountPrice = Math.round(
          currentPrice - (currentPrice * discount) / 100
        );
        state.cartItems[index].newPrice = quantity * discountPrice;
      }
    });
    builder.addCase(decreaseQuantity.fulfilled, (state, action) => {
      const index = state.cartItems.findIndex(
        (item: TCart) => item.id === action.payload.id
      );
      if (index !== -1) {
        state.cartItems[index].quantity -= 1;
        if (state.cartItems[index].quantity < 1) {
          state.cartItems[index].quantity = 1;
        }
        const { quantity, currentPrice, discount } = state.cartItems[index];
        const discountPrice = Math.round(
          currentPrice - (currentPrice * discount) / 100
        );
        state.cartItems[index].newPrice = quantity * discountPrice;
      }
    });
    builder.addCase(changeQuantity.fulfilled, (state, action) => {
      state.changeQuantity = action.payload;
    });
    builder.addCase(changeInputsChecked.fulfilled, (state, action) => {
      state.changeInputsChecked = action.payload;
    });
    builder.addCase(deleteInputsChecked.fulfilled, (state, action) => {
      state.deleteInputsChecked = action.payload;
    });
    builder.addCase(deleteOne.fulfilled, (state, action) => {
      state.deleteOne = action.payload;
    });
    builder.addCase(addAllToCart.fulfilled, (state, action) => {
      const arrItems = action.payload.arrItems;

      let userCart = state.cartItems || [];

      let newUserCart = [];

      const userCartIds = userCart.map((item: TCart) => item.id);
      const arrItemsIds = arrItems.map((item: TCart) => item.id);

      const exitIds = userCartIds.some((id: number) =>
        arrItemsIds.includes(id)
      );

      if (exitIds) {
        newUserCart = userCart.map((item: TCart) => {
          if (arrItemsIds.includes(item.id)) {
            return { ...item, quantity: item.quantity++ };
          } else {
            return item;
          }
        });
      } else {
        newUserCart = [...userCart, ...arrItems];
      }

      state.deleteOne = newUserCart;
    });
  },
});

export const {
  handleInitialCart,
  changedInputsChecked,
  updateInputCheckedAll,
  resetInputsChecked,
  removeItemsCart,
  removeOneItem,
  handleResetCart,
  handleAddToCart,
  handleUpdateStatusCart,
  removeIdsInputChecked,
} = cartSlice.actions;

export default cartSlice.reducer;
