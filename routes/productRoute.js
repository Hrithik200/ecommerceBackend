const express = require("express");
const { authMiddlware, isAdmin } = require("../middlewares/authMiddleware");
const { createProduct, getaproduct, getallProduct, updateProduct, deleteProduct, addToWishlist, rating} = require("../controller/productController");

const router = express.Router();


router.get("/", getallProduct);

router.post("/",authMiddlware,isAdmin, createProduct);
router.put("/wishlist",authMiddlware,isAdmin, addToWishlist);
router.put("/rating",authMiddlware,isAdmin, rating);
router.get("/:id", getaproduct);
router.delete("/:id",authMiddlware,isAdmin, deleteProduct);
router.put("/:id",authMiddlware,isAdmin, updateProduct);

addToWishlist
deleteProduct
module.exports = router;
