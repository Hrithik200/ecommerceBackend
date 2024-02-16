const express = require("express");

const { authMiddlware, isAdmin } = require("../middlewares/authMiddleware");
const { createBlog, updateBlog,getBlog,getAllBlogs, deleteBlog, liketheBlog ,disliketheBlog,uploadImages} = require("../controller/blogController");
const { blogImgResize, uploadPhoto } = require("../middlewares/uploadImages")
const router = express.Router();



router.post("/",authMiddlware,isAdmin,createBlog);
router.put("/upload/:id", authMiddlware, isAdmin, uploadPhoto.array("images", 2), blogImgResize,uploadImages);
router.post("/:id",getBlog );

router.put("/likes",authMiddlware,isAdmin,liketheBlog);
router.put("/dislikes",authMiddlware,isAdmin,disliketheBlog);
router.put("/:id",authMiddlware,isAdmin,updateBlog);




router.get("/",getAllBlogs );

router.delete("/:id",deleteBlog );


module.exports = router;
