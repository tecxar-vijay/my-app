import React, { useEffect } from "react";
import "./App.css";
import Home from "./pages/Home";
import LogiinPage from "./pages/LogiinPage";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import SignupPage from "./pages/SignupPage";
import CartPage from "./pages/CartPage";
import Checkout from "./pages/Checkout";
import ProductDetailPage from "./pages/ProductDetailPage";
import Protected from "./features/auth/components/Protected";
import { useDispatch, useSelector } from "react-redux";
import { selectLoggedInUser } from "./features/auth/authSlice";
import { fetchItemsByUserIdAsynce } from "./features/cart/cartSlice";
import PageNotFound from "./pages/404";
import OrderSuccessPage from "./pages/OrderSuccessPage";
import UserOrders from "./features/user/components/UserOrders";
import UsersOrderPage from "./pages/UsersOrderPage";
import UserProfile from "./features/user/components/UserProfile";
import UsersProfilePage from "./pages/UserProfilePage";
import { fetchLoggedInUserAsynce } from "./features/user/userSlice";
import SignOut from "./features/auth/components/SignOut";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import AdminHome from "./pages/AdminHome";
import ProtectedAdmin from "./features/auth/components/ProtectedAdmin";
import AdminProductDetail from "./features/admin/components/AdminProductDetail";
import AdminProductFormPage from "./pages/AdminProductFormPage";
import { fetchBrandsAsync, fetchCategoriesAsync } from "./features/product/ProductSlice";
import AdminOrdersPage from "./pages/AdminOrdersPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: ( <Protected>
      <Home></Home></Protected>),
  },
  {
    path: "/admin",
    element:(<ProtectedAdmin> <AdminHome></AdminHome></ProtectedAdmin>),
  },
  {
    path: "/login",
    element: <LogiinPage />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
  {
    path: "/cart",
    element: <CartPage />,
  },
  {
    path: "/checkout",
    element: <Checkout></Checkout>,
  },
  {
    path: "/product-detail/:id",
    element: <ProductDetailPage></ProductDetailPage>,
  },
  {
    path: "/admin/product-detail/:id",
    element:(<ProtectedAdmin> <AdminProductDetail></AdminProductDetail></ProtectedAdmin>),
  },
  {
    path: "/admin/product-form",
    element:(<ProtectedAdmin> <AdminProductFormPage></AdminProductFormPage></ProtectedAdmin>),
  },
  {
    path: "/admin/orders",
    element:(<ProtectedAdmin> <AdminOrdersPage></AdminOrdersPage></ProtectedAdmin>),
  },
  {
    path: "/admin/product-form/edit/:id",
    element:(<ProtectedAdmin> <AdminProductFormPage></AdminProductFormPage></ProtectedAdmin>),
  },
  {
    path: "/order-success/:id",
    element: <OrderSuccessPage></OrderSuccessPage>,
  },
  {
    path: "/orders",
    element: <UsersOrderPage></UsersOrderPage>,
  },
  {
    path: "/profile",
    element: <UsersProfilePage></UsersProfilePage>,
  },
  {
    path: "/logout",
    element: <SignOut></SignOut>,
  },
  {
    path: "/forgot-password",
    element: <ForgotPasswordPage></ForgotPasswordPage>,
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);

function App() {
  const user = useSelector(selectLoggedInUser);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      dispatch(fetchItemsByUserIdAsynce());
      dispatch(fetchLoggedInUserAsynce());
      dispatch(fetchBrandsAsync())
      dispatch(fetchCategoriesAsync())
    }
  }, [dispatch, user]);
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
