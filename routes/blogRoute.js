const express = require("express");

const { authMiddlware, isAdmin } = require("../middlewares/authMiddleware");
const { createBlog, updateBlog,getBlog,getAllBlogs, deleteBlog, liketheBlog ,disliketheBlog} = require("../controller/blogController");
const router = express.Router();




router.post("/",authMiddlware,isAdmin,createBlog);
router.post("/:id",getBlog );

router.put("/likes",authMiddlware,isAdmin,liketheBlog);
router.put("/dislikes",authMiddlware,isAdmin,disliketheBlog);
router.put("/:id",authMiddlware,isAdmin,updateBlog);




router.get("/",getAllBlogs );

router.delete("/:id",deleteBlog );


module.exports = router;
