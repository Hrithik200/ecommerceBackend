const express = require("express");
const { authMiddlware, isAdmin } = require("../middlewares/authMiddleware");
const { createProduct, getaproduct, getallProduct, updateProduct, deleteProduct } = require("../controller/productController");
const router = express.Router();


router.get("/", getallProduct);

router.post("/",authMiddlware,isAdmin, createProduct);
router.get("/:id", getaproduct);
router.delete("/:id",authMiddlware,isAdmin, deleteProduct);
router.put("/:id",authMiddlware,isAdmin, updateProduct);


deleteProduct
module.exports = router;
