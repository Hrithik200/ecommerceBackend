const Product = require("../models/productModel");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongodbId");
const slugify=require("slugify")

const createProduct = asyncHandler(async (req, res) => {
    try {
      if(req.body.title){
        req.body.slug=slugify(req.body.title)
      }
        const newProduct = await Product.create(req.body);
        res.json(newProduct);
        res.json({
            message: "Its product route calling",
        });
    } catch (error) {
        throw new Error(error);
    }
});

const updateProduct=asyncHandler(async(req,res)=>{
  const {id}=req.params
  try {
    if(req.body.title){
      req.body.slug=slugify(req.body.title)}
    const updateProduct = await Product.findOneAndUpdate(
      {id},
      {
          firstName: req?.body?.firstName,
          lastName: req?.body?.lastName,
          email: req?.body?.email,
          mobile: req?.body?.mobile,
      },
      { new: true }
  );
  res.json(updateProduct);
  } catch (error) {
    throw new Error(error);
  }
})

const getaproduct = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        const findProduct = await Product.findById(id);
        res.json(findProduct);
    } catch (error) {
        throw new Error(error);
    }
});
const getallProduct = asyncHandler(async (req, res) => {
    try {
        const getAllProducts = await Product.find();
        res.json(getAllProducts);
    } catch (error) {
        throw new Error(error);
    }
});
module.exports = { createProduct, getaproduct, getallProduct,updateProduct };
