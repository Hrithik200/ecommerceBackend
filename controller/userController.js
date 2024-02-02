const { generateToken } = require("../config/jwtToken");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongodbId");
const { generateRefreshToken } = require("../config/refreshToken");

// create a user
const createUser = asyncHandler(async (req, res) => {
    const email = req.body.email;
    const findUser = await User.findOne({ email: email });

    if (!findUser) {
        // create a new user
        const newUser = await User.create(req.body);
        res.json(newUser);
    } else {
        throw new Error("User Already Exits");
    }
});

// login
const loginUserCtrl = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    // find the particular user that exist in db

    const findUser = await User.findOne({ email: email });
    if (findUser && (await findUser.isPasswordMatched(password))) {
        const refreshToken = await generateRefreshToken(findUser?.id);
        const updateUser = await User.findByIdAndUpdate(findUser?._id, { refreshToken: refreshToken }, { new: true });
        res.cookie("Refresh Token",refreshToken,{
            httpOnly:true,
            maxAge:72*60*60*1000
        })
        res.json({
            _id: findUser?._id,
            firstName: findUser?.firstName,
            lastName: findUser?.lastName,
            email: findUser?.email,
            mobile: findUser?.mobile,
            token: generateToken(findUser?._id),
        });
    } else {
        throw new Error("Invalid credentials");
    }
});
// refresh Tokne

const handleRefreshToken=asyncHandler(async (req,res)=>{
const cookie=req.cookies;
console.log(cookie)

})

// Update User
const updatedUser = asyncHandler(async (req, res) => {
    const { id } = req.user;
    validateMongoDbId(id);
    try {
        const updateUser = await User.findByIdAndUpdate(
            id,
            {
                firstName: req?.body?.firstName,
                lastName: req?.body?.lastName,
                email: req?.body?.email,
                mobile: req?.body?.mobile,
            },
            { new: true }
        );
        res.json(updateUser);
    } catch (error) {
        throw new Error(error);
    }
});

// get all users
const getAllUser = asyncHandler(async (req, res) => {
    try {
        const getUsers = await User.find();
        res.json(getUsers);
    } catch (error) {
        throw new Error(error);
    }
});

// get a single user
const getAUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);

    try {
        const getaUser = await User.findById(id);
        res.json({ getaUser });
    } catch (error) {
        throw new Error(error);
    }
});

// delete a user
const deleteAUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);

    try {
        const deleteaUser = await User.findByIdAndDelete(id);

        res.json({ deleteaUser });
    } catch (error) {
        throw new Error(error);
    }
});

const blockUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        await User.findByIdAndUpdate(
            id,
            {
                isBlocked: true,
            },
            { new: true }
        );
        res.json({
            message: "User Blocked",
        });
    } catch (error) {
        throw new Error(error);
    }
});

const unblockUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        await User.findByIdAndUpdate(
            id,
            {
                isBlocked: false,
            },
            { new: true }
        );
        res.json({
            message: "User Unblocked",
        });
    } catch (error) {
        throw new Error(error);
    } 
});

module.exports = { createUser, loginUserCtrl, updatedUser, getAllUser, getAUser, deleteAUser, blockUser, unblockUser,handleRefreshToken };
