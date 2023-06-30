import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  fetchLoggedInUser,
  fetchLoggedInUserOrders,
  updateUser,
} from "./userApi";

const initialState = {
  userInfo: [],
  status: "idle",
};

export const fetchLoggedInUserOrdersAsynce = createAsyncThunk(
  "user/fetchLoggedInUserOrders",
  async (id) => {
    const response = await fetchLoggedInUserOrders(id);
    return response.data;
  }
);

//here fetchLoggedInUserAsynce will be used to get the whole detailed info of logged in user
export const fetchLoggedInUserAsynce = createAsyncThunk(
  "user/fetchLoggedInUser",
  async () => {
    const response = await fetchLoggedInUser();
    return response.data;
  }
);

export const updateUserAsynce = createAsyncThunk(
  "user/updateUser",
  async (update) => {
    const response = await updateUser(update);
    return response.data;
  }
);

export const usersSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLoggedInUserOrdersAsynce.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchLoggedInUserOrdersAsynce.fulfilled, (state, action) => {
        state.status = "idle";
        state.userInfo.orders = action.payload;
      })
      .addCase(updateUserAsynce.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateUserAsynce.fulfilled, (state, action) => {
        state.status = "idle";
        state.userInfo = action.payload;
      })
      .addCase(fetchLoggedInUserAsynce.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchLoggedInUserAsynce.fulfilled, (state, action) => {
        state.status = "idle";
        state.userInfo = action.payload;
      });
  },
});
export const selectUserOrders = (state) => state.user.userInfo.orders
export const selectUserInfo = (state) => state.user.userInfo;

export default usersSlice.reducer;
