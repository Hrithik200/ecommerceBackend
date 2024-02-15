const express = require("express");
const { createBrand, updateBrand, deleteBrand ,getBrand,getAllBrand} = require("../controller/brandController");
const { authMiddlware, isAdmin } = require("../middlewares/authMiddleware");
const router = express.Router();

router.get("/",getAllBrand)
router.get("/:id",getBrand)
router.post("/",authMiddlware,isAdmin, createBrand);
router.put("/:id",authMiddlware,isAdmin, updateBrand);
router.delete("/:id",authMiddlware,isAdmin, deleteBrand);

module.exports=router;



