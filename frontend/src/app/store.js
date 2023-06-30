import { configureStore } from "@reduxjs/toolkit";
import ProductReducer from "../features/product/ProductSlice";
import CartReducer from "../features/cart/cartSlice";
import authReducer from "../features/auth/authSlice";
import orderReducer from "../features/orders/OrderSlice";
import userReducer from "../features/user/userSlice";

export const store = configureStore({
  reducer: {
    product: ProductReducer,
    cart: CartReducer,
    auth: authReducer,
    order: orderReducer,
    user: userReducer,
  },
});
