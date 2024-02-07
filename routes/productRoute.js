const express = require("express");
const { authMiddlware, isAdmin } = require("../middlewares/authMiddleware");
const { createProduct, getaproduct, getallProduct, updateProduct } = require("../controller/productController");
const router = express.Router();

router.post("/", createProduct);

router.get("/getProduct", getallProduct);

router.get("/:id", getaproduct);

router.put("/:id", updateProduct);

module.exports = router;
