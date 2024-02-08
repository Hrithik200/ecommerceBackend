const Product = require("../models/productModel");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongodbId");
const slugify = require("slugify");

const createProduct = asyncHandler(async (req, res) => {
    try {
        if (req.body.title) {
            req.body.slug = slugify(req.body.title);
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

const updateProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;
    console.log(id);
    try {
        if (req.body.title) {
            req.body.slug = slugify(req.body.title);
        }
        const updatePro = await Product.findByIdAndUpdate(id, req.body, { new: true });
        console.log("updateProduct", updatePro);
        res.json(updatePro);
    } catch (error) {
        throw new Error(error);
    }
});
//delete product
const deleteProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const deletePro = await Product.findByIdAndDelete(id);
        console.log("deleteProduct", deletePro);
        res.json(deletePro);
    } catch (error) {
        throw new Error(error);
    }
});

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
        const queryObj = { ...req.query };
        const excludeFields = ["page", "sort", "limit", "fields"];
        excludeFields.forEach((el) => delete queryObj[el]);
        console.log("queryObj", queryObj);
     
        let queryStr = JSON.stringify(queryObj).replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
        let query = Product.find(JSON.parse(queryStr));
        // sort
        if(req.query.sort){
          const sortBy=req.query.sort.split(",").join(" ") 
          query=query.sort(sortBy)
        }else{
            query=query.sort("-createdAt")
        }


        // limit
        if(req.query.fields){
            const fields=req.query.fields.split(",").join(" ") 
            query=query.select(fields)

        }else{
            query=query.select("-__v")
        }

        //pagination
        const page=req.query.page;
        const limit =req.query.limit;
        const skip=(page -1 )*limit;
        query=query.skip(skip).limit(limit)
        if(req.query.page){
            const productCount=await Product.countDocuments();
            if(skip>=productCount) throw new Error("This page doesnt exist")
        }
        console.log(page,limit,skip)
        const product = await query;
        res.json(product);
    } catch (error) {
        throw new Error(error);
    }
});
module.exports = { createProduct, getaproduct, getallProduct, updateProduct, deleteProduct };
