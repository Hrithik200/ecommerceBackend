const express = require("express");
const { authMiddlware, isAdmin } = require("../middlewares/authMiddleware");
const { createProduct, getaproduct, getallProduct, updateProduct, deleteProduct, addToWishlist, rating, uploadImages } = require("../controller/productController");
const { uploadPhoto, productImgResize } = require("../middlewares/uploadImages");

const router = express.Router();

router.get("/", getallProduct);

router.post("/", authMiddlware, isAdmin, createProduct);
router.put("/upload/:id", authMiddlware, isAdmin, uploadPhoto.array("images", 10), productImgResize,uploadImages);
router.put("/wishlist", authMiddlware, isAdmin, addToWishlist);
router.put("/rating", authMiddlware, isAdmin, rating);
router.get("/:id", getaproduct);
router.delete("/:id", authMiddlware, isAdmin, deleteProduct);
router.put("/:id", authMiddlware, isAdmin, updateProduct);

module.exports = router;
