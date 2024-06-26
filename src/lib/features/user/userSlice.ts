import { createSlice } from "@reduxjs/toolkit";
import {
  addToAddress,
  addToEvaluates,
  changeDefaultAddress,
  changePassword,
  editAddress,
  fetchAddressDetail,
  fetchUserMe,
  updateMeWithAvatar,
  updateMeWithoutAvatar,
} from "./userThunk";
import randomId from "@/helpers/randomId";

const initialState = {
  userLoggedIn: {},
  addressItems: [],
  addToAddress: {},
  addItemToAddress: {},
  infoUser: {},
  isReload: false,
  changeDefaultAddress: {},
  addressDetail: {},
  evaluateItems: {},
  userLoading: false,
} as any;

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    handleReload: (state, action) => {
      state.isReload = action.payload;
    },
    handleResetUser: (state) => {
      state.userLoggedIn = {};
    },
    handleExitsAddress: (state, action) => {
      state.isExitsAddress = action.payload;
    },
    handleInitialAddress: (state, action) => {
      state.addressItems = action.payload;
    },
    handleInitialEvaluates: (state, action) => {
      state.evaluateItems = action.payload;
    },
    handleAddItemToAddress: (state, action) => {
      const isAddressDefault = state.addressItems.some(
        (address: TUserAddress) => address.isDefault
      );
      state.addressItems.push({
        ...action.payload,
        isDefault: !isAddressDefault,
      });
    },
    handleInitialInfoUser: (state, action) => {
      state.infoUser = action.payload;
    },
    updateDefaultAddress: (state, action) => {
      const changeAddressDefault = state.addressItems.map(
        (address: TUserAddress) => ({
          ...address,
          isDefault: address.id === action.payload,
        })
      );
      state.addressItems = changeAddressDefault;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserMe.pending, (state, action) => {
      state.userLoggedIn = action.payload;
      state.userLoading = true;
    });
    builder.addCase(fetchUserMe.fulfilled, (state, action) => {
      state.userLoggedIn = action.payload;
      state.userLoading = false;
    });
    builder.addCase(addToAddress.fulfilled, (state, action) => {
      state.addToAddress = action.payload;
    });
    builder.addCase(updateMeWithAvatar.fulfilled, (state, action) => {
      const infoUser = action.payload.user;
      infoUser.avatar = action.payload.fileName;
      state.infoUser = infoUser;
    });
    builder.addCase(updateMeWithoutAvatar.fulfilled, (state, action) => {
      const infoUser = action.payload.user;
      state.infoUser = infoUser;
    });
    builder.addCase(changeDefaultAddress.fulfilled, (state, action) => {
      state.changeDefaultAddress = action.payload;
    });
    builder.addCase(fetchAddressDetail.fulfilled, (state, action) => {
      state.addressDetail = action.payload.addressDetail;
    });
    builder.addCase(changePassword.fulfilled, (state, action) => {
      state.isReload = !state.isReload;
    });
    builder.addCase(editAddress.fulfilled, (state, action) => {
      const id = action.payload.dataAddress.id;
      const currentAddress = state.addressItems;
      const findAddress = state.addressItems.find(
        (address: TUserAddress) => address.id === id
      );
      Object.assign(findAddress, action.payload.dataAddress);
      state.addressItems = currentAddress;
    });
    builder.addCase(addToEvaluates.fulfilled, (state, action) => {
      const dataEvaluates = action.payload.dataEvaluates;
      dataEvaluates.id = randomId();
      state.evaluateItems.unshift(dataEvaluates);
    });
  },
});

export const {
  handleReload,
  handleResetUser,
  handleExitsAddress,
  handleInitialAddress,
  handleAddItemToAddress,
  handleInitialInfoUser,
  updateDefaultAddress,
  handleInitialEvaluates,
} = userSlice.actions;

export default userSlice.reducer;
