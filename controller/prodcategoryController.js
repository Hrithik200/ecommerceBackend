const Category = require("../models/prodcategoryModel");
//const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongodbId");

const createCategory=asyncHandler(async(req,res)=>{
  try {
    console.log("In the category Controller");
    const newCategory=await Category.create(req.body);
    res.json(newCategory);
  } catch (error) {
    throw new Error(error);
  }
})


const updateCategory=asyncHandler(async(req,res)=>{
  const {id}= req.params
  validateMongoDbId(id)
  try {
    console.log("In the update category Controller");
    const newCategory=await Category.findByIdAndUpdate(id,req.body,{
      new:true,
    });
    res.json(newCategory);
  } catch (error) {
    throw new Error(error);
  }
})

const deleteCategory=asyncHandler(async(req,res)=>{
  const {id}= req.params
  validateMongoDbId(id)
  try {
    console.log("In the delete category Controller");
    const deletedCategory=await Category.findByIdAndDelete(id);
    res.json(deletedCategory);
  } catch (error) {
    throw new Error(error);
  }
})
const getCategory=asyncHandler(async(req,res)=>{
  const {id}= req.params
  validateMongoDbId(id)
  try {
    console.log("In the get a category Controller");
    const getaCategory=await Category.findById(id);
    res.json(getaCategory);
  } catch (error) {
    throw new Error(error);
  }
})
const getAllCategory=asyncHandler(async(req,res)=>{

  try {
    console.log("In the get a category Controller");
    const getallCategory=await Category.find();
    res.json(getallCategory);
  } catch (error) {
    throw new Error(error);
  }
})





module.exports={createCategory,updateCategory,deleteCategory,getCategory,getAllCategory}