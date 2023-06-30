import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchLoggedInUserOrdersAsynce,
  selectUserInfo,
  selectUserOrders,
} from "../userSlice";

export default function UserOrders() {
  const dispatch = useDispatch();
  const userInfo = useSelector(selectUserInfo);
  const orders = useSelector(selectUserOrders);
  useEffect(() => {
    dispatch(fetchLoggedInUserOrdersAsynce(userInfo.id));
  }, []);

  return (
    <div>
      {orders.map((order) => (
        <div>
          {console.log("order....of...loggedinuser..only",order)}
          <div className="mx-auto mt-12 max-w-7xl px-2 sm:px-6 lg:px-8 bg-white">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">
              Order #{order.id}
            </h1>
            <h3 className="text-2xl  tracking-tight text-red-500">
              Order status :{order.status}
            </h3>
            <div className="mt-8">
              <div className="flow-root">
                <ul role="list" className="-my-6 divide-y divide-gray-200">
                  {order.items.map((product) => (
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
                            <p className="text-gray-500">{product.product.brand}</p>
                            </h3>
                            <p className="ml-4">{product.product.price}</p>
                          </div>
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
                              Qty : {product.quantity}
                            </label>
                          </div>

                          <div className="flex"></div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
              <div className="flex justify-between text-base font-medium text-gray-900">
                <p>Subtotal</p>
                {/* <p>{order.totalAmount}</p> */}
                <p>$ {order.totalAmount}</p>
              </div>
              <div className="flex justify-between text-base font-medium text-gray-900">
                <p>Total Items</p>
                <p>{order.totalItems} Items</p>
              </div>
              <p className="mt-0.5 text-sm text-gray-500">Shipping address</p>
              <div className="flex justify-between px-2 gap-x-6 py-5 border-solid border-2 border-grey-200">
                <div className="flex gap-x-4">
                  <div className="min-w-0 flex-auto">
                    <p className="text-sm font-semibold leading-6 text-gray-900">
                      {order.selectedAddress.fullname}
                    </p>
                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                      {order.selectedAddress.street}
                    </p>
                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                      {order.selectedAddress.pinCode}
                    </p>
                  </div>
                </div>
                <div className="hidden sm:flex sm:flex-col sm:items-end">
                  <p className="text-sm leading-6 text-gray-900">
                    Phone : {order.selectedAddress.phone}
                  </p>
                  <p className="text-sm leading-6 text-gray-900">
                    {order.selectedAddress.city}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
