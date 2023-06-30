const express = require("express")
const { fetchAllBrands, createBrand } = require("../controller/Brand")
const { fetchUserById, updateUser } = require("../controller/User")

const router = express.Router()

router.get("/own",fetchUserById).patch("/:id", updateUser)
exports.router =router