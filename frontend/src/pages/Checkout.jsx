import React, { useState, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteItemFromCartAsynce,
  increment,
  incrementAsync,
  selectItems,
  updateCartAsynce,
} from "../features/cart/cartSlice";
import { Link, Navigate } from "react-router-dom";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useForm } from "react-hook-form";
import {
  selectLoggedInUser,
  updateUserAsynce,
} from "../features/user/userSlice";
import {
  addOrderAsynce,
  selectCurrentOrder,
} from "../features/orders/OrderSlice";
import { selectUserInfo } from "../features/user/userSlice";

export default function Checkout() {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [open, setOpen] = useState(true);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState(null);

  const user = useSelector(selectUserInfo);
  console.log("user.r.r.", user);
  const items = useSelector(selectItems);
  const currentOrder = useSelector(selectCurrentOrder);

  const totalAmount = items.reduce(
    (amount, item) => item.product.price * item.quantity + amount,
    0
  );

  // const totalAmount = items.reduce(
  //   (amount, item) => item.price * item.quantity + amount,
  //   0
  // );

  // const totalAmount = items.reduce((amount,item) => discountedPrice(item.product) * item.quantity + amount , 0)

  // const totalAmount = items.reduce(
  //   (amount, item) => item.product.discountPrice * item.quantity + amount,
  //   0
  // );

  const totalItems = items.reduce((total, item) => item.quantity + total, 0);

  const hanldeQuentity = (e, product) => {
    dispatch(updateCartAsynce({ id: product.id, quantity: +e.target.value }));
  };

  const handleRemove = (e, productId) => {
    dispatch(deleteItemFromCartAsynce(productId));
  };
  const handleChacked = (e) => {
    // console.log(e.target.value);
    console.log("user.addresses", user.addresses);
    setSelectedAddress(user.addresses[e.target.value]);
  };

  const handlePayment = (e) => {
    setPaymentMethod(e.target.value);
  };

  const hanldeOrder = (e) => {
    if (selectedAddress && paymentMethod) {
      const order = {
        items,
        totalAmount,
        totalItems,
        user : user.id,
        paymentMethod,
        selectedAddress,
        status: "pending",
      };
      dispatch(addOrderAsynce(order));
    } else {
      alert("Please select the address and payment method");
    }
  };
  return (
    <>
      {!items.length && <Navigate to={`/`}></Navigate>}
      {currentOrder && (
        <Navigate to={`/order-success/${currentOrder.id}`}></Navigate>
      )}
      <div className="mx-auto max-w-7xl px-2 sm:px-0 lg:px-0  mt-0">
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <form
              className="bg-white px-5 py-0 mt-12"
              noValidate
              onSubmit={handleSubmit((data) => {
                // const updateData = {
                //   id:user.id,
                //   addresses:Array(data)
                // }
                // dispatch(updateUserAsync(updateData));
                dispatch(
                  updateUserAsynce({
                    ...user,
                    addresses: [...user.addresses, data],
                  })
                );
                reset();
              })}
            >
              <div className="">
                <div className="border-b border-gray-900/10 pb-12">
                  <h2 className="text-2xl font-semibold leading-7 text-gray-900">
                    Personal Information
                  </h2>
                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    Use a permanent address where you can receive mail.
                  </p>

                  <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-6">
                    <div className="sm:col-span-4">
                      <label
                        htmlFor="first-name"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Full name
                      </label>
                      <div className="mt-0">
                        <input
                          type="text"
                          {...register("fullname", {
                            required: "name is required",
                          })}
                          id="fullname"
                          autoComplete="given-name"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-4">
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Email address
                      </label>
                      <div className="mt-0">
                        <input
                          id="email"
                          {...register("email", {
                            required: "email is required",
                          })}
                          type="email"
                          autoComplete="email"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    
                    <div className="col-span-4">
                      <label
                        htmlFor="street-address"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Street address
                      </label>
                      <div className="mt-0">
                        <input
                          type="text"
                          {...register("street", {
                            required: "street is required",
                          })}
                          id="street-address"
                          autoComplete="street-address"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        <input
                          type="text"
                          {...register("street", {
                            required: "street is required",
                          })}
                          id="street-address"
                          autoComplete="street-address"
                          className="block mt-1 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>


                    <div className="sm:col-span-3">
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        phone
                      </label>
                      <input
                        type="number"
                        {...register("phone", {
                          required: "phone is required",
                        })}
                        id="phone"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>

                    <div className="sm:col-span-2 sm:col-start-1">
                      <label
                        htmlFor="city"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        City
                      </label>
                      <div className="mt-0">
                        <input
                          type="text"
                          {...register("city", {
                            required: "city is required",
                          })}
                          id="city"
                          autoComplete="address-level2"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="region"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        State / Province
                      </label>
                      <div className="mt-0">
                        <input
                          type="text"
                          {...register("state", {
                            required: "state is required",
                          })}
                          id="region"
                          autoComplete="address-level1"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="postal-code"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        ZIP / Postal code
                      </label>
                      <div className="mt-0">
                        <input
                          type="text"
                          {...register("pinCode", {
                            required: "pincode is required",
                          })}
                          id="postal-code"
                          autoComplete="postal-code"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-end gap-x-6">
                  <button
                    type="button"
                    className="text-sm font-semibold leading-6 text-gray-900"
                  >
                    Reset
                  </button>
                  <button
                    type="submit"
                    // onClick={()=>hanldeSubmitCheckout()}
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Add Address
                  </button>
                </div>

                <div className="border-b border-gray-900/10 pb-12">
                  <h2 className="text-base font-semibold leading-7 text-gray-900">
                    Addresses
                  </h2>
                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    Choose from existing address
                  </p>
                  <ul role="list">
                    {user &&
                      user?.addresses.map((address, i) => (
                        <>
                          <li
                            key={address.email}
                            className="flex justify-between px-2 gap-x-6 py-5 border-solid border-2 border-grey-200"
                          >
                            <div className="flex gap-x-4">
                              <input
                                name="address"
                                type="radio"
                                onChange={handleChacked}
                                value={i}
                                className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                              />
                              <div className="min-w-0 flex-auto">
                                <p className="text-sm font-semibold leading-6 text-gray-900">
                                  {address.fullname}
                                </p>
                                <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                                  {address.street}
                                </p>
                                <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                                  {address.pinCode}
                                </p>
                              </div>
                            </div>
                            <div className="hidden sm:flex sm:flex-col sm:items-end">
                              <p className="text-sm leading-6 text-gray-900">
                                Phone : {address.phone}
                              </p>
                              <p className="text-sm leading-6 text-gray-900">
                                {address.city}
                              </p>
                            </div>
                          </li>
                        </>
                      ))}
                  </ul>

                  <div className="mt-10 space-y-10">
                    <fieldset>
                      <legend className="text-sm font-semibold leading-6 text-gray-900">
                        Payment Methods
                      </legend>
                      <p className="mt-1 text-sm leading-6 text-gray-600">
                        choose one
                      </p>
                      <div className="mt-6 space-y-6">
                        <div className="flex items-center gap-x-3">
                          <input
                            id="cash"
                            value={"cash"}
                            onChange={handlePayment}
                            checked={paymentMethod === "cash"}
                            name="payments"
                            type="radio"
                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                          />
                          <label
                            htmlFor="push-everything"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Cash
                          </label>
                        </div>
                        <div className="flex items-center gap-x-3">
                          <input
                            id="card"
                            onChange={handlePayment}
                            value={"card"}
                            checked={paymentMethod === "card"}
                            name="payments"
                            type="radio"
                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                          />
                          <label
                            htmlFor="push-email"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Card payment
                          </label>
                        </div>
                      </div>
                    </fieldset>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div className="lg:col-span-2 my-12">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 border-solid border-2 bg-white">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900">
                cart
              </h1>
              <div className="mt-8">
                <div className="flow-root">
                  <ul role="list" className="-my-6 divide-y divide-gray-200">
                    {items &&
                      items.map((product) => (
                        <li key={product.id} className="flex py-6">
                          <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                            <img
                              src={product.product.thumbnail}
                              alt={product.product.title}
                              className="h-full w-full object-cover object-center"
                            />
                          </div>

                          <div className="ml-4 flex flex-1 flex-col">
                            <div>
                              <div className="flex justify-between text-base font-medium text-gray-900">
                                <h3>
                                  <a href={product.product.id}>{product.product.title}</a>
                                </h3>
                                <p className="ml-4">{product.product.price}</p>
                              </div>
                                <p className="ml-4 text-gray-500">{product.product.brand}</p>
                              <p className="mt-1 text-sm text-gray-500">
                                {product.color}
                              </p>
                            </div>
                            <div className="flex flex-1 items-end justify-between text-sm">
                              <div className="text-gray-500">
                                <label
                                  htmlFor="password"
                                  className="inline mr-2 text-sm font-medium leading-6 text-gray-900"
                                >
                                  Qty
                                </label>
                                <select
                                  onChange={(e) => hanldeQuentity(e, product)}
                                  value={product.quantity}
                                >
                                  <option value="1">1</option>
                                  <option value="2">2</option>
                                  <option value="3">3</option>
                                  <option value="4">4</option>
                                  <option value="5">5</option>
                                </select>
                              </div>

                              <div className="flex">
                                <button
                                  onClick={(e) => handleRemove(e, product.id)}
                                  type="button"
                                  className="font-medium text-indigo-600 hover:text-indigo-500"
                                >
                                  Remove
                                </button>
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
                  </ul>
                </div>
              </div>

              <div className="border-t border-gray-200 px-0 py-6 sm:px-0">
                <div className="flex justify-between text-base font-medium text-gray-900">
                  <p>Subtotal</p>
                  <p>{totalAmount}</p>
                </div>
                <div className="flex justify-between text-base font-medium text-gray-900">
                  <p>Total Items</p>
                  <p>{totalItems} Items</p>
                </div>
                <p className="mt-0.5 text-sm text-gray-500">
                  Shipping and taxes calculated at checkout.
                </p>
                <div className="mt-6">
                  <div
                    onClick={hanldeOrder}
                    className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                  >
                    Order now
                  </div>
                </div>
                <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                  <p>
                    or
                    <Link to="/">
                      <button
                        type="button"
                        className="font-medium text-indigo-600 hover:text-indigo-500"
                        onClick={() => setOpen(false)}
                      >
                        Continue Shopping
                        <span aria-hidden="true"> &rarr;</span>
                      </button>
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
