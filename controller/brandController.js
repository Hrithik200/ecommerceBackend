const Brand = require("../models/brandModel");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongodbId");

const createBrand=asyncHandler(async(req,res)=>{
  try {
    console.log("In the Brand Controller");
    const newBrand=await Brand.create(req.body);
    res.json(newBrand);
  } catch (error) {
    throw new Error(error);
  }
})


const updateBrand=asyncHandler(async(req,res)=>{
  const {id}= req.params
  validateMongoDbId(id)
  try {
    console.log("In the update Brand Controller");
    const newBrand=await Brand.findByIdAndUpdate(id,req.body,{
      new:true,
    });
    res.json(newBrand);
  } catch (error) {
    throw new Error(error);
  }
})

const deleteBrand=asyncHandler(async(req,res)=>{
  const {id}= req.params
  validateMongoDbId(id)
  try {
    console.log("In the delete Brand Controller");
    const deletedBrand=await Brand.findByIdAndDelete(id);
    res.json(deletedBrand);
  } catch (error) {
    throw new Error(error);
  }
})
const getBrand=asyncHandler(async(req,res)=>{
  const {id}= req.params
  validateMongoDbId(id)
  try {
    console.log("In the get a Brand Controller");
    const getaBrand=await Brand.findById(id);
    res.json(getaBrand);
  } catch (error) {
    throw new Error(error);
  }
})
const getAllBrand=asyncHandler(async(req,res)=>{

  try {
    console.log("In the get a Brand Controller");
    const getallBrand=await Brand.find();
    res.json(getallBrand);
  } catch (error) {
    throw new Error(error);
  }
})





module.exports={createBrand,updateBrand,deleteBrand,getBrand,getAllBrand}