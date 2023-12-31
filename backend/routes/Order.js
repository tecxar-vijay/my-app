const express = require("express");
const {
  fetchOrderByUser,
  createOrder,
  deleteOrder,
  updateOrder,
  fetchAllOrders,
} = require("../controller/Order");

const router = express.Router();

router
  .get("/user/:userId", fetchOrderByUser)
  .get("/" , fetchAllOrders)
  .post("/", createOrder)
  .delete("/:id", deleteOrder)
  .patch("/:id", updateOrder)
exports.router = router;
