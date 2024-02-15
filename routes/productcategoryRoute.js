const express = require("express");
const { createCategory, updateCategory, deleteCategory ,getCategory,getAllCategory} = require("../controller/prodcategoryController");
const { authMiddlware, isAdmin } = require("../middlewares/authMiddleware");
const router = express.Router();

router.get("/",getAllCategory)
router.get("/:id",getCategory)
router.post("/",authMiddlware,isAdmin, createCategory);
router.put("/:id",authMiddlware,isAdmin, updateCategory);
router.delete("/:id",authMiddlware,isAdmin, deleteCategory);

module.exports=router;



