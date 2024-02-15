const Product = require("../models/productModel");
const User = require("../models/userModel");
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
        if (req.query.sort) {
            const sortBy = req.query.sort.split(",").join(" ");
            query = query.sort(sortBy);
        } else {
            query = query.sort("-createdAt");
        }

        // limit
        if (req.query.fields) {
            const fields = req.query.fields.split(",").join(" ");
            query = query.select(fields);
        } else {
            query = query.select("-__v");
        }

        //pagination
        const page = req.query.page;
        const limit = req.query.limit;
        const skip = (page - 1) * limit;
        query = query.skip(skip).limit(limit);
        if (req.query.page) {
            const productCount = await Product.countDocuments();
            if (skip >= productCount) throw new Error("This page doesnt exist");
        }
        console.log(page, limit, skip);
        const product = await query;
        res.json(product);
    } catch (error) {
        throw new Error(error);
    }
});

const addToWishlist = asyncHandler(async (req, res) => {
    const { id } = req.user;
    console.log("id", id);
    const { prodId } = req.body;
    console.log("ProdId", prodId);
    try {
        const user = await User.findById(id);
        const alreadyadded = user.wishlist.find((id) => id.toString() === prodId);
        if (alreadyadded) {
            console.log("Added");
            let user = await User.findByIdAndUpdate(
                id,
                {
                    $pull: { wishlist: prodId },
                },
                { new: true }
            );
            res.json(user);
        } else {
            console.log("Not Added");
            let user = await User.findByIdAndUpdate(
                id,
                {
                    $push: { wishlist: prodId },
                },
                { new: true }
            );
            res.json(user);
        }
    } catch (error) {
        console.log("error in wislist");
        throw new Error(error);
    }
});

const rating = asyncHandler(async (req, res) => {
    const { id } = req.user;
    const { star, prodId } = req.body;
    try {
        const product = await Product.findById(prodId);
        let alreadyRated = product.ratings.find((userId) => userId.postedby.toString() === id.toString());
        if (alreadyRated) {
            const updateRating = await Product.updateOne(
                {
                    ratings: { $elemMatch: alreadyRated },
                },
                {
                    $set: { "ratings.$.star": star },
                },
                {
                    new: true,
                }
            );
            res.json(updateRating);
        } else {
            const rateProduct = await Product.findByIdAndUpdate(
                prodId,
                {
                    $push: {
                        ratings: {
                            star: star,
                            postedby: id,
                        },
                    },
                },
                { new: true }
            );
            res.json(rateProduct);
        }
        const getAllRatings = await Product.findById(prodId);
        let totalRating = getAllRatings.ratings.length;
        let ratingsum = getAllRatings.ratings.map((item) => item.star).reduce((prev, curr) => prev + curr, 0);
        let actualRating = Math.round(ratingsum / totalRating);
       let finalproduct=  await Product.findByIdAndUpdate(
            prodId,
            {
                totalrating: actualRating,
            },
            { new: true }
        );
        res.json(finalproduct)
    } catch (error) {
        console.log("error in rating");
        throw new Error(error);
    }
});
module.exports = { createProduct, getaproduct, getallProduct, updateProduct, deleteProduct, addToWishlist, rating };
