import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addOrder, fetchAllOrders, updateOrder} from './orderApi';

const initialState = {
  orders : [],
  currentOrder : null,
  totalOrders :0,
  status: 'idle',
};

export const addOrderAsynce = createAsyncThunk(
  'order/addOrder',
  async (order) => {
    const response = await addOrder(order);
    return response.data;
  }
);
export const fetchAllOrdersAsynce = createAsyncThunk(
  'order/fetchAllOrders',
  async ({sort,pagination}) => {
    const response = await fetchAllOrders(sort,pagination);
    return response.data;
  }
);

export const updateOrderAsynce = createAsyncThunk(
  'order/updateOrder',
  async (pagination) => {
    const response = await updateOrder(pagination);
    return response.data;
  }
);

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
   resetOrder : (state) => {
    state.currentOrder = null
   }
  },
  extraReducers: (builder) => {
    builder
      .addCase(addOrderAsynce.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addOrderAsynce.fulfilled, (state, action) => {
        state.status = 'idle';
        state.orders.push(action.payload);
        state.currentOrder = action.payload
      })
      .addCase(fetchAllOrdersAsynce.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllOrdersAsynce.fulfilled, (state, action) => {
        state.status = 'idle';
        state.orders = action.payload.orders
        console.log("fetchAllOrdersAsynce...in..orderslice",action.payload.orders);
        state.totalOrders = action.payload.totalOrders
      })
      .addCase(updateOrderAsynce.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateOrderAsynce.fulfilled, (state, action) => {
        state.status = 'idle';
        const index = state.orders.findIndex(order => order.id === action.payload.id)
        state.orders[index] = action.payload;
      })
  },
});



export const selectCurrentOrder = (state) => state.order.currentOrder;
export const selectOrders = (state) => state.order.orders;
export const selectTotalOrders = (state) => state.order.totalOrders;

export const {resetOrder} = orderSlice.actions

export default orderSlice.reducer;
