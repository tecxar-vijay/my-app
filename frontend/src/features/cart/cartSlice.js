import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addToCart, deleteItemFromCart, fetchCount, fetchItemsByUserId, resetCart, updateCart } from './cartAPI'; 

const initialState = {
  items :[],
  status: 'idle',
};



export const addToCartAsync = createAsyncThunk(
  'cart/addToCart',
  async (item) => {
    const response = await addToCart(item);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const fetchItemsByUserIdAsynce = createAsyncThunk(
  'cart/fetchItemsByUserId',
  async () => {
    const response = await fetchItemsByUserId();
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const updateCartAsynce = createAsyncThunk(
  'cart/updateCart',
  async (item) => {
    const response = await updateCart(item);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const deleteItemFromCartAsynce = createAsyncThunk(
  'cart/deleteItemFromCart',
  async (itemId) => {
    const response = await deleteItemFromCart(itemId);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const resetCartAcynce = createAsyncThunk(
  'cart/resetCart',
  async () => {
    const response = await resetCart();
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addToCartAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addToCartAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items.push(action.payload);
      })
      .addCase(fetchItemsByUserIdAsynce.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchItemsByUserIdAsynce.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items = action.payload;
      })
      .addCase(updateCartAsynce.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateCartAsynce.fulfilled, (state, action) => {
        state.status = 'idle';
        const index = state.items.findIndex(item => item.id === action.payload.id)
        state.items[index] = action.payload;
      })
      .addCase(deleteItemFromCartAsynce.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteItemFromCartAsynce.fulfilled, (state, action) => {
        state.status = 'idle';
        const index = state.items.findIndex(item => item.id === action.payload.id)
        state.items.splice(index ,1)
      })
      .addCase(resetCartAcynce.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(resetCartAcynce.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items = []
      })
  },
});


export const selectItems = (state) => state.cart.items;
// export const selectItemByid = state => 

export default cartSlice.reducer;
