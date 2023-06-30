import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ITEMS_PER_PAGE } from "../../../app/constents";
import {
  fetchAllOrdersAsynce,
  selectOrders,
  selectTotalOrders,
  updateOrderAsynce,
} from "../../orders/OrderSlice";
import { ArrowDownIcon, ArrowUpIcon, EyeIcon, PencilIcon } from "@heroicons/react/24/outline";
import Pagination from "../../comman/Pagination";
import { selectTotalItems } from "../../product/ProductSlice";

export default function AdminOrder() {
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState({});
  const [editableOrderId, setEditableOrderId] = useState(-1);

  const dispatch = useDispatch();
  const orders = useSelector(selectOrders);
  const totalOrders = useSelector(selectTotalOrders);
  console.log("orders..in..admin..order....",orders);
  const totalItems = useSelector(selectTotalItems);
  const totalPages = Math.ceil(totalOrders / ITEMS_PER_PAGE);

  const handlePage = (page) => {
    setPage(page);
  };

    
  const handleSort = (sortOption) => {
    const sort = { _sort: sortOption.sort, _order: sortOption.order };
    console.log(sort);
    setSort(sort);
  };

  useEffect(() => {
    const pagination = { _page: page, _limit: ITEMS_PER_PAGE };
    dispatch(fetchAllOrdersAsynce({ sort, pagination }));
  }, [dispatch, page,sort]);

  const handleEdit = (order) => {
    setEditableOrderId(order.id);
  };

  const handleShow = () => {};

  const handleUpdate = (e, order) => {
    const updatedOrder = { ...order, status: e.target.value };
    dispatch(updateOrderAsynce(updatedOrder));
    setEditableOrderId(-1);
  };
  
  const chooseColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-purple-200 text-purple-600";

      case "dispatched":
        return "bg-yellow-200 text-yellow-600";

      case "delivered":
        return "bg-green-200 text-green-600";

      case "cancelled":
        return "bg-red-200 text-red-600";

      default:
        return "bg-purple-200 text-purple-600";
    }
  };

  return (
    <>
      <div className="overflow-x-auto">
        <div className=" flex items-center justify-center bg-gray-100 font-sans overflow-hidden">
          <div className="w-full ">
            <div className="bg-white shadow-md rounded my-6">
              <table className="min-w-max w-full table-auto">
                <thead>
                  <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                    <th
                      className="py-3 px-6 text-left cursor-pointer"
                      onClick={(e) =>
                        handleSort({
                          sort: "id",
                          order: sort?._order === "asc" ? "desc" : "asc", // this syntex will work opposite. if current order is in ascending then if we click it will go into descending order
                        })
                      }
                    >
                      Order Number
                      {sort._sort === "id" && sort._order === "asc"  ?<ArrowUpIcon className="w-4 h-4 inline "></ArrowUpIcon>
                      : <ArrowDownIcon  className="w-4 h-4 inline "></ArrowDownIcon>}
                    </th>
                    <th className="py-3 px-6 text-left">Items</th>
                    <th
                      className="py-3 px-6 text-left cursor-pointer"
                      onClick={(e) =>
                        handleSort({
                          sort: "totalAmount",
                          order: sort?._order === "asc" ? "desc" : "asc", // this syntex will work opposite. if current order is in ascending then if we click it will go into descending order
                        })
                      }
                    >
                      Total Amount
                      {sort._sort === "totalAmount" && sort._order === "asc"  ?<ArrowUpIcon className="w-4 h-4 inline "></ArrowUpIcon>
                      : <ArrowDownIcon  className="w-4 h-4 inline "></ArrowDownIcon>}
                    </th>
                    <th className="py-3 px-6 text-center">Shipping Address</th>
                    <th className="py-3 px-6 text-center">Status</th>
                    <th className="py-3 px-6 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 text-sm font-light">
                  {orders.map((order) => (
                    <tr className="border-b border-gray-200 hover:bg-gray-100">
                      <td className="py-3 px-6 text-left whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="mr-2"></div>
                          <span className="font-medium">{order.id}</span>
                        </div>
                      </td>
                      <td className="py-3 px-6 text-left">
                        {console.log("order ..", order)}
                        {order.items.map((item) => (
                          <div className="flex items-center">
                            <div className="mr-2">
                              <img
                                className="w-6 h-6 rounded-full"
                                src={item.product.thumbnail}
                              />
                            </div>
                            <span>
                              {item.product.title}- #{item.quantity} - ${item.product.price}
                            </span>
                          </div>
                        ))}
                      </td>
                      <td className="py-3 px-6 text-center">
                        <div className="flex items-center justify-center">
                          ${order.totalAmount}
                        </div>
                      </td>
                      <td className="py-3 px-6 text-center">
                        <div className="">
                          <strong> {order.selectedAddress.fullname}</strong>
                          <div> {order.selectedAddress.street} </div>
                          <div> {order.selectedAddress.city} </div>
                          <div> {order.selectedAddress.state} </div>
                          <div> {order.selectedAddress.pinCode} </div>
                          <div> {order.selectedAddress.phone} </div>
                        </div>
                      </td>
                      <td className="py-3 px-6 text-center">
                        {editableOrderId === order.id ? (
                          <select onChange={(e) => handleUpdate(e, order)}>
                            {/* here the logic is that if editableOrderId which we have set it equal to order.id at handleedit function is equal to order.id only than it will show the options otherwise it will show only hardcoded pending status   */}
                            <option value="pending">Pending</option>
                            <option value="dispatched">Dispatched</option>
                            <option value="delivered">Delivered</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        ) : (
                          <span
                            className={`${chooseColor(
                              order.status
                            )} py-1 px-3 rounded-full text-xs`}
                          >
                            {order.status}
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-6 text-center">
                        <div className="flex item-center justify-center">
                          <div className="w-6 mr-2 transform hover:text-purple-500 hover:scale-110">
                            <EyeIcon
                              onClick={(e) => handleShow(order)}
                              className="w-6 h-6"
                            ></EyeIcon>
                          </div>
                          <div className="w-6 mr-2 transform hover:text-purple-500 hover:scale-110">
                            <PencilIcon
                              onClick={(e) => handleEdit(order)}
                              className="w-6 h-6"
                            ></PencilIcon>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <Pagination
          page={page}
          setPage={setPage}
          handlePage={handlePage}
          totalItems={totalOrders}
        ></Pagination>
        {/* <Pagination
          page={page}
          setPage={setPage}
          handlePage={handlePage}
          totalItems={totalOrders}
        ></Pagination> */}
      </div>
    </>
  );
}
