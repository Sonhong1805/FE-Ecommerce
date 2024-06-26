import { combineReducers, configureStore } from "@reduxjs/toolkit";
import productDetailReducer from "./features/productDetail/productDetailSlice";
import filterCategoryReducer from "./features/filtersCategory/filtersSlice";
import favouritesReducer from "./features/favourites/favouritesSlice";
import categoryReducer from "./features/categories/categoriesSlice";
import productsReducer from "./features/products/productsSlice";
import addressReducer from "./features/address/addressSlice";
import orderedReducer from "./features/ordered/orderedSlice";
import paymentReducer from "./features/payment/paymentSlice";
import authReducer from "./features/auth/authSlice";
import userReducer from "./features/user/userSlice";
import cartReducer from "./features/cart/cartSlice";
import cancellationsReducer from "./features/cancellations/cancellationsSlice";

const rootReducer = combineReducers({
  filtersCategory: filterCategoryReducer,
  productDetail: productDetailReducer,
  cancellations: cancellationsReducer,
  favourites: favouritesReducer,
  categories: categoryReducer,
  products: productsReducer,
  address: addressReducer,
  payment: paymentReducer,
  ordered: orderedReducer,
  auth: authReducer,
  user: userReducer,
  cart: cartReducer,
});

export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
