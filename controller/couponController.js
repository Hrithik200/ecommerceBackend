const Coupon = require("../models/couponModel");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongodbId");

const createCoupon = asyncHandler(async (req, res) => {
    try {
        const newCoupon = await Coupon.create(req.body);
        res.json(newCoupon);
    } catch (error) {
        console.log("Error in CreateCoupon in controller");
        throw new Error(error);
    }
});
const getAllCoupon = asyncHandler(async (req, res) => {
  try {
      const coupons = await Coupon.find();
      res.json(coupons);
  } catch (error) {
      console.log("Error in CreateCoupon in controller");
      throw new Error(error);
  }
});
const getCoupon = asyncHandler(async (req, res) => {
  const {id}=req.params;
  validateMongoDbId(id)
  try {
      const getcoupon= await Coupon.findById(id);
      res.json(getcoupon);
  } catch (error) {
      console.log("Error in CreateCoupon in controller");
      throw new Error(error);
  }
});

const updateCoupon = asyncHandler(async (req, res) => {
  const {id}=req.params;
  validateMongoDbId(id)
  try {
      const upatecoupon = await Coupon.findByIdAndUpdate(id,req.body,{new:true});
      res.json(upatecoupon);
  } catch (error) {
      console.log("Error in CreateCoupon in controller");
      throw new Error(error);
  }
});

const deleteCoupon = asyncHandler(async (req, res) => {
  const {id}=req.params;
  validateMongoDbId(id)
  try {
      const deletecoupon = await Coupon.findByIdAndDelete(id);
      res.json(deletecoupon);
  } catch (error) {
      console.log("Error in CreateCoupon in controller");
      throw new Error(error);
  }
});

module.exports = { createCoupon,getAllCoupon ,getCoupon,updateCoupon,deleteCoupon};
