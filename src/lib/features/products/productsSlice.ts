import { createSlice } from "@reduxjs/toolkit";
import { fetchAllProduct, fetchProducts } from "./productsThunk";
import randomId from "@/helpers/randomId";

const initialState = {
  productList: [],
  queries: {
    productName: "",
    slugParent: "",
    slugChildren: [],
    priceMin: "",
    priceMax: "",
    attribute: [],
    sortTag: "",
  },
  evaluateItems: [],
  allProduct: [],
} as any;

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    handleProductName: (state, action) => {
      state.queries.productName = action.payload;
    },
    handleCategoryParent: (state, action) => {
      state.queries.slugParent = action.payload;
    },
    resetCategoriesChildren: (state) => {
      state.queries.slugChildren = [];
    },
    handleCategoriesChildren: (state, action) => {
      const isIdAlready = state.queries.slugChildren.includes(action.payload);

      if (isIdAlready) {
        const index = state.queries.slugChildren.indexOf(action.payload);
        if (index !== -1) {
          state.queries.slugChildren.splice(index, 1);
        }
      } else {
        state.queries.slugChildren.push(action.payload);
      }
    },
    handlePriceMin: (state, action) => {
      state.queries.priceMin = action.payload;
    },
    handlePriceMax: (state, action) => {
      state.queries.priceMax = action.payload;
    },
    resetSortTag: (state) => {
      state.queries.sortTag = "";
    },
    handleAttribute: (state, action) => {
      const isValueAlready = state.queries.attribute.includes(action.payload);

      if (isValueAlready) {
        const index = state.queries.attribute.indexOf(action.payload);
        if (index !== -1) {
          state.queries.attribute.splice(index, 1);
        }
      } else {
        state.queries.attribute.push(action.payload);
      }
    },
    handleSortTag: (state, action) => {
      state.queries.sortTag = action.payload;
    },
    handleInitialEvaluates: (state, action) => {
      state.evaluateItems = action.payload;
    },
    handleAddToEvaluates: (state, action) => {
      const dataEvaluates = action.payload;
      dataEvaluates.id = randomId();
      state.evaluateItems.unshift(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.productList = action.payload;
    });
    builder.addCase(fetchAllProduct.fulfilled, (state, action) => {
      state.allProduct = action.payload.products;
    });
  },
});

export const {
  handleProductName,
  handleCategoryParent,
  resetCategoriesChildren,
  handleCategoriesChildren,
  handlePriceMin,
  handlePriceMax,
  handleAttribute,
  handleSortTag,
  handleInitialEvaluates,
  handleAddToEvaluates,
  resetSortTag,
} = productSlice.actions;

export default productSlice.reducer;
