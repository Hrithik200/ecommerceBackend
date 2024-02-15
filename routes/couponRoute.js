const express = require("express");
const { authMiddlware, isAdmin } = require("../middlewares/authMiddleware");
const { createCoupon, getAllCoupon, updateCoupon, deleteCoupon, getCoupon } = require("../controller/couponController");
const router = express.Router();




router.get("/",authMiddlware,isAdmin, getAllCoupon);
router.get("/:id",authMiddlware,isAdmin, getCoupon);

router.post("/",authMiddlware,isAdmin, createCoupon);

router.put("/:id",authMiddlware,isAdmin, updateCoupon);

router.delete("/:id",authMiddlware,isAdmin, deleteCoupon);

module.exports = router;
