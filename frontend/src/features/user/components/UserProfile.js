import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchLoggedInUserOrdersAsynce,
  selectUserInfo,
  selectUserOrders,
  updateUserAsynce,
} from "../userSlice";

import { selectLoggedInUser } from "../../auth/authSlice";
import { useForm } from "react-hook-form";

export default function UserProfile() {
  const [selectedEditIndex, setSelectedEditIndex] = useState(-1);
  const [showAddAddressForm, setShowAddAddressForm] = useState(false);
  const dispatch = useDispatch();
  const userInfo = useSelector(selectUserInfo);
  const orders = useSelector(selectUserOrders);
  console.log("user inside userProfile", userInfo);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    dispatch(fetchLoggedInUserOrdersAsynce(userInfo.id));
  }, []);

  const handleEdit = (addressUpdate, index) => {
    const newUser = { ...userInfo, addresses: [...userInfo.addresses] };
    console.log("newUser..", newUser);
    newUser.addresses.splice(index, 1, addressUpdate); // it will replace the address with updated values
    dispatch(updateUserAsynce(newUser));
    console.log("after dispath user...", userInfo);
    setSelectedEditIndex(-1);
  };

  const handleDelete = (e, index) => {
    const newUser = { ...userInfo, addresses: [...userInfo.addresses] };
    console.log("newUser..", newUser);
    newUser.addresses.splice(index, 1);
    dispatch(updateUserAsynce(newUser));
    console.log("after dispath user...", userInfo);
  };

  const handleEditForm = (index) => {
    setSelectedEditIndex(index);
    const address = userInfo.addresses[index];
    setValue("fullname", address.fullname);
    setValue("email", address.email);
    setValue("city", address.city);
    setValue("state", address.state);
    setValue("pinCode", address.pinCode);
    setValue("phone", address.phone);
    setValue("street", address.street);
  };

  const handleAdd = (address) => {
    const newUser = { ...userInfo, addresses: [...userInfo.addresses, address] }; // it will replace the address with updated values
    dispatch(updateUserAsynce(newUser));
    setShowAddAddressForm(false);
  };

  return (
    <div>
      {/* {orders.map((order) => ( */}
      <div>
        <div className="mx-auto mt-12  max-w-7xl px-2 sm:px-6 lg:px-8 bg-white">
          <h1 className="text-2xl my-2  font-bold tracking-tight text-gray-900">
            Name: {userInfo.name ? userInfo.name : "New User"}
          </h1>
          <h3 className="  tracking-tight text-grey-500">
            Email Address :{userInfo.email}
          </h3>
         { userInfo.role === "admin" && <h3 className="  tracking-tight text-grey-500">
            role :{userInfo.role}
          </h3>}

          <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
            <button
              type="submit"
              onClick={(e) => {
                setShowAddAddressForm(true);
                setSelectedEditIndex(-1);
              }}
              className="rounded-md  bg-green-600 px-3 my-2 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Add new Address
            </button>
            {showAddAddressForm ? (
              <form
                className="bg-white px-5  mt-5"
                noValidate
                onSubmit={handleSubmit((data) => {
                  handleAdd(data);
                  reset();
                })}
              >
                <div className="space-y-12">
                  <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-2xl font-semibold leading-7 text-gray-900">
                      Personal Information
                    </h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600">
                      Use a permanent address where you can receive mail.
                    </p>

                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                      <div className="sm:col-span-3">
                        <label
                          htmlFor="first-name"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Full name
                        </label>
                        <div className="mt-2">
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
                        <div className="mt-2">
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

                      <div className="col-span-full">
                        <label
                          htmlFor="street-address"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Street address
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            {...register("street", {
                              required: "street is required",
                            })}
                            id="street-address"
                            autoComplete="street-address"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-2 sm:col-start-1">
                        <label
                          htmlFor="city"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          City
                        </label>
                        <div className="mt-2">
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
                        <div className="mt-2">
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
                        <div className="mt-2">
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
                      type="submit"
                      className="rounded-md bg-grey-600 px-3 py-2 text-sm font-semibold text-grey shadow-sm hover:bg-grey-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-grey-600"
                    >
                      cancel
                    </button>
                    <button
                      type="submit"
                      className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Add Address
                    </button>
                  </div>
                </div>
              </form>
            ) : null}

            <p className="mt-0.5 text-sm text-gray-500">Your addresses</p>
            {userInfo.addresses &&
              userInfo.addresses.map((address, index) => (
                <div>
                  {selectedEditIndex === index ? (
                    <form
                      className="bg-white px-5 py-12 mt-12"
                      noValidate
                      onSubmit={handleSubmit((data) => {
                        console.log(data);
                        handleEdit(data, index);
                        reset();
                      })}
                    >
                      <div className="space-y-12">
                        <div className="border-b border-gray-900/10 pb-12">
                          <h2 className="text-2xl font-semibold leading-7 text-gray-900">
                            Personal Information
                          </h2>
                          <p className="mt-1 text-sm leading-6 text-gray-600">
                            Use a permanent address where you can receive mail.
                          </p>

                          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-3">
                              <label
                                htmlFor="first-name"
                                className="block text-sm font-medium leading-6 text-gray-900"
                              >
                                Full name
                              </label>
                              <div className="mt-2">
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
                              <div className="mt-2">
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

                            <div className="col-span-full">
                              <label
                                htmlFor="street-address"
                                className="block text-sm font-medium leading-6 text-gray-900"
                              >
                                Street address
                              </label>
                              <div className="mt-2">
                                <input
                                  type="text"
                                  {...register("street", {
                                    required: "street is required",
                                  })}
                                  id="street-address"
                                  autoComplete="street-address"
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                              </div>
                            </div>

                            <div className="sm:col-span-2 sm:col-start-1">
                              <label
                                htmlFor="city"
                                className="block text-sm font-medium leading-6 text-gray-900"
                              >
                                City
                              </label>
                              <div className="mt-2">
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
                              <div className="mt-2">
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
                              <div className="mt-2">
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
                            onClick={() => setSelectedEditIndex(-1)}
                            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                          >
                            cancel
                          </button>
                          <button
                            type="submit"
                            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                          >
                            Edit Address
                          </button>
                        </div>

                        {/* <div className="border-b border-gray-900/10 pb-12">
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
                      </div> */}
                      </div>
                    </form>
                  ) : null}
                  <div className="flex justify-between px-2 gap-x-6 py-5 border-solid border-2 border-grey-200">
                    <div className="flex gap-x-4">
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
                    <div className="hidden sm:flex sm:flex-col sm:items-end">
                      <button
                        onClick={(e) => handleEditForm(index)}
                        type="button"
                        className="font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        Edit
                      </button>
                      <button
                        onClick={(e) => handleDelete(e, address.email)}
                        type="button"
                        className="font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
      {/* ))}    */}
    </div>
  );
}
